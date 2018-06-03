

Component({

  properties: {

    // 用户列表
    Res: {
      type: String,
      value: '好友顶置榜'
    },

    // title
    title: {
      type: String,
      value: '好友顶置榜'
    },

    // 暂无
    nodata: {
      type: String,
      value: '暂无'
    }

  },


  data: {

  },

  methods: {


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

