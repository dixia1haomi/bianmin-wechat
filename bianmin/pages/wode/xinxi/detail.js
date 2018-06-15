import { Api } from '../../../utils/Api.js'

const api = new Api()
const app = getApp()


Page({

  data: {

  },


  onLoad: function (op) {
    this._load(op.id)
  },


  _load(id) {
    // 查询单个便民信息
    api.findBianmin({ id: id }, (back) => {
      console.log('查询单个便民信息', back)
      this.setData({ Res: back.data })
    })
  },

  // 刷新
  shuaxin_(e) {
    console.log('刷新', e.detail.formId, e.currentTarget.id)
    api.updateFormId({ id: e.currentTarget.id, form_id: e.detail.formId }, back => {
      console.log('shuaxinback', back)
      this.setData({ 'Res.form_id': back.data.form_id })
      wx.showModal({ title: '刷新成功', content: '您的信息已重新排序', showCancel: false })
    })
  },

  // 邀请按钮 - 显示邀请弹窗
  yaoqing_(e) {
    console.log('邀请')
    this.setData({ yaoqingchuang_state: true })
  },

  // 邀请 - 海报
  yaoqing_haibao_() {
    console.log('邀请 - 海报')
    // scene = page=xinxiyaoqing&id=int
    let scene = 'yaoqing-' + this.data.Res.id
    // 生成海报
    api.xinxiDingzhierweima({ scene: scene }, back => {
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
            // this.yulanghaibao_()
          },
        })
      } else {
        wx.showModal({
          title: '制作失败',
          content: '请使用直接分享给好友或群',
          showCancel: false
        })
      }
      // 关闭邀请弹窗
      this.setData({ yaoqingchuang_state: false })
    })
  },

  // delete_xinxi_
  delete_xinxi_(e) {
    if (app.data.LoginState) {
      wx.showModal({
        title: '删除这条信息？', content: '将会删除信息相关的所有数据。',
        success: (res) => {
          if (res.confirm) {
            api.deleteMyFabu({ list_id: e.currentTarget.id }, res => {
              // 删除成功
              console.log('删除成功', res)
              // 返回并刷新
              var pages = getCurrentPages();             //  获取页面栈
              var prevPage = pages[pages.length - 2];    // 上一个页面
              // 执行上一页的_load
              prevPage._load()
              wx.navigateBack({ delta: 1 })
            })
          }
        }
      })
    } else {
      this.setData({ loginState: true })
    }
  },

  // 回复
  huifu_(e) {
    console.log('huifu', e.detail)
    // e.detail = { bmxx_id: 441, liuyan_id: 4, user_id: 1 }
    this.setData({ liuyanchuang_state: true, huifu_detail: e.detail })
  },

  // 回复窗确定
  huifuchuang_queding_(e) {
    console.log('回复窗确定', e.detail.params)
    // 新增回复
    api.createBianminHuifu({
      liuyan_id: this.data.huifu_detail.liuyan_id,        // 这个回复属于那条留言，写入回复表
      huifu_user_id: this.data.huifu_detail.user_id,      // 被回复人，写入回复表
      neirong: e.detail.params.input,                     // 回复内容，写入回复表
      form_id: e.detail.params.form_id,                   // 写入便民信息表，有留言再次提醒
      bmxx_id: this.data.huifu_detail.bmxx_id             // 省得服务器多查一次留言表
    }, (back) => {
      console.log('新增回复OK', back)
      // 刷新
      this._load(this.data.Res.id)
    })
  },


  // 分享
  onShareAppMessage: function () {
    console.log('onShareAppMessage', this.data.Res.id)
    // 关闭邀请弹窗
    this.setData({ yaoqingchuang_state: false })

    return {
      title: '帮我增加顶置时间',
      path: '/pages/index/index?page=yaoqing' + '&id=' + this.data.Res.id,
      imageUrl: '/img/150.jpg'
    }
  },


})