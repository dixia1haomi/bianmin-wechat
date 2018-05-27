import { Api } from '../../utils/Api.js'

const api = new Api()

Page({

  data: {
    // 活动信息
    huodongRes: {},
  },


  onLoad: function (op) {
    // 接受活动ID
    this._load(op.id)
  },


  _load(id) {
    api.findShangjiaHuodong({ id: id }, res => {
      console.log('活动详情', res)
      this.setData({ huodongRes: res.data })
    })
  },

  // 参与活动
  canyu_(e) {
    let id = e.currentTarget.id
    // 需要先登录获得用户资料
    // 写入参与表
    // 把按钮变成邀请朋友助力
    // 直接分享 || 生成二维码分享 && 携带活动ID和用户ID

    // 用户携带活动ID和用户ID进入后 -> 
    // (如果进入场景？ || 携带了UID 进入的显示为朋友助力按钮)
  },

})