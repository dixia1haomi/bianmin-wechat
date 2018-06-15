

Component({

  properties: {

    // 显示/隐藏弹窗
    state: {
      type: Boolean,
      value: false
    }

  },


  data: {

  },

  methods: {


    // this.triggerEvent('quxiao', {})
    // 直接转发

    // 海报
    haibao_() {
      this.triggerEvent('haibao',{})
    },

    // 取消
    quxiao_() {
      this.setData({ state: false })
    }

  },


  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})

