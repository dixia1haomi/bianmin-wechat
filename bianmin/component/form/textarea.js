
Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    // 描述
    title: {
      type: String,
      value: ''
    },

    // 最大长度
    maxlength: {
      type: Number,
      value: 200
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

    // 底部说明
    bottom: {
      type: String,
      value: ''
    },

    // hid(textarea是原生组件弹出框无法覆盖，这个用于隐藏)
    hid: {
      type: Boolean,
      value: true
    },
  },


  data: {

    setData: {
      textarea: {
        value: '',
        cursor: 0
      }
    }
  },

  methods: {

    // ----- textarea -----
    textarea_(e) {
      console.log('textarea_', e)
      this.setData({ 'setData.textarea.cursor': e.detail.cursor })
      this.triggerEvent('textarea', e.detail)
    },

  },


  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})
