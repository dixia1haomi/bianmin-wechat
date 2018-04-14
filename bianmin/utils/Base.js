import { Config } from './Config.js'

class Base {
  constructor() {
  }

  // 请求基类
  request(params, noRefetch) {
    let that = this
    wx.request({
      url: Config.url + params.url,
      method: 'POST',
      data: params.data,
      header: {
        'content-type': 'application/json',
        'token_key': wx.getStorageSync('token_key')
      },
      success(res) {
        console.log('base', res)
        // if (res.statusCode == 200) {
        //   // 成功
        // if (res.data.errorCode == 0) {
        params.sCallback && params.sCallback(res.data)
        // }else{
        //   console.log('base-errorCode不等于0')
        // }
        //   // Token类错误，40000
        //   else if (res.data.errorCode == 40000 && !noRefetch) {
        //     that._refetch(params)
        //   }
        //   // errorCode不等于0，* 错误页并记录日志
        //   else {
        //     // wx.navigateTo({ url: '/pages/exception/exception?code=' + 'errorCode不等于0' })
        //   }
        // } else {
        //   console.log('Base基类请求失败，statusCode不等于200', res)
        //   // statusCode不等于200,可能是请求成功，但是出现了错误
        //   // wx.navigateTo({ url: '/pages/exception/exception?code=' + 'statusCode不等于200' })
        // }

      },
      fail(err) {
        // 提示-请检查网络状态-重试(*)
        console.log('Base基类请求失败,进入fail')
        // wx.navigateTo({ url: '/pages/exception/exception?code=' + 'basefail' })
      }
    })
  }

  // 请求接口失败重试
  _refetch(params) {
    getApp().newGetToken((back) => {
      this.request(params, true);
    });
  }


  // ----------------------------------------------------------授权------------------------------------------------------------




  // -------------------------------------------------------------------------------------------------------------------------



  // --------授权用户信息-userinfo------
  authorize_userinfo(callBack) {
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo']) {
          console.log('base-没有授权用户信息')
          // 提前授权
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意
              callBack && callBack(true)
            },
            fail() {
              wx.openSetting({ success: (res) => { if (res.authSetting['scope.userInfo']) { callBack && callBack(true) } } })
            }
          })
        } else {
          callBack && callBack(true)
        }
      },
      fail: (err) => {
        console.log('base-授权用户信息进入fail', err)
        wx.showToast({ title: '微信授权失败' })
      }
    })
  }

  // -------- 授权地理位置 ---------
  authorize_userLocation(callBack) {
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userLocation']) {
          console.log('base-没有授权地理位置')
          // 提前授权
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              // 用户已经同意
              callBack && callBack(true)
            },
            fail() {
              wx.openSetting({ success: (res) => { if (res.authSetting['scope.userLocation']) { callBack && callBack(true) } } })
            }
          })
        } else {
          callBack && callBack(true)
        }
      },
      fail: (err) => {
        console.log('base-授权地理位置进入fail', err)
        wx.showToast({ title: '微信授权失败' })
      }
    })
  }



  // --------授权保存到相册------
  authorize_writePhotosAlbum(callBack) {
    console.log('base-授权保存到相册')
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() { callBack && callBack(true) },
            fail() {
              wx.openSetting({ success: (res) => { if (res.authSetting['scope.writePhotosAlbum']) { callBack && callBack(true) } } })
            }
          })
        } else { callBack && callBack(true) }
      },
      fail: (err) => { console.log('base-授权保存到相册进入fail', err) }
    })
  }


  // ----------------------------------------------------------授权------------------------------------------------------------
  //接受tp返回的日期时间格式"2017/11/02 00:25:46"的字符串 -> 转化成（刚刚）（2分钟前）（1小时前）...
  time(time) {
    //转化成时间戳
    let timestamp = Date.parse(new Date(time));
    //2014/07/10 10:21:12的时间戳为：1404958872  -> console.log(time + "的时间戳为：" + timestamp);

    // 定义 ： 月 / 天 / 时 / 分
    let minute = 1000 * 60;   // 分钟
    // let hour = minute * 60;   // 小时
    // let day = hour * 24;      // 天
    // let month = day * 30;     // 月

    // 计算相差时间
    let now = new Date().getTime();   //当前时间
    let diffValue = now - timestamp;   //时间差 = 当前时间 - 数据库取出的时间
    // let monthC = diffValue / month;     //相差多少月 = 时间差 / 月
    // let weekC = diffValue / (7 * day);    //相差多少周 = 时间差 / 7天
    // let dayC = diffValue / day;   //相差多少天 = 时间差 / 天
    // let hourC = diffValue / hour;   //相差多少小时 = 时间差 / 小时
    let minC = parseInt(diffValue / minute);  //相差多少分钟 = 时间差 / 分钟 (parseInt转成整数..后面有很多小数点)
    if (diffValue < 0) { return; }   //意外 -> 没有时间差？？？


    //处理返回结果
    if (minC < 1) { return "刚刚" }
    else if (minC >= 1 && minC < 60) { return minC + "分钟前" }
    // else if (minC >= 60 && minC < 1440) { return "今天" }
    else if (minC >= 60 && minC < 1440) { return parseInt(minC/60) + "小时前" }
    else if (minC >= 1440 && minC < 43200) { return parseInt(minC / 1440) + "天前" }
    else { return parseInt(minC / 43200) + "个月前" }

    // 原来处理返回结果的方法
    // if (monthC >= 1) { res.update_time = parseInt(monthC) + "月前" }
    // else if (weekC >= 1) { res.update_time = parseInt(weekC) + "周前" }
    // else if (dayC >= 1) { res.update_time = parseInt(dayC) + "天前" }
    // else if (hourC >= 1) { res.update_time = parseInt(hourC) + "小时前" }
    // else if (minC >= 1) { res.update_time = parseInt(minC) + "分钟前" }
    // else { res.update_time = "刚刚" }
  }

}

export { Base }



  // 用户授权
  // scope.userInfo	wx.getUserInfo	用户信息
  // scope.userLocation	wx.getLocation, wx.chooseLocation	地理位置
  // scope.address	wx.chooseAddress	通讯地址
  // scope.invoiceTitle	wx.chooseInvoiceTitle	发票抬头
  // scope.werun	wx.getWeRunData	微信运动步数
  // scope.record	wx.startRecord	录音功能
  // scope.writePhotosAlbum	wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum	保存到相册
  // scope.camera		摄像头