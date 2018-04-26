import { Api } from './Api.js'

const api = new Api()

class Cos {

  constructor() { }


  // * 还有上传图的页都要使用这个
  // 上传图片 -- 新修改的用在my-shangjia.js
  update_img_cos(cospath, imgArr, callback, callbackupdateOk) {
    var successUp = 0; //成功个数
    var failUp = 0; //失败个数
    var length = imgArr.length; //总共个数
    var i = 0; //第几个
    this.uploadDIY(cospath, imgArr, successUp, failUp, i, length, back => {
      console.log('back--------------', JSON.parse(back))
      callback && callback(JSON.parse(back))
    }, updateOk => {
      console.log('updateOk--上传完成')
      callbackupdateOk && callbackupdateOk(updateOk)
    });
  }


  // 服务器单次签名
  qianmin(cospath, callback) {
    api.cosQianming({ cospath: cospath }, res => {
      console.log('qianming', res.data)
      callback(res.data);
    })
  }

  // 上传基本方法
  uploadDIY(cospath, filePaths, successUp, failUp, i, length, callback, callbackSucc) {
    // 获取签名
    this.qianmin(cospath, qianmin => {
      // 调用上传
      this.uploadFile(cospath, qianmin, filePaths, successUp, failUp, i, length, callback, callbackSucc)
    })
  }


  // 上传
  uploadFile(cospath, qianmin, filePaths, successUp, failUp, i, length, callback, callbackSucc) {

    var cosUrl = "https://" + "cd" + ".file.myqcloud.com/files/v2/" + "1253443226" + "/" + "cosceshi" + cospath
    var fileName = filePaths[i].substr(filePaths[i].lastIndexOf('/') + 1)

    var uploadTask = wx.uploadFile({
      url: cosUrl + "/" + fileName,
      header: { 'Authorization': qianmin },
      filePath: filePaths[i],
      name: 'filecontent',
      formData: { op: 'upload' },
      success: (resp) => {
        if (resp.statusCode == 200) {
          callback && callback(resp.data)
          successUp++;
        } else {
          console.log('success-上传失败', resp)
        }
      },
      fail: (res) => {
        failUp++;
        console.log('fail-上传失败', res)
      },
      complete: () => {
        i++;
        if (i == length) {
          callbackSucc && callbackSucc('成功' + successUp + '失败' + failUp)
        }
        else {  //递归调用uploadDIY函数
          this.uploadFile(cospath, qianmin, filePaths, successUp, failUp, i, length, callback, callbackSucc);
        }
      },
    });
  }


  // updateCos(res, callback, callbackTask) {

  //   // cosUrl
  //   var cosUrl = "https://" + "cd" + ".file.myqcloud.com/files/v2/" + "1253443226" + "/" + "cosceshi" + "/bianmin"

  //   // 获取签名
  //   this.qianmin(qianmin => {

  //     // console.log('updateCos-Res', res)

  //     // let temp = res.tempFilePaths

  //     // for (let i in temp) {
  //     //   console.log('-Res', temp[i])

  //     //   // 获取文件路径
  //     //   var filePath = res.tempFilePaths[0];
  //     //   // 获取文件名
  //     //   var fileName = filePath.substr(filePath.lastIndexOf('/') + 1)

  //     // }

  //     // 获取文件路径
  //     // var filePath = res.tempFilePaths[0];
  //     // console.log('filePath', filePath)
  //     // 获取文件名
  //     // var fileName = filePath.substr(filePath.lastIndexOf('/') + 1)
  //     // var fileName = new Date().getTime()
  //     // console.log('fileName', fileName)

  //     // var uploadTask = wx.uploadFile({
  //     //   url: cosUrl + '/' + fileName,
  //     //   filePath: filePath,
  //     //   header: { 'Authorization': qianmin },
  //     //   name: 'filecontent',
  //     //   formData: { op: 'upload' },
  //     //   success: (uploadRes) => {
  //     //     //do something 
  //     //     console.log('uploadRes1', JSON.parse(uploadRes.data))
  //     //     // if (uploadRes.statusCode == 200) {
  //     //     //   callback(uploadRes.data)
  //     //     // }else{
  //     //     //   console.log('上传失败')
  //     //     // }

  //     //   }
  //     // })

  //     // 上传进度条
  //     // uploadTask.onProgressUpdate((Task) => {
  //     //   // console.log(Task)
  //     //   callbackTask(Task)
  //     //   // this.setData({
  //     //   //   percent: Task.progress
  //     //   // })
  //     //   // if (Task.progress === 100) {
  //     //   //   // tempFilePath可以作为img标签的src属性显示图片
  //     //   //   this.setData({ img: res.tempFilePaths })
  //     //   // }
  //     // })
  //   })
  // }

  // deleteCos() {

  // }

}




export { Cos }


// // 获取签名
// this.qianming(qianming => {
//   // 头部带上签名，上传文件至COS
//   var uploadTask = wx.uploadFile({
//     url: cosUrl + '/' + fileName,
//     filePath: filePath,
//     header: { 'Authorization': qianming },
//     name: 'filecontent',
//     formData: { op: 'upload' },
//     success: function (uploadRes) {
//       //do something 
//       console.log('uploadRes', uploadRes)
//       console.log('uploadRes1', JSON.parse(uploadRes.data))
//     }
//   })

//   // access_url	通过 CDN 访问该文件的资源链接（访问速度更快）	String
//   // resource_path	该文件在 COS 中的相对路径名，可作为其 ID 标识。 格式 / <APPID>/<BucketName>/ < ObjectName >。推荐业务端存储 resource_path，然后根据业务需求灵活拼接资源 url（通过 CDN 访问 COS 资源的 url 和直接访问 COS 资源的 url 不同）。	String
//   // source_url	（不通过 CDN）直接访问 COS 的资源链接	String
//   // url	操作文件的 url 。业务端可以将该 url 作为请求地址来进一步操作文件，对应 API ：文件属性、更新文件、删除文件、移动文件中的请求地址。

//   // 上传进度条
//   uploadTask.onProgressUpdate((Task) => {
//     console.log(Task)
//     this.setData({
//       percent: Task.progress
//     })
//     if (Task.progress === 100) {
//       // tempFilePath可以作为img标签的src属性显示图片
//       this.setData({ img: res.tempFilePaths })
//     }
//   })
// })