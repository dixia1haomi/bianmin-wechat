import { Api } from '../../utils/Api.js'
import { Utils } from '../../utils/utils.js'

const api = new Api()
const utils = new Utils()
const app = getApp()


Page({

  data: {
    Res: false,
    dingzhijilu: false,  // 顶置记录，顶过显示去首页逛逛
    // 登录弹窗
    loginState: false,
  },


  onLoad: function (op) {
    // op.scene是携带的参数
    console.log('op', op.scene)
    op.scene = decodeURIComponent(op.scene)
    this._load(op.scene)
  },


  _load(id) {
    // 查询单个便民信息
    api.findBianmin({ id: id }, (back) => {
      console.log('查询单个便民信息', back)
      this.setData({ Res: back.data })
    })
  },

  // ----------------- 登录组件 -------------------
  // 打开登录弹窗
  com_login_() {
    this.setData({ loginState: true })
  },

  // 增加顶置时间(携带信息ID)
  createBmxxDingZhi_(e) {
    if (app.data.LoginState) {
      api.createBmxxDingZhi({ id: e.currentTarget.id }, back => {
        console.log('增加顶置时间OK', back)
        if (back.msg === "ok") {
          wx.showModal({
            title: '帮顶成功',
            content: '感谢使用沾益袋鼠同城+,再次点击按钮可以去首页逛逛。',
            showCancel: false
          })
        } else {
          wx.showModal({
            title: '你已经帮他顶过了',
            content: '感谢使用沾益袋鼠同城+,再次点击按钮可以去首页逛逛。',
            showCancel: false
          })
        }
        // 刷新(信息ID)
        this._load(e.currentTarget.id)
        this.setData({ dingzhijilu: true })
      })
    } else {
      // 显示登录
      this.setData({ loginState: true })
    }
  },

})
