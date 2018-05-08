import { Api } from '../../utils/Api.js'
import { Utils } from '../../utils/utils.js'

const utils = new Utils()
const api = new Api()
const app = getApp()

let page = 1;

Page({

  data: {
    Res: [],
    shangjiaList: [],           // 商家列表
    isFold: true,               // 展开折叠
    noData: false,              // 上拉更多
    loginTanChuang: false,      // 登陆弹窗
    form_id: null,              // form_id

    // ---- 留言回复 ----
    tanChuang: false,
    input: null,
    input_cursor: 0,

    // ---- 留言 ----
    bianmin_id: null,
    bianmin_index: null,
  },







  // ------------------------------------------------- 留言 -------------------------------------------------

  // 弹窗开关事件(清空input)
  tanchuang_() { this.setData({ tanChuang: !this.data.tanChuang, input: null }) },

  // 留言、回复输入事件
  liuyan_input_(e) { this.setData({ input: e.detail.value, input_cursor: e.detail.cursor }) },

  // ---- 留言事件 ----
  liuyan_(e) {
    if (app.data.LoginState) {
      this.tanchuang_()
      this.setData({
        bianmin_id: e.currentTarget.dataset.bianmin_id,
        bianmin_index: e.currentTarget.dataset.index,
      })
    } else {
      // 登陆弹窗
      this.setData({ loginTanChuang: true })
    }
  },

  // ---- 留言确定 ----
  liuyan_queding_(e) {
    console.log('formId', e.detail.formId)
    // 检查换行符
    let input = this.data.input
    input = utils.checkHuanHangFu(input)
    // 验证input内容
    if (!input || input.length > 50) {
      wx.showModal({ content: '长度请控制在1-50个字之间', showCancel: false })
      return
    }
    // 新增留言
    api.createBianminLiuyan({
      bmxx_id: this.data.bianmin_id,
      neirong: input,
      form_id: e.detail.formId
    }, (back) => {
      console.log('新增留言OK', back)
      // 刷新
      this.setData({ ['Res[' + this.data.bianmin_index + ']']: back.data })
    })
    // 关闭弹窗
    this.tanchuang_()
  },


  // -------------------------------------------- onLoad --------------------------------------

  onLoad: function (op) {
    console.log('q', op)
    var scene = decodeURIComponent(op.scene)
    console.log('index1-scene', scene)
    this._load()
    // this._getShangjiaList()
    // this.erweima()
  },




  // 保存到相册
  save_() {
    wx.getImageInfo({
      src: this.data.img,
      success: function (res) {
        console.log('getImageInfo', res.path)
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success: (save) => {
            console.log('save_', save)
            wx.showModal({
              title: '存图成功',
              content: '图片成功保存到相册了，去发圈噻~',
              showCancel: false,
              confirmText: '好哒',
              confirmColor: '#72B9C3',
              success: function (res1) {
                if (res1.confirm) {
                  console.log('用户点击确定');
                }
              }
            })
          },
          fail: (err) => {
            console.log('save_', err)
          }
        })
      }
    })
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

  // 预览
  yulan_(e) {
    console.log('预览', e.currentTarget.dataset)
    let img = e.currentTarget.dataset.img, index = e.currentTarget.dataset.index, arr = []
    for (let i in img) { arr.push(img[i].url) }

    wx.previewImage({
      current: arr[index], // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
  },

  // 打开地图
  dizhi_(e) {
    wx.openLocation({
      latitude: parseFloat(e.currentTarget.dataset.latitude),
      longitude: parseFloat(e.currentTarget.dataset.longitude),
      name: e.currentTarget.dataset.address,
      scale: 28
    })
  },

  // 展开，折叠
  flodFn_: function (e) {
    let index = e.currentTarget.dataset.index, res = this.data.Res
    // 如果hid是初始的false,允许改成true
    if (res[index].hid == false) {
      var param = {};
      var str = "Res[" + index + "].hid"
      // param[str] = !res[index].hid  // 展开折叠
      param[str] = true             // 只展开
      this.setData(param, () => {
        // 调用API发送请求增加点击
        api.incLiulangcishu({ id: res[index].id }, back => {
          console.log('增加点击成功', back)
        })
      })
    }
  },


  // 拨打电话
  call_phone_(e) { wx.makePhoneCall({ phoneNumber: e.currentTarget.id }) },


  // -------------------------------------------------------- 登陆 ---------------------------------------------------------
  // 关闭登陆弹窗
  loginTanChuangQuXiao_() { this.setData({ loginTanChuang: false }) },

  // formid
  getFormId_(e) { this.setData({ form_id: e.detail.formId }) },

  // 获得用户信息登陆成功后关闭弹窗
  getUserInfo_(e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      // 如果有form_id
      if (this.data.form_id) {
        e.detail.userInfo.form_id = this.data.form_id
      } else {
        e.detail.userInfo.form_id = ''
      }
      this.setData({ loginTanChuang: false }, () => { app.saveUserInfo(e.detail) })
    }
  },


  // ------------------------------------------------- 下拉刷新、上拉加载、分享 -------------------------------------------------


  // 下拉刷新
  onPullDownRefresh: function () {
    this._load(back => { wx.stopPullDownRefresh() })
    this._getShangjiaList()
  },

  // 上拉触底
  onReachBottom: function () {
    console.log('上拉触底')
    if (this.data.noData != true) {
      if (this.data.Res.length < 20) {
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