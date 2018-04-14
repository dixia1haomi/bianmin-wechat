import { Api } from '../../utils/Api.js'
import { Base } from '../../utils/Base.js'

const base = new Base()
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
    this._load()
  },

  _load() {
    api.myFabu({}, back => {
      console.log('我的发布', back)
      // this.setData({ Res: back.data })

      // 加入展开折叠
      for (let i in back.data) {
        back.data[i].hid = false
        // 转化时间
        back.data[i].time = base.time(back.data[i].update_time)
      }
      this.setData({ Res: back.data }, () => {
        // 获取并设置内容高度，用于超出显示范围就提示展开
        this._getHeight(back.data)
      })
    })
  },

  _getHeight(res) {
    //创建节点选择器
    var query = wx.createSelectorQuery();
    query.selectAll('#neirong').boundingClientRect((rects) => {
      rects.forEach(function (rect, index) { res[index].height = rect.height })
      this.setData({ Res: res })
    }).exec()
  },

  // 展开，折叠
  flodFn: function (e) {
    let index = e.currentTarget.dataset.index, res = this.data.Res

    // 如果hid是初始的false,允许改成true
    // if (res[index].hid == false) {
    var param = {};
    var str = "Res[" + index + "].hid"
    param[str] = !res[index].hid  // 展开折叠
    // param[str] = true             // 只展开
    this.setData(param)
    // }
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
      console.log('刷新成功.', back)
      wx.hideLoading()
      this._load()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})