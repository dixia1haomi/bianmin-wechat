
Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    // 编辑 (传了就是修改)
    edit: {
      type: Boolean,
      value: false
    },

    // 编辑提示文字
    editTitle: {
      type: String,
      value: '修改XX?'
    },

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

    // disabled
    disabled: {
      type: Boolean,
      value: false
    },

    // 自动增高
    autoheight: {
      type: Boolean,
      value: false
    },

    // 最小高度
    minheight: {
      type: Number,
      value: 0
    },

    // 最大高度
    minheight: {
      type: Number,
      value: 0
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

    // 点击事件（只有编辑状态有）
    dianji_() {
      console.log('点击事件（只有编辑状态有）')
      if (this.data.disabled) {
        wx.showModal({ title: this.data.editTitle, success: (res) => { if (res.confirm) { this.setData({ disabled: false }) } } })
      }
    },

    // ----- textarea -----
    textarea_(e) {
      console.log('textarea_', e)
      this.setData({ 'setData.textarea.cursor': e.detail.cursor })
      this.triggerEvent('textarea', e.detail)
    },

    // 确定
    queding_() {
      this.triggerEvent('queding')
    },

    // 取消
    quxiao_() {
      this.setData({
        value: this.data.value,
        disabled: true
      })
    },
  },


  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})
