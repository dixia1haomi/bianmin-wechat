import {
  Api
} from './utils/Api.js'
import {
  Base
} from './utils/Base.js'

const base = new Base()
const api = new Api()

// 全屏模式
// "navigationStyle": "custom"


App({

  data: {
    LoginState: false, // 登陆状态
  },

  onError: function(msg) {
    console.log('app.onError', msg)
    // 错误请求到服务器
    // api.onError({
    //   msg: msg
    // })
  },


  onLaunch: function(op) {
    console.log('app op', op)
    // 检查来源(直接从需要携带token的页面进来时可能token还未生成，需要主动调用checkToken)
    if (op.path == "pages/bmxx/myfabu" || op.path == "pages/huodong/detail") {
      return;
    }

    // 小程序初始化检查token
    // this.checkToken()

  },



  // ---------------------------------------------------Token-----------------------------------------------------

  // 小程序初始化检查token
  checkToken(callback) {
    let token_key = wx.getStorageSync('token_key')
    //用户可能第一次来，缓存中没有token
    if (!token_key) {
      console.log('第一次来,我要去获取token')
      this._getToken((back) => {
        callback && callback()
      })
    } else {
      console.log('我要去服务器检查token是否有效')
      this._service_CheckToken(token_key, () => {
        callback && callback()
      })
    }
  },


  // 获得token
  _getToken(callback) {
    wx.login({
      success: (res) => {
        if (res.code) {
          api.getToken({
            code: res.code
          }, (back) => {
            console.log('已获得token', back.token_key, '设置登陆态', back.loginstate, 'uid', back.uid)
            // 设置本地缓存
            wx.setStorageSync('token_key', back.token_key)
            // 设置全局data
            this.data.LoginState = back.loginstate
            this.data.uid = back.uid
            // back = {token_key:token_key,loginstate:loginstate,uid:uid}
            callback && callback()
          })
        }
      }
    })
  },

  // 去服务器检查token,如果失效,调用获取token
  _service_CheckToken(token_key, callback) {
    api.checkToken({
      token: token_key
    }, back => {
      console.log('service_CheckToken', back)
      // 失效：back = {token:false} || 有效：back = {token:true,loginstate:布尔,uid:uid}
      if (back.token) {
        console.log('服务器token还有效', back.token, '登陆态', back.loginstate, 'uid', back.uid)
        this.data.LoginState = back.loginstate
        this.data.uid = back.uid
        callback && callback()
      } else {
        console.log('服务器token已失效')
        this._getToken(() => {
          callback && callback()
        })
      }
    })
  },


  // ----------------------------------------------- 登陆 ---------------------------------------------------

  // 保存用户信息
  saveUserInfo(info, callback) {
    console.log('保存用户信息', info)
    api.saveUserInfo({
      info: info.userInfo
    }, (back) => {
      console.log('保存用户信息OK', back)
      wx.setStorageSync('userinfo', info.userInfo)
      wx.showToast({
        title: '登陆成功'
      })
      this.data.LoginState = true
      this.data.uid = back
      callback && callback()
    })
  },


  // 获取地理位置
  // getLocation() {
  //   wx.getLocation({
  //     type: 'wgs84',
  //     success: (res) => {
  //       this.data.Location = {
  //         latitude: res.latitude,
  //         longitude: res.longitude,
  //         speed: res.speed,
  //         accuracy: res.accuracy
  //       }
  //       console.log('获取地理位置', this.data.Location)
  //     }
  //   })
  // }


})