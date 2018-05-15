
Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    // 标题
    title: {
      type: String,
      value: '输入框'
    },

    // 最大长度
    maxlength: {
      type: Number,
      value: 20
    },

    // 默认值
    placeholder: {
      type: String,
      value: '默认值'
    },

    // value
    value: {
      type: String,
      value: ''
    },
  },


  data: {

    setData: {
      // input输入
      value: '',
      cursor: 0
    }
  },

  methods: {
    // ----- input -----
    input_(e) {
      this.triggerEvent('input', e.detail)
    },
  },

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})
