
Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    // 标题
    title: {
      type: String,
      value: '选择器'
    },

    // 内容
    content: {
      type: String,
      value: ''
    },

    // 是否是多行textarea
    textarea: {
      type: Boolean,
      value: false
    },

    // 必填
    bitian: {
      type: Boolean,
      value: false
    },

  },


  data: {

  },

  methods: {

    // ----- 选择器 -----
    xuanzeqi_() {
      console.log('xuanzeqi_')
      // this.setData({ state: true })
      this.triggerEvent('xuanzeqi')
    },

  },


  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})
