const app = getApp()
Component({

  properties: {

    Res: {
      type: Object,
      value: {}
    },

  },


  data: {},

  methods: {

    // 电话
    foot_phone_(e) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.id
      })
    },

    // 留言 - 直接抛出 - 外面需要先验证登录、再接受弹窗state
    foot_liuyan_(e) {
      // this.triggerEvent('foot_liuyan', { id: e.currentTarget.id})
      // // 打开留言窗
      console.log('foot_liuyan_', e.currentTarget.id)
      if (app.data.LoginState) {
        // 打开留言窗，携带id
        this.setData({
          liuyanchuang_state: true,
          // liuyanchuang_id: e.detail.id
        })
      } else {
        // 先登录
        this.triggerEvent('login')
      }
    },
  }

})