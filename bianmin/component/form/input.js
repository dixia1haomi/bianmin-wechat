
Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    // 编辑 (传了就是修改)
    // edit: {
    //   type: Boolean,
    //   value: false
    // },

    // 编辑提示文字
    // editTitle: {
    //   type: String,
    //   value: '修改XX?'
    // },

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

    // disabled
    disabled: {
      type: Boolean,
      value: false
    },

    // 类型
    type: {
      type: String,
      value: 'text'
    },

    // 必填
    bitian: {
      type: Boolean,
      value: false
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

    // 点击事件（只有编辑状态有）
    // dianji_() {
    //   console.log('点击事件（只有编辑状态有）')
    //   if (this.data.disabled) {
    //     wx.showModal({ title: this.data.editTitle, success: (res) => { if (res.confirm) { this.setData({ disabled: false }) } } })
    //   }
    // },

    // ----- input -----
    input_(e) {
      this.triggerEvent('input', e.detail)
    },

    // 确定
    // queding_() {
    //   this.triggerEvent('queding')
    // },

    // 取消
    // quxiao_() {
    //   this.setData({
    //     value: this.data.value,
    //     disabled: true
    //   })
    // },

  },

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})
