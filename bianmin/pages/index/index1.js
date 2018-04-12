import { Api } from '../../utils/Api.js'

const api = new Api()
const app = getApp()

Page({

  data: {
    Res: [],

    // 展开折叠
    isFold: true
  },


  onLoad: function (op) {
    console.log('bb')
    this._load()
  },


  // 请求数据
  _load(callback) {
    api.getList({}, res => {
      console.log('aa', res.data)
      // 加入展开折叠
      for (let i in res.data) { res.data[i].hid = false }
      this.setData({ Res: res.data })
      // 回调给下拉刷新用
      callback && callback()
    })
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
    console.log(e.currentTarget.dataset)
    let img = e.currentTarget.dataset.img
    let index = e.currentTarget.dataset.index
    let arr = []
    for (let i in img) {
      arr.push(img[i].url)
    }
    console.log('arr', arr)

    wx.previewImage({
      current: index, // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
  },

  // 展开，折叠
  flodFn: function (e) {
    let index = e.currentTarget.dataset.index, res = this.data.Res



    var param = {};
    var str = "Res[" + index + "].hid"
    param[str] = !res[index].hid  // 展开折叠
    this.setData(param, () => {
      // 增加展开时的流浪次数,如果当前点击的信息是折叠状态，就增加一次点击量
      if (res[index].hid == true) {
        // 调用API发送请求增加点击
        api.incLiulangcishu({ id: res[index].id }, back => {
          console.log('增加点击成功', back)
        })
      }
    })


    // if(){} -----------------------------------

    // // 处理被点击的id的hid
    // let res = this.data.Res
    // var param = {};
    // for (let i in res) {
    //   if (res[i].id == e.currentTarget.id) {

    //     // 增加展开时的流浪次数,如果当前点击的信息是折叠状态，就增加一次点击量
    //     if (res[i].hid == false) {
    //       // 调用API发送请求增加点击
    //       api.incLiulangcishu({ id: e.currentTarget.id }, back => {
    //         console.log('增加点击成功', back)
    //       })
    //     }

    //     // 处理展开折叠
    //     var str = "Res[" + i + "].hid"
    //     param[str] = !res[i].hid  // 展开折叠
    //     // param[str] = true  // 只展开

    //     // 终止for
    //     break
    //   }
    // }
    // this.setData(param);
  },

  // 浏览次数请求
  liulangcishu(id) {
    // 接受信息ID
    console.log('增加点击次数')
  },


  // 下拉刷新
  onPullDownRefresh: function () {
    this._load(back => { wx.stopPullDownRefresh() })
  }

})