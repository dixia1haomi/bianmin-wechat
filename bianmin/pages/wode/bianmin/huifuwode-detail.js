import { Api } from '../../../utils/Api.js'

const api = new Api()

Page({

  data: {

  },

  onLoad: function (op) {
    console.log('q', op)
    this._load(op.id)
  },

  _load(id) {
    console.log('w', id)
    // 查询单个便民信息
    api.findBianmin({ id: id }, (back) => {
      console.log('查询单个便民信息')
      this.setData({ Res: back.data })
    })
  },

})