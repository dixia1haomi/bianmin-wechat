Component({

  properties: {

    // 弹窗开关
    state: {
      type: Boolean,
      value: false
    },

    // // ID
    // liuyanchuangID: {
    //   type: Number,
    //   // value: 0,
    //   // observer: (newVal, oldVal) => {
    //   //   console.log('liuyanchuangID', newVal, oldVal)
    //   // }
    // },

    // title 留言 || 回复
    title: {
      type: String,
      value: '留言'
    },

  },


  data: {
    input: '',
    input_cursor: 0,
  },

  methods: {

    // 关闭
    _guan_() {
      this.setData({
        state: false
      })
    },

    // 输入事件
    _input_(e) {
      this.setData({
        input: e.detail.value,
        input_cursor: e.detail.cursor
      })
    },

    // ---- 留言确定 ----
    queding_(e) {
      console.log('formId', e.detail.formId, 'input', this.data.input)
      // 判断是否有ID
      if (this.data.input.length > 0) {
        let params = {
          form_id: e.detail.formId,
          // bmxx_id: this.data.liuyanchuangID,
          input: this.data.input
        }
        this.triggerEvent('queding', params)
      } else {
        wx.showModal({
          title: '至少输入1个字',
          showCancel: false
        })
      }

      // 检查换行符
      // let input = this.data.input
      // input = utils.checkHuanHangFu(input)
      // // 验证input内容
      // if (!input || input.length > 50) {
      //   wx.showModal({ content: '长度请控制在1-50个字之间', showCancel: false })
      //   return
      // }
      // 新增留言
      // api.createBianminLiuyan({
      //   bmxx_id: this.data.bianmin_id,
      //   neirong: input,
      //   form_id: e.detail.formId
      // }, (back) => {
      //   console.log('新增留言OK', back)
      //   // 刷新
      //   this.setData({ Res: back.data })
      // })


      // 关闭弹窗
      this.setData({
        state: false
      })
    },

    // ------------------------------------------------- 留言 -------------------------------------------------

    // ---- 留言弹窗 ----
    // liuyan_(e) {
    //   console.log('liuyan_', e)
    //   if (app.data.LoginState) {
    //     this.tanchuang_()
    //     this.setData({ bianmin_id: e.currentTarget.dataset.bianmin_id, })
    //   } else {
    //     // 请求登陆弹窗
    //     this.triggerEvent('call-login', {})
    //   }
    // },

    // 弹窗开关事件(清空input)
    // tanchuang_() { this.setData({ tanChuang: !this.data.tanChuang, input: null, input_cursor: 0 }) },



  }

})