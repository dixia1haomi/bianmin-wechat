import { Api } from '../../utils/Api.js'

const api = new Api()


// HTML解析
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    let wenzhang_id = op.id
    console.log('wenzhang_id', wenzhang_id)

    this._load(wenzhang_id)
  },

  _load(wenzhang_id) {
    api.wenzhangDetail({ wenzhang_id: wenzhang_id }, back => {
      console.log('文章详情', back)
      this.setData({ wenzhangDetail: back.data }, () => {
        // 解析HTML
        WxParse.wxParse('wenzhang', 'html', back.data.html, this, 0);
      })

    })
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})