import { Api } from '../../utils/Api.js'
import { Utils } from '../../utils/utils.js'

const api = new Api()
const utils = new Utils()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Res: false,

    // ---- 回复 ----
    tanChuang: false,
    input: null,
    input_cursor: 0,

    fenxiangTanChuang: false,  // 分享弹窗
    haibaoImg: '',             // 海报图片

    // 登录弹窗
    loginState: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {

    // 如果是跳过首页直接进入这个页面app.onLaunch不会请求token，主动请求回调后再_load(需要携带token)
    app.checkToken(() => {
      this._load()
    })
  },




  // --------------------------------------- 转发、分享 ---------------------------------------
  // --- 分享弹窗 ---
  fenxiangTanChuang_Kai_() { this.setData({ fenxiangTanChuang: true }) },
  fenxiangTanChuang_Guan_() { this.setData({ fenxiangTanChuang: false }) },

  // ----- 海报 ----- 
  shengChengHaiBao_(e) {
    api.shengChengErWeiMa({ scene: e.currentTarget.id }, back => {
      console.log('erweima', back)
      if (back.msg == 'ok') {
        // 显示图片
        this.setData({ haibaoImg: 'https://bianmin.qujingdaishuyanxuan.org' + back.data })
        // 提示
        wx.showModal({
          title: '制作完成',
          content: '长按保存到相册，即可分享给好友，每个好友能帮你增加一天顶置时间',
          showCancel: false,
          success: () => {
            this.yulanghaibao_()
          },
        })
      } else {
        wx.showModal({
          title: '制作失败',
          content: '请使用直接分享给好友或群',
          showCancel: false
        })
      }
      // 关闭分享弹窗
      this.fenxiangTanChuang_Guan_()
    })
  },

  // 预览海报
  yulanghaibao_() {
    let arr = [this.data.haibaoImg]
    wx.previewImage({
      current: arr[0], // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
  },

  // 分享
  onShareAppMessage: function () {
    console.log('onShareAppMessage', this.data.Res.id)
    return {
      title: '帮我增加顶置时间',
      path: '/pages/bmxx/erweimafenxiangye?scene=' + this.data.Res.id,
      imageUrl: '/img/150.jpg',
      success: (res) => {
        // 转发成功,关闭分享弹窗
        this.fenxiangTanChuang_Guan_()
      },
      fail: (res1) => {
        // 转发失败,关闭分享弹窗
        this.fenxiangTanChuang_Guan_()
      }
    }
  },

  // ------------------------------------------------- 回复 -------------------------------------------------

  // ---- 回复事件 ----
  huifu_(e) {
    if (app.data.LoginState) {
      this.tanchuang_()
      this.setData({
        liuyan_id: e.currentTarget.dataset.liuyan_id,
        huifu_user_id: e.currentTarget.dataset.huifu_user_id,
        bmxx_id: e.currentTarget.id
      })
    } else {
      // 登陆弹窗
      this.setData({ loginState: true })
    }
  },

  // 弹窗开关事件(清空input、bmxx_id)
  tanchuang_() { this.setData({ tanChuang: !this.data.tanChuang, input: null, input_cursor: 0 }) },

  // 回复输入事件
  huifu_input_(e) { this.setData({ input: e.detail.value, input_cursor: e.detail.cursor }) },


  // 回复确定
  huifu_queding_(e) {

    // 检查换行符
    let input = this.data.input
    input = utils.checkHuanHangFu(input)
    // 验证input内容
    if (!input || input.length > 50) {
      wx.showModal({ content: '长度请控制在1-50个字之间', showCancel: false })
      return
    }

    console.log('formId', e.detail.formId)
    // 新增回复
    api.createBianminHuifu({
      liuyan_id: this.data.liuyan_id,             // 这个回复属于那条留言，写入回复表
      huifu_user_id: this.data.huifu_user_id,     // 被回复人，写入回复表
      neirong: input,                             // 回复内容，写入回复表
      form_id: e.detail.formId,                   // 写入便民信息表，有留言再次提醒
      bmxx_id: this.data.bmxx_id                  // 省得服务器多查一次留言表
    }, (back) => {
      console.log('新增回复OK', back)
      // 刷新
      this._load()
    })

    // 关闭弹窗
    this.tanchuang_()
  },



  // ------------------------------------------------- load -------------------------------------------------
  // callback给下拉刷新用
  _load(callback) {
    // 获取我的发布
    api.myFabu({}, back => {
      console.log('我的发布', back)
      callback && callback(back)
      this.setData({ Res: back.data })
    })
  },


  // ------------------------------------------------- 修改 -------------------------------------------------
  go_xiugai_() {
    if (app.data.LoginState) {
      wx.navigateTo({ url: '/pages/bmxx/xiugaifabu' })
    } else {
      this.setData({ loginState: true })
    }
  },

  // ------------------------------------------------- 删除 -------------------------------------------------
  myDelete(e) {
    if (app.data.LoginState) {
      wx.showModal({
        title: '删除这条信息？',
        success: (res) => {
          if (res.confirm) {
            console.log('用户点击确定')
            api.deleteMyFabu({ list_id: e.currentTarget.id }, res => {
              // 删除成功
              console.log('删除成功', res)
              // 刷新
              this._load()
            })
          }
        }
      })
    } else {
      this.setData({ loginState: true })
    }
  },

  // ------------------------------------------------- 刷新 -------------------------------------------------
  updateTime(e) {
    if (app.data.LoginState) {
      api.updateTime({ id: e.currentTarget.id }, back => {
        console.log('刷新', back)
        wx.showModal({ content: back.data, showCancel: false })
        this._load()
      })
    } else {
      this.setData({ loginState: true })
    }
  },

  // ------------------------------------------------- 留言提示 -------------------------------------------------

  // 更新便民信息formId
  liuyanTishi_(e) {
    console.log('留言提示', e.detail.formId, e.currentTarget.id)
    api.updateFormId({ id: e.currentTarget.id, form_id: e.detail.formId }, back => {
      this.setData({ 'Res.form_state': true })
      wx.showToast({ title: 'OK' })
    })
  },

  // ------------------------------------------------- 下拉刷新 -------------------------------------------------

  // 下拉刷新
  onPullDownRefresh: function () {
    this._load(back => {
      wx.stopPullDownRefresh()
      this.setData({ Res: back.data })
    })
  },

})