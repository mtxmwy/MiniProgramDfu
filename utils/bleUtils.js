const openBluetoothAdapter = obj =>{
  return new Promise((resolve,reject) => {
    obj.success = function (res){
      resolve(res)
    },
    obj.fail = function(err){
      reject(err)
    }
    wx.openBluetoothAdapter(obj)
  })
}

const closeBluetoothAdapter = obj => {
  return new Promise((resolve, reject) => {
    obj.success = function (res) {
      resolve(res)
    }
    obj.fail = function (res) {
      reject(res)
    }
    wx.closeBluetoothAdapter(obj)
  })
}
const onBluetoothAdapterStateChange = obj => {
  return new Promise((resolve, reject) => {
    obj.success = function (res) {
      resolve(res)
    }
    obj.fail = function (res) {
      reject(res)
    }
    wx.onBluetoothAdapterStateChange(obj)
  })
}

const getBluetoothAdapterState = obj => {
  return new Promise((resolve, reject) => {
    obj.success = function (res) {
      resolve(res)
    }
    obj.fail = function (res) {
      reject(res)
    }
    wx.getBluetoothAdapterState(obj)
  })
}

const startBluetoothDevicesDiscovery = obj => {
  return new Promise((resolve, reject) => {
    obj.success = function (res) {
      resolve(res)
    }
    obj.fail = function (res) {
      reject(res)
    }
    wx.startBluetoothDevicesDiscovery(obj)
  })
}
const stopBluetoothDevicesDiscovery = obj => {
  return new Promise((resolve, reject) => {
    obj.success = function (res) {
      resolve(res)
    }
    obj.fail = function (res) {
      reject(res)
    }
    wx.stopBluetoothDevicesDiscovery(obj)
  })
}

const getBluetoothDevices = obj => {
  return new Promise((resolve, reject) => {
    obj.success = function (res) {
      resolve(res)
    }
    obj.fail = function (res) {
      reject(res)
    }
    wx.getBluetoothDevices(obj)
  })
}

const getConnectedBluetoothDevices = obj => {
  return new Promise((resolve, reject) => {
    obj.success = function (res) {
      resolve(res)
    }
    obj.fail = function (res) {
      reject(res)
    }
    wx.getConnectedBluetoothDevices(obj)
  })
}

const onBluetoothDeviceFound = obj => {
  return new Promise((resolve, reject) => {
    obj.success = function (res) {
      resolve(res)
    }
    obj.fail = function (res) {
      reject(res)
    }
    wx.onBluetoothDeviceFound(obj)
  })
}

const createBLEConnection = obj => {
  return new Promise((resolve, reject) => {
    obj.success = function (res) {
      resolve(res)
    }
    obj.fail = function (res) {
      reject(res)
    }
    wx.createBLEConnection(obj)
  })
}

const closeBLEConnection = obj => {
  return new Promise((resolve, reject) => {
    obj.success = function (res) {
      resolve(res)
    }
    obj.fail = function (res) {
      reject(res)
    }
    wx.closeBLEConnection(obj)
  })
}

const getBLEDeviceServices = obj => {
  return new Promise((resolve, reject) => {
    obj.success = function (res) {
      resolve(res)
    }
    obj.fail = function (res) {
      reject(res)
    }
    wx.getBLEDeviceServices(obj)
  })
}

const getBLEDeviceCharacteristics = obj => {
  return new Promise((resolve, reject) => {
    obj.success = function (res) {
      resolve(res)
    }
    obj.fail = function (res) {
      reject(res)
    }
    wx.getBLEDeviceCharacteristics(obj)
  })
}

const readBLECharacteristicValue = obj => {
  return new Promise((resolve, reject) => {
    obj.success = function (res) {
      resolve(res)
    }
    obj.fail = function (res) {
      reject(res)
    }
    wx.readBLECharacteristicValue(obj)
  })
}

const writeBLECharacteristicValue = obj => {
  return new Promise((resolve, reject) => {
    obj.success = function (res) {
      resolve(res)
    }
    obj.fail = function (res) {
      reject(res)
    }
    wx.writeBLECharacteristicValue(obj)
  })
}

const notifyBLECharacteristicValueChange = obj => {
  return new Promise((resolve, reject) => {
    obj.success = function (res) {
      resolve(res)
    }
    obj.fail = function (res) {
      reject(res)
    }
    wx.notifyBLECharacteristicValueChange(obj)
  })
}

const onBLEConnectionStateChange = obj => {
  return new Promise((resolve, reject) => {
    obj.success = function (res) {
      resolve(res)
    }
    obj.fail = function (res) {
      reject(res)
    }
    wx.onBLEConnectionStateChange(obj)
  })
}

const onBLECharacteristicValueChange = obj => {
  return new Promise((resolve, reject) => {
    obj.success = function (res) {
      resolve(res)
    }
    obj.fail = function (res) {
      reject(res)
    }
    wx.onBLECharacteristicValueChange(obj)
  })
}

const reverseLookup = obj => val => {
  for (const k of Object.keys(obj)) {
    if (obj[k] === val) {
      return k;
    }
  }
  return 'UNKNOWN';
};

module.exports = {
  openBluetoothAdapter: openBluetoothAdapter,
  closeBluetoothAdapter: closeBluetoothAdapter,
  getBluetoothAdapterState: getBluetoothAdapterState,
  onBluetoothAdapterStateChange: onBluetoothAdapterStateChange,
  startBluetoothDevicesDiscovery: startBluetoothDevicesDiscovery,
  stopBluetoothDevicesDiscovery: stopBluetoothDevicesDiscovery,
  getBluetoothDevices: getBluetoothDevices,
  getConnectedBluetoothDevices: getConnectedBluetoothDevices,
  onBluetoothDeviceFound: onBluetoothDeviceFound,
  createBLEConnection: createBLEConnection,
  closeBLEConnection: closeBLEConnection,
  getBLEDeviceServices: getBLEDeviceServices,
  getBLEDeviceCharacteristics: getBLEDeviceCharacteristics,
  readBLECharacteristicValue: readBLECharacteristicValue,
  writeBLECharacteristicValue: writeBLECharacteristicValue,
  notifyBLECharacteristicValueChange: notifyBLECharacteristicValueChange,
  onBLEConnectionStateChange: onBLEConnectionStateChange,
  onBLECharacteristicValueChange: onBLECharacteristicValueChange
}