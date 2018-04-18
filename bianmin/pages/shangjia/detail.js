import { Api } from '../../utils/Api.js'
// import { Base } from '../../utils/Base.js'

// const base = new Base()
const api = new Api()

Page({

  data: {
    // 商家信息
    shangjiaRes: {},
  },


  onLoad: function (op) {
    // 接受商家ID
    this._load(op.id)
  },


  _load(id) {
    api.findShangjia({ id: id }, res => {
      console.log('商家详情', res)
      this.setData({ shangjiaRes: res.data })
    })
  },


  // 打开地图查看地址
  open_map_() {
    wx.openLocation({
      latitude: parseFloat(this.data.shangjiaRes.latitude),
      longitude: parseFloat(this.data.shangjiaRes.longitude),
      name: this.data.shangjiaRes.name,
      scale: 28
    })
  },

  // 拨打电话
  call_phone_() {
    wx.makePhoneCall({
      phoneNumber: this.data.shangjiaRes.phone
    })
  },


})