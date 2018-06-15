

Component({

  properties: {

    // 
    Res: {
      type: Object,
      value: null
    },

    // 按钮文字
    button_text: {
      type: String,
      value: '邀请朋友帮我顶置'
    },

    // 海报IMG
    haibaoImg: {
      type: String,
      value: ''
    },

    // title
    // title: {
    //   type: String,
    //   value: '好友顶置榜'
    // },

    // 暂无
    // nodata: {
    //   type: String,
    //   value: '暂无'
    // }

  },


  data: {

  },

  methods: {

    // 邀请/顶置按钮
    button_() {
      this.triggerEvent('button', {})
    },

    // 预览海报
    yulanghaibao_() {
      console.log('预览海报')

      let arr = [this.data.haibaoImg]
      wx.previewImage({
        current: arr[0], // 当前显示图片的http链接
        urls: arr // 需要预览的图片http链接列表
      })
    },

    // this.triggerEvent('quxiao', {})
    // 直接转发

    // 海报
    // haibao_() {
    //   this.triggerEvent('haibao')
    // },

    // // 取消
    // quxiao_() {
    //   this.setData({ fenxiangTanChuang: false })
    // }

  },


  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})

