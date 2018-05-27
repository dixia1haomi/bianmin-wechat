import { Api } from '../../utils/Api.js'

const api = new Api()

let shangjia_id;

Page({

  data: {
    // 活动列表
    huodongList: false
  },

  onLoad: function (op) {
    shangjia_id = op.id
    console.log('shangjia_id', shangjia_id)
    this._load()
  },

  // 查询活动列表
  _load() {
    api.selectShangjiaHuodong({ shangjia_id: shangjia_id }, back => {
      console.log('查询活动列表', back)
      this.setData({ huodongList: back.data })
    })
  },

  // 去活动详情页
  go_huodong_Detail_(e) {
    wx.navigateTo({ url: '/pages/huodong/my-huodong/index?id=' + e.currentTarget.id })
  },

  // 创建活动
  create_huodong_() {
    // 去创建活动页
    wx.navigateTo({ url: '/pages/huodong/my-huodong/create-huodong?id=' + shangjia_id })
  },


})