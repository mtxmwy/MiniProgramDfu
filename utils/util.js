const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//下载升级包
const fm = wx.getFileSystemManager()
const rootPath = wx.env.USER_DATA_PATH
function downloadZip() {
  return new Promise((resolve, reject) => {
    let path = rootPath + "/" + fireWare
    createDirPath(path).then(function (res) {
      update()
    }).catch(function (err) {
      console.log(err)
    })
  })
}

function update() {
  wx.downloadFile({
    url: "zip包对应的链接",
    success: function (res) {
      tempFilePath: res.tempFilePath
      //这里有个坑，真机调试时，我在ios上下载zip包，和服务器上一模一样
      //但在Android上操作时，会多出7个字节，只能强制删除这七个字节
      //Android只有真机调试会出现，预览和体验版的时候不会，暂时不知道原因
      fm.writeFile({
        filePath: rootPath + "/" + fireWare + "/fireWare.zip",
        data: res.data,
        success: function (res) {

        },
        fail: function (err) {

        }
      })
    },
    fail: function (err) {

    }
  })
}

function createDirPath(dirpath) {
  return new Promise((resolve, reject) => {
    fm.access({
      path: dirPath,
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        fm.mkdir({
          dirPath: dirPath,
          recursive: true,
          success: function (res) {
            resolve(res)
          },
          fail: function (res) {
            console.log(res)
            reject(res)
          }
        })
      }
    })
  })
}

//util工具类：
const hexFromBuffer = buffer => {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}

const bufferFromHex = hex => {
  var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
    return parseInt(h, 16)
  }))
  return typedArray.buffer
}



module.exports = {
  formatTime: formatTime,
  bufferFromHex: bufferFromHex
}
