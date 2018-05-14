import { Api } from '../../utils/Api.js'
import { Utils } from '../../utils/utils.js'

const api = new Api()
const utils = new Utils()
const app = getApp()


Page({

  data: {
    Res: false,
    dingzhijilu: false,  // 顶置记录，顶过显示去首页逛逛
  },


  onLoad: function (op) {
    // op.id是直接转发携带，op.scene是码携带
    console.log('op', op)
    op.id = op.id ? op.id : decodeURIComponent(op.scene)
    this._load(op.id)
  },

  _load(id) {
    // 查询单个便民信息
    api.findBianmin({ id: id }, (back) => {
      console.log('查询单个便民信息', back)
      this.setData({ Res: back.data })
    })
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
      this.setData({ loginTanChuang: true })
    }
  },

})

// * 服务器删除信息一起删除帮顶记录