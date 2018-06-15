

Component({

  properties: {

    Res: {
      type: Object,
      value: {}
    },

  },


  data: {
  },

  methods: {

    // 电话
    foot_phone_(e) {
      wx.makePhoneCall({ phoneNumber: e.currentTarget.id })
    },

    // 留言 - 直接抛出 - 外面需要先验证登录、再接受弹窗state
    foot_liuyan_(e) {
      this.triggerEvent('foot_liuyan', { id: e.currentTarget.id})
    },
  }

})

