import { Api } from '../../utils/Api.js'

const api = new Api()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Res: false,
    loginTanChuang: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },


  onShow: function (qq) {
    // 如果是跳过首页直接进入这个页面app.onLaunch不会请求token，主动请求回调后再_load(需要携带token)
    app.checkToken(() => {
      this._load()
    })
  },

  // ------------------------------------------------- 回复 -------------------------------------------------


  // 弹窗开关事件(清空input、bmxx_id)
  tanchuang_() { this.setData({ tanChuang: !this.data.tanChuang, input: null }) },

  // 回复输入事件
  huifu_input_(e) { this.setData({ input: e.detail.value }) },

  // ---- 回复事件 ----
  huifu_(e) {
    if (app.data.LoginState) {
      this.tanchuang_()
      this.setData({
        liuyan_id: e.currentTarget.dataset.liuyan_id,
        huifu_user_id: e.currentTarget.dataset.huifu_user_id,
        bmxx_id: e.currentTarget.id
      })
    } else {
      // 登陆弹窗
      this.setData({ loginTanChuang: true })
    }
  },

  // 回复确定
  huifu_queding_(e) {

    // * 验证input内容
    let input = this.data.input
    if (!input || input.length > 50) {
      wx.showModal({ content: '长度请控制在1-50个字之间', showCancel: false })
      return
    }

    console.log('formId', e.detail.formId)
    // 新增回复
    api.createBianminHuifu({
      liuyan_id: this.data.liuyan_id,             // 这个回复属于那条留言，写入回复表
      huifu_user_id: this.data.huifu_user_id,     // 被回复人，写入回复表
      neirong: input,                             // 回复内容，写入回复表
      form_id: e.detail.formId,                   // 写入便民信息表，有留言再次提醒
      bmxx_id: this.data.bmxx_id                  // 省得服务器多查一次留言表
    }, (back) => {
      console.log('新增回复OK', back)
      // 刷新
      this._load()
    })

    // 关闭弹窗
    this.tanchuang_()
  },

  // ------------------------------------------------- 登陆 -------------------------------------------------
  // 关闭登陆弹窗
  loginTanChuangQuXiao_() { this.setData({ loginTanChuang: false }) },

  // formid
  getFormId_(e) {
    this.setData({ form_id: e.detail.formId })
  },

  // 获得用户信息登陆成功后关闭弹窗
  getUserInfo_(e) {
    // 如果有form_id
    if (this.data.form_id) {
      e.detail.userInfo.form_id = this.data.form_id
    } else {
      e.detail.userInfo.form_id = ''
    }
    this.setData({ loginTanChuang: false }, () => { app.saveUserInfo(e.detail) })
  },

  // ------------------------------------------------- load -------------------------------------------------

  _load() {
    wx.showLoading({ title: '加载中' })
    api.myFabu({}, back => {
      wx.hideLoading()
      console.log('我的发布', back)
      this.setData({ Res: back.data })
    })
  },



  // 修改内容
  go_xiugai_() {
    wx.navigateTo({ url: '/pages/wode/xiugaifabu' })
  },


  // 删除我的信息
  myDelete(e) {
    wx.showModal({
      title: '删除这条信息？',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          // 禁止操作
          wx.showLoading({ title: '删除中..', mask: true })
          api.deleteMyFabu({ list_id: e.currentTarget.id }, res => {
            // 删除成功
            console.log('删除成功', res)
            wx.hideLoading()
            // 刷新
            this._load()
          })
        }
      }
    })
  },

  // 刷新 ， 更新update_time
  updateTime(e) {
    wx.showLoading({ title: '刷新中..', mask: true })
    api.updateTime({ id: e.currentTarget.id }, back => {
      wx.hideLoading()
      console.log('刷新', back)
      wx.showModal({ content: back.data })
      this._load()
    })
  },

  // ------------------------------------------------- 留言提示 -------------------------------------------------

  // 更新便民信息formId
  liuyanTishi_(e) {
    console.log('留言提示', e.detail.formId, e.currentTarget.id)
    wx.showLoading({ title: '记录中..', mask: true })
    api.updateFormId({ id: e.currentTarget.id, form_id: e.detail.formId }, back => {
      // 隐藏按钮
      wx.hideLoading()
      this.setData({ 'Res.form_state': true })
      wx.showToast({ title: 'OK' })
    })
  },

})