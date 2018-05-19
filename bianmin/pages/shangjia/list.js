import { Api } from '../../utils/Api.js'

const api = new Api()

let page = 1;

Page({

  data: {
    noData: false,              // 上拉更多
  },


  onLoad: function (op) {
    this._getShangjiaList()
  },

  // 获取商家列表
  _getShangjiaList() {
    // 分页1
    page = 1
    api.selectShangjia({ page: page }, res => {
      console.log('商家列表', res)
      this.setData({ shangjiaList: res.data })
    })
  },

  // 去商家详情页
  go_shangjiaDetail_(e) {
    console.log('去商家详情页', e.currentTarget.id)
    wx.navigateTo({ url: '/pages/shangjia/detail?id=' + e.currentTarget.id })
  },

  // 上拉触底
  onReachBottom: function () {
    console.log('上拉触底')
    if (this.data.noData == false) {
      console.log('上拉触底noData = false')
      if (this.data.shangjiaList.length < 20) {
        console.log('上拉触底Res.length < 20')
        this.setData({ noData: true })
      } else {
        page++
        api.selectShangjia({ page: page }, res => {
          if (res.data.length == 0) {
            this.setData({ noData: true })
          } else {
            if (res.data.length < 20) {
              let newRes = this.data.shangjiaList.concat(res.data)
              this.setData({ shangjiaList: newRes, noData: true })
            } else {
              let newRes = this.data.shangjiaList.concat(res.data)
              this.setData({ shangjiaList: newRes })
            }
          }
        })
      }
    }
  },

})