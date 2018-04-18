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


})