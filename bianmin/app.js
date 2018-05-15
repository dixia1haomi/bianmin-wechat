import { Api } from './utils/Api.js'
import { Base } from './utils/Base.js'

const base = new Base()
const api = new Api()

// 全屏模式
// "navigationStyle": "custom"


App({

  data: {
    LoginState: false,   // 登陆状态
  },

  onError: function (msg) {
    console.log('app.onError', msg)
    // 错误请求到服务器
    api.onError({ msg: msg })
  },


  onLaunch: function (op) {
    console.log('app op', op)
    // 检查来源(直接从需要携带token的页面进来时可能token还未生成，需要主动调用checkToken)
    if (op.path == "pages/bmxx/myfabu") { return; }

    // 小程序初始化检查token
    this.checkToken()
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