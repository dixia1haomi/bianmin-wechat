import { Api } from '../../utils/Api.js'
const api = new Api()


let page = 1;

Page({

  data: {
    Res: [],
    shangjiaList: [],           // 商家列表
    noData: false,              // 上拉更多

  },

  // 剪贴板
  fuzhi_() {
    wx.setClipboardData({
      data: 'daishuweixin1',
      success: function (res) {
        wx.showModal({
          title: '袋鼠微信已复制',
          content: '你好、我是小优、很期待与你成为朋友、快去加我吧。',
          showCancel:false
        })
      }
    })
  },

  // ----------------- 登录组件 -------------------
  // 打开登录弹窗
  com_login_() {
    console.log('asd')
    this.setData({ loginState: true })
  },

  // -------------------------------------------- 展开 --------------------------------------
  zhankai_() {
    this.setData({ zhankai: !this.data.zhankai })
  },

  // -------------------------------------------- onLoad --------------------------------------

  onLoad: function (op) {
    this._load()
    this._getShangjiaList()
  },


  // 请求数据
  _load(callback) {
    // 分页1
    page = 1
    api.getList({ page: page }, res => {
      console.log('aa', res.data)
      this.setData({ Res: res.data })
      // 回调给下拉刷新用
      callback && callback()
    })
  },

  // 获取商家列表
  _getShangjiaList() {
    api.selectShangjia({}, res => {
      console.log('商家列表', res)
      this.setData({ shangjiaList: res.data })
    })
  },

  // 去商家列表页
  go_shangjiaList_() { wx.navigateTo({ url: '/pages/shangjia/list' }) },

  // 商家横向滚动视图 
  scroll(e) { wx.navigateTo({ url: '/pages/shangjia/detail?id=' + e.currentTarget.id }) },

  // 去我的页
  go_wode() { wx.navigateTo({ url: '/pages/wode/index' }) },


  // ------------------------------------------------- 下拉刷新、上拉加载、分享 -------------------------------------------------


  // 下拉刷新
  onPullDownRefresh: function () {
    this._load(back => {
      this.setData({ noData: false })
      wx.stopPullDownRefresh()
    })
    this._getShangjiaList()
  },

  // 上拉触底
  onReachBottom: function () {
    console.log('上拉触底')
    if (this.data.noData == false) {
      console.log('上拉触底noData = false')

      if (this.data.Res.length < 20) {
        console.log('上拉触底Res.length < 20')
        this.setData({ noData: true })
      } else {
        page++
        api.getList({ page: page }, res => {
          console.log('上拉触底分页', page)
          if (res.data.length == 0) {
            this.setData({ noData: true })
          } else {
            if (res.data.length < 20) {
              let newRes = this.data.Res.concat(res.data)
              this.setData({ Res: newRes, noData: true })
            } else {
              let newRes = this.data.Res.concat(res.data)
              this.setData({ Res: newRes })
            }
          }
        })
      }

    }
  },

  // 分享
  onShareAppMessage: function () { return { title: '', path: '/pages/index/index1' } }
})