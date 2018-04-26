import { Api } from '../../utils/Api.js'
// import { Base } from '../../utils/Base.js'

// const base = new Base()
const api = new Api()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Res: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  onShow: function () {

    this._load()
  },

  _load() {
    wx.showLoading({ title: '加载中' })
    api.myFabu({}, back => {
      wx.hideLoading()
      console.log('我的发布', back)
      this.setData({ Res: back.data })
    })
  },



  // 修改内容
  go_xiugai_(e) {
    wx.navigateTo({ url: '/pages/wode/xiugaifabu?index=' + e.currentTarget.dataset.index })
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

})