class SecureDfuLoader {
  constructor(crc32impl) {
    this.responseCallback = null;
    this.errorCallback = (err) => null;
    this.crc32 = crc32impl;
    this.onprogress = ({ offset, total }) => null;
    if (!this.crc32) {
      console.warn('No CRC32 implementation provided, will skip CRC validation');
    }
  }

  async connect() {
    const dev = await navigator.bluetooth.requestDevice({ filters: [{ services: [0xFE59] }] });
    const gatt = await dev.gatt.connect();
    const service = await gatt.getPrimaryService(0xFE59);
    this.ctlChar = await service.getCharacteristic('8ec90001-f315-4f60-9fb8-838830daea50');
    this.pktChar = await service.getCharacteristic('8ec90002-f315-4f60-9fb8-838830daea50');
    this.ctlChar.addEventListener('characteristicvaluechanged', (e) => {
      this.processResponse(e.target.value);
    });
    await this.ctlChar.startNotifications();
  }

  processResponse(response) {
    const result = response.getUint8(2);
    if (result !== 1) {
      this.errorCallback(new Error(`DFU Error code: ${result}`));
      return;
    }
    if (this.responseCallback) {
      this.responseCallback(response);
    } else {
      console.error('Unexpected response', response);
    }
  }

  async sendInitPacket(initData) {
    await this.createObject(1, initData.byteLength);
    await this.sendPageAndVerify(initData);
    await this.execute();
  }

  async sendFirmware(firmwareData) {
    const { offset, maxSize } = await this.selectObject(2);
    let state = null;
    for (let i = 0; i < firmwareData.byteLength; i += maxSize) {
      const pageSize = Math.min(firmwareData.byteLength - i, maxSize);
      await this.createObject(2, pageSize);
      state = await this.sendPageAndVerify(firmwareData.slice(i, i + pageSize), state);
      await this.execute();
      this.onprogress({ offset: state.offset, total: firmwareData.byteLength });
    }
  }

  async sendPageAndVerify(data, state) {
    let cumulativeOffset = data.byteLength;
    for (let i = 0; i < data.byteLength; i += 20) {
      const slice = data.slice(i, i + 20);
      await this.pktChar.writeValue(slice);
    }
    if (state) {
      cumulativeOffset += state.offset;
    }
    const { crc32, offset } = await this.calculateCrc();
    if (offset !== cumulativeOffset) {
      throw new Error('Data write error: partial data written');
    }
    this.validateCrc32(data, crc32, state && state.crc32);
    return { crc32, offset };
  }

  validateCrc32(buf, expectedCrc, seed) {
    if (this.crc32) {
      const actualCrc = this.crc32(new Uint8Array(buf), seed);
      if (actualCrc !== expectedCrc) {
        throw new Error(`CRC validation failed: ${expectedCrc} != ${actualCrc}`)
      }
    }
  }

  expectResponse(expectedResponse) {
    return new Promise((resolve, reject) => {
      this.responseCallback = (response) => {
        const responseCode = response.getUint8(1);
        this.responseCallback = null;
        if (responseCode !== expectedResponse) {
          reject(new Error(`Unexpected response value: ${responseCode}`));
        } else {
          resolve(response);
        }
      };
      this.errorCallback = reject;
    });
  }

  async createObject(type, length) {
    await this.ctlChar.writeValue(new Uint8Array([0x1, type, length & 0xff, length >> 8, length >> 16, length >> 24]));
    await this.expectResponse(0x1);
  }

  async calculateCrc() {
    await this.ctlChar.writeValue(new Uint8Array([3]));
    const response = await this.expectResponse(0x3);
    return {
      offset: response.getUint32(3, true),
      crc32: response.getInt32(7, true)
    };
  }

  async execute() {
    await this.ctlChar.writeValue(new Uint8Array([4]));
    await this.expectResponse(0x4);
  }

  async selectObject(type) {
    await this.ctlChar.writeValue(new Uint8Array([0x6, type]));
    const response = await this.expectResponse(0x6);
    return {
      maxSize: response.getUint32(3, true),
      offset: response.getUint32(7, true),
      crc32: response.getUint32(11, true)
    }
  }
}