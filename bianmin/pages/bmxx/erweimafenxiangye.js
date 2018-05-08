import { Api } from '../../utils/Api.js'
import { Utils } from '../../utils/utils.js'

const api = new Api()
const utils = new Utils()
const app = getApp()


Page({

  data: {
    Res: false,
    dingzhijilu: false,  // 顶置记录，顶过显示去首页逛逛
    loginTanChuang: false,      // 登陆弹窗
    form_id: null,              // form_id
  },


  onLoad: function (op) {
    console.log('op', op)
    var scene = decodeURIComponent(op.scene)
    console.log('index1-scene', scene)
    this._load(scene)
  },

  _load(scene) {
    // 查询单个便民信息
    api.findBianmin({ id: scene }, (back) => {
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
          wx.showModal({ title: '帮顶成功', showCancel: false })
        } else {
          wx.showModal({ title: '你已经帮他顶过了', showCancel: false })
        }
        this.setData({ dingzhijilu: true })
      })
    } else {
      // 显示登录
      this.setData({ loginTanChuang: true })
    }
  },


  // -------------------------------------------------------- 登陆 ---------------------------------------------------------
  // 关闭登陆弹窗
  loginTanChuangQuXiao_() { this.setData({ loginTanChuang: false }) },

  // formid
  getFormId_(e) { this.setData({ form_id: e.detail.formId }) },

  // 获得用户信息登陆成功后关闭弹窗
  getUserInfo_(e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      // 如果有form_id
      if (this.data.form_id) {
        e.detail.userInfo.form_id = this.data.form_id
      } else {
        e.detail.userInfo.form_id = ''
      }
      this.setData({ loginTanChuang: false }, () => { app.saveUserInfo(e.detail) })
    }
  },
})

// * 留言
// * 电话
// * 服务器删除信息一起删除帮顶记录