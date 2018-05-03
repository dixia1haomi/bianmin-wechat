import { Api } from './utils/Api.js'
import { Base } from './utils/Base.js'

const base = new Base()
const api = new Api()

// 全屏模式
// "navigationStyle": "custom"

// 未完成事项
// * 分页 / 初步完成，找找内容提示展开的其他实现办法

// 4/20
// * 商家列表分页，显示没有更多
// * base基类异常处理，服务器异常记录
// * 用token_key取缓存中的token失败，来自get_Token_Value_Vars，出现提示重新登陆

App({

  data: {
    LoginState: false,   // 登陆状态
  },


  onLaunch: function (op) {
    console.log('app op', op)
    // 检查来源（直接从需要携带token的页面进来时可能token还未生成，需要主动调用checkToken）
    if (op.path != "pages/wode/myfabu") {
      // 小程序初始化检查token
      this.checkToken()
    }


    // 获取地理位置
    // this._check_userLocation()

    // 获取设备信息
    // this.getSysInfo()

    // console.log(this.appData)
  },



  // ---------------------------------------------------Token-----------------------------------------------------

  // 小程序初始化检查token
  checkToken(callback) {
    let token_key = wx.getStorageSync('token_key')
    //用户可能第一次来，缓存中没有token
    if (!token_key) {
      console.log('第一次来,我要去获取token')
      this._getToken(() => { callback && callback() })
    } else {
      console.log('我要去服务器检查token是否有效')
      this._service_CheckToken(token_key, () => { callback && callback() })
    }
  },


  // 获得token
  _getToken(callback) {
    wx.login({
      success: (res) => {
        if (res.code) {
          api.getToken({ code: res.code }, (back) => {
            wx.setStorageSync('token_key', back.token_key)
            console.log('已获得token', back.token_key, '设置登陆态', back.loginstate)
            this.data.LoginState = back.loginstate
            callback && callback()
          })
        }
      }
    })
  },

  // 去服务器检查token,如果失效,调用获取token
  _service_CheckToken(token_key, callback) {
    api.checkToken({ token: token_key }, back => {
      console.log('service_CheckToken', back)
      if (back.token) {
        console.log('服务器token还有效,登陆态', back.loginstate)
        this.data.LoginState = back.loginstate
        callback && callback()
      } else {
        console.log('服务器token已失效')
        this._getToken(() => { callback && callback() })
      }
    })
  },


  // ----------------------------------------------- 登陆 ---------------------------------------------------

  // 保存用户信息
  saveUserInfo(info, callback) {
    console.log('保存用户信息', info)
    api.saveUserInfo({ info: info.userInfo }, (back) => {
      console.log('保存用户信息OK', back)
      wx.setStorageSync('userinfo', info.userInfo)
      wx.showToast({ title: '登陆成功' })
      this.data.LoginState = true
      this.data.uid = back
      callback && callback()
    })
  },

  // 初始化检查token
  // checkToken() {
  //   let token_key = wx.getStorageSync('token_key')
  //   //用户可能第一次来，缓存中没有token
  //   if (token_key) {
  //     console.log('去服务器检查token是否有效')
  //     this.service_CheckToken(token_key)
  //   }
  // },




  // // 去服务器检查token,如果失效,调用获取token
  // service_CheckToken(token_key, callback) {
  //   api.checkToken({ token: token_key }, back => {
  //     console.log('service_CheckToken', back)
  //     if (back) {
  //       console.log('服务器token还有效,设置登录态')
  //       // 登录态
  //       this.appData.LoginState = true
  //       callback && callback()
  //     } else {
  //       console.log('服务器token已失效,重新登陆')
  //       this.newGetToken(() => {
  //         callback && callback()
  //       })
  //     }
  //   })
  // },



  // 新的按钮登陆,接受userinfo信息
  // newLogin(userinfo, callback) {
  //   console.log('newLogin', userinfo)

  //   if (userinfo.errMsg == "getUserInfo:ok") {
  //     wx.showLoading({ title: '登陆中..', mask: true })
  //     wx.login({
  //       success: (res) => {
  //         if (res.code) {
  //           // 加入code
  //           userinfo.code = res.code
  //           console.log('userinfo1', userinfo)
  //           // 请求服务器
  //           api.newLogin(userinfo, (back) => {
  //             console.log('backinfo', back)
  //             // 登录态
  //             this.appData.LoginState = true
  //             // 缓存token
  //             wx.setStorageSync('token_key', back.token)
  //             // 缓存返回的info
  //             wx.setStorageSync('userinfo', back.userinfo)
  //             // callback
  //             callback && callback()
  //             // 隐藏loding
  //             wx.hideLoading()
  //             // 提示成功
  //             wx.showToast({ title: '登陆成功', icon: 'success' })
  //           })
  //         } else {
  //           // 隐藏loding
  //           wx.hideLoading()
  //           // 提示失败
  //           wx.showToast({ title: '登陆失败' })
  //         }
  //       }
  //     });
  //   }
  // },


  // 修改后的登陆
  // newGetToken(callback) {
  //   // 调用授权
  //   base.authorize_userinfo(back => {
  //     // 正在登陆
  //     wx.showLoading({ title: '登陆中..', mask: true })

  //     wx.login({
  //       success: (res) => {
  //         console.log('code', res)
  //         if (res.code) {
  //           // 获取用户信息
  //           wx.getUserInfo({
  //             // lang: "zh_CN",
  //             success: (info) => {
  //               // 登陆
  //               console.log('info', info)
  //               info.code = res.code
  //               // 请求服务器
  //               api.newLogin(info, (back) => {
  //                 console.log('backinfo', back)
  //                 // 登录态
  //                 this.appData.LoginState = true
  //                 // 缓存token
  //                 wx.setStorageSync('token_key', back.token)
  //                 // 缓存返回的info
  //                 wx.setStorageSync('userinfo', back.userinfo)
  //                 // callback
  //                 callback && callback()
  //                 // 隐藏loding
  //                 wx.hideLoading()
  //                 // 提示成功
  //                 wx.showToast({ title: '登陆成功', icon: 'success' })
  //               })
  //             },
  //             fail: (err) => {
  //               console.log('获取用户信息进入fail', err)
  //               // *跳转错误页并提示重新登陆
  //             }
  //           })
  //         } else {
  //           console.log('获取用户登录态失败！' + res.errMsg)
  //           // *跳转错误页并提示重新登陆
  //         }
  //       }
  //     });
  //   })
  // }

  // --------------------------------------------------获取设备信息--------------------------------------------
  // 获取设备信息
  // getSysInfo() {
  //   wx.getSystemInfo({
  //     success: (res) => {
  //       console.log('获取设备信息', res)
  //       console.log('屏幕宽', res.windowWidth)
  //       this.appData.sysWidth = res.windowWidth
  //       console.log('屏幕高', res.windowHeight)
  //       this.appData.sysHeight = res.windowHeight
  //       console.log('屏幕总高', res.screenHeight)
  //       this.appData.screenHeight = res.screenHeight
  //     },
  //     fail: (err) => {
  //       console.log('获取设备信息进入fail', err)
  //     }
  //   })
  // },






  // 获取地理位置（餐厅详情页调用）
  // getLocation(callback) {
  //   wx.getLocation({
  //     // type: 'wgs84',
  //     type: 'gcj02', //返回可以用于wx.openLocation的经纬度
  //     success: (res) => {
  //       console.log('app-获取地理位置', res)
  //       this.appData.longitude = res.longitude
  //       this.appData.latitude = res.latitude
  //       this.appData.LocationState = true
  //       callback && callback()
  //     }
  //   })
  // },
})