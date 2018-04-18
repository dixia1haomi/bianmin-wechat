import { Api } from '../../utils/Api.js'
// import { Base } from '../../utils/Base.js'

// const base = new Base()
const api = new Api()
const app = getApp()

let page = 1;

Page({

  data: {
    Res: [],

    // 文章列表
    shangjiaList: [],

    // 展开折叠
    isFold: true,

    // 轮播图
    // imgUrls: [
    //   "http://pinyinshizi-1253443226.coscd.myqcloud.com/pinyin-png-mp3/yunmu/a.png",
    //   "http://pinyinshizi-1253443226.coscd.myqcloud.com/pinyin-png-mp3/shengmu/b.png",
    //   "http://pinyinshizi-1253443226.coscd.myqcloud.com/pinyin-png-mp3/shengmu/c.png"
    // ]
  },


  onLoad: function (op) {
    console.log('bb')
    this._load()
    this._getShangjiaList()

    // api.selectShangjia({ page: 1 }, res => {
    //   console.log('商家列表', res)
    // })
  },

  onReady: function () {

  },

  // 获取文章列表
  _getShangjiaList() {
    api.selectShangjia({}, res => {
      console.log('商家列表', res)
      this.setData({ shangjiaList: res.data })
    })
  },


  // 请求数据
  _load(callback) {
    // 分页1
    page = 1
    api.getList({ page: page }, res => {
      console.log('aa', res.data)
      this.setData({ Res: res.data }, () => {
        // 获取并设置内容高度，用于超出显示范围就提示展开
        this._getHeight(res.data)
      })
      // 回调给下拉刷新用
      callback && callback()
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

  // 发布页
  go_fabu() {
    // 是否登陆过 ？ 跳转到我的留言页 ： 调用登陆
    app.appData.LoginState ? wx.navigateTo({ url: '/pages/fabu/fabu' }) : app.newGetToken(back => { this.go_fabu() })
  },


  // 点击+按钮显示蒙层
  go_wode() {
    console.log('go_wode')
    // 是否登陆过 ？ 跳转到我的留言页 ： 调用登陆
    // wx.navigateTo({ url: '/pages/wode/list' })
    wx.navigateTo({ url: '/pages/wode/index' })
  },

  // 预览
  yulan(e) {
    console.log('预览', e.currentTarget.dataset)
    let img = e.currentTarget.dataset.img
    let index = e.currentTarget.dataset.index
    let arr = []
    for (let i in img) {
      arr.push(img[i].url)
    }
    console.log('arr', arr)

    wx.previewImage({
      current: arr[index], // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
  },

  // 展开，折叠
  flodFn: function (e) {
    let index = e.currentTarget.dataset.index, res = this.data.Res

    // 如果hid是初始的false,允许改成true
    if (res[index].hid == false) {
      var param = {};
      var str = "Res[" + index + "].hid"
      // param[str] = !res[index].hid  // 展开折叠
      param[str] = true             // 只展开
      this.setData(param, () => {
        // 增加展开时的流浪次数,如果当前点击的信息是折叠状态，就增加一次点击量
        // if (res[index].hid == true) {
        // 调用API发送请求增加点击
        api.incLiulangcishu({ id: res[index].id }, back => {
          console.log('增加点击成功', back)
        })
        // }
      })
    }
  },


  // 拨打电话
  call_phone(e) {
    console.log('拨打电话', e.currentTarget.id)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.id //仅为示例，并非真实的电话号码
    })
  },

  // 上拉触底
  onReachBottom: function () {
    console.log('上拉触底')
    page++
    // 最多显示100条数据
    if (page <= 5) {
      api.getList({ page: page }, res => {
        console.log('上拉触底分页', page)

        // 如果没有数据直接终止并且下次不再请求
        if (res.data.length == 0) {
          page = 6
          return;
        }

        let newRes = this.data.Res.concat(res.data)

        this.setData({ Res: newRes }, () => {
          // 获取并设置内容高度，用于超出显示范围就提示展开
          this._getHeight(newRes)
        })
      })
    }
  },

  // --------------------------- 滚动视图 ----------------------------
  scroll(e) {
    console.log('scroll', e.currentTarget.id)
    wx.navigateTo({ url: '/pages/shangjia/detail?id=' + e.currentTarget.id })
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    this._load(back => { wx.stopPullDownRefresh() })
  },


  // 分享
  onShareAppMessage: function () {
    return {
      title: '',
      path: '/pages/index/index1'
    }
  }

})