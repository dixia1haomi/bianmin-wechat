import { Api } from '../../utils/Api.js'

const api = new Api()

Page({

  data: {
    Res: false,

  },




  // ---------------------------- onLoad -----------------------------
  onLoad: function (op) {
    console.log('q', op)
    var scene = decodeURIComponent(op.scene)
    console.log('index1-scene', scene)
    this._load(op.id)
  },

  _load(id) {
    // 查询单个便民信息
    api.findBianmin({ id: id }, (back) => {
      console.log('查询单个便民信息', back)
      this.setData({ Res: back.data })
    })
  },


})