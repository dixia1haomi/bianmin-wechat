import { Api } from '../../utils/Api.js'

const api = new Api()
const app = getApp()

Page({

  data: {
    Res: false,
    // 登陆弹窗
    loginTanChuang: false,
    // form_id
    form_id: null,

    // ---- 留言回复 ----
    tanChuang: false,
    input: null,
    input_cursor: 0,

    // ---- 留言 ----
    bianmin_id: null
  },

  // ---------------------------- 登陆 -----------------------------
  // 关闭登陆弹窗
  loginTanChuangQuXiao_() { this.setData({ loginTanChuang: false }) },

  // formid
  getFormId_(e) {
    this.setData({ form_id: e.detail.formId })
  },

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


  // ---------------------------- onLoad -----------------------------
  onLoad: function (op) {
    console.log('q', op)
    this._load(op.id)
  },

  _load(id) {
    // 查询单个便民信息
    api.findBianmin({ id: id }, (back) => {
      console.log('查询单个便民信息', back)
      this.setData({ Res: back.data })
    })
  },


  // ------------------------------------------------- 留言 -------------------------------------------------

  // 弹窗开关事件(清空input、bmxx_id)
  tanchuang_() { this.setData({ tanChuang: !this.data.tanChuang, input: null }) },

  // 留言、回复输入事件
  liuyan_input_(e) { this.setData({ input: e.detail.value, input_cursor: e.detail.cursor }) },

  // ---- 留言事件 ----
  liuyan_(e) {
    if (app.data.LoginState) {
      this.tanchuang_()
      this.setData({
        bianmin_id: e.currentTarget.dataset.bianmin_id
      })
    } else {
      // 登陆弹窗
      this.setData({ loginTanChuang: true })
    }
  },

  // 留言确定
  liuyan_queding_(e) {

    // * 验证input内容
    let input = this.data.input
    if (!input || input.length > 50) {
      wx.showModal({ content: '长度请控制在1-50个字之间', showCancel: false })
      return
    }

    console.log('formId', e.detail.formId)
    // 新增留言
    api.createBianminLiuyan({
      bmxx_id: this.data.bianmin_id,
      neirong: input,
      form_id: e.detail.formId
    }, (back) => {
      console.log('新增留言OK', back)
      // 刷新
      this.setData({ Res: back.data })
    })

    // 关闭弹窗
    this.tanchuang_()
  },


  // 打开地图
  dizhi_(e) {
    console.log('地址', e.currentTarget.dataset)
    wx.openLocation({
      latitude: parseFloat(e.currentTarget.dataset.latitude),
      longitude: parseFloat(e.currentTarget.dataset.longitude),
      name: e.currentTarget.dataset.address,
      scale: 28
    })
  },

  // 拨打电话
  call_phone_(e) {
    console.log('拨打电话', e.currentTarget.id)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.id //仅为示例，并非真实的电话号码
    })
  },

})