import { Api } from './Api.js'

const api = new Api()

class Cos {

  constructor() { }



  // 上传图片 -- 新修改的用在my-shangjia.js
  update_img_cos(cospath, imgArr, callback, callbackupdateOk) {
    wx.showLoading({ title: '上传中', mask: true })

    var successUp = 0; //成功个数
    var failUp = 0; //失败个数
    var length = imgArr.length; //总共个数
    var i = 0; //第几个
    this._uploadDIY(cospath, imgArr, successUp, failUp, i, length, back => {
      console.log('back--------------', JSON.parse(back))
      callback && callback(JSON.parse(back))
    }, updateOk => {
      wx.hideLoading()
      console.log('updateOk--上传完成')
      callbackupdateOk && callbackupdateOk(updateOk)
    });
  }


  // 服务器单次签名
  _qianmin(cospath, callback) {
    api.cosQianming({ cospath: cospath }, res => {
      console.log('qianming', res.data)
      callback(res.data);
    })
  }

  // 上传基本方法
  _uploadDIY(cospath, filePaths, successUp, failUp, i, length, callback, callbackSucc) {
    // 获取签名
    this._qianmin(cospath, qianmin => {
      // 调用上传
      this._uploadFile(cospath, qianmin, filePaths, successUp, failUp, i, length, callback, callbackSucc)
    })
  }


  // 上传
  _uploadFile(cospath, qianmin, filePaths, successUp, failUp, i, length, callback, callbackSucc) {

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
        console.log('fail-上传失败', res,)
        return
      },
      complete: () => {
        i++;
        if (i == length) {
          callbackSucc && callbackSucc('成功' + successUp + '失败' + failUp)
        }
        else {  //再次调用uploadDIY函数
          this._uploadFile(cospath, qianmin, filePaths, successUp, failUp, i, length, callback, callbackSucc);
        }
      },
    });
  }

}




export { Cos }

