
// 房屋出租
// 房型
Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    // title
    title: {
      type: String,
      value: 'title'
    },

    // mode
    mode: {
      type: String,
      value: 'selector'
    },

    // 数组
    range: {
      type: Array,
      value: []
    },

    // index
    index: {
      type: Number,
      value: 0
    },

    // start
    start: {
      type: String,
      value: '2008-01-01'
    },

    // end
    end: {
      type: String,
      value: '2018-06-01'
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
    // 普通picker
    bindPickerChange(e) {
      console.log('picker', e)
      this.setData({ index: e.detail.value }, () => {
        this.triggerEvent('picker', e.detail)
      })
    },

    // 日期
    bindDateChange(e) {
      console.log('date', e)
      this.setData({ date: e.detail.value }, () => {
        this.triggerEvent('date', e.detail)
      })
    },

    // 时间
    bindTimeChange(e) {
      console.log('time', e)
      this.setData({ time: e.detail.value }, () => {
        this.triggerEvent('time', e.detail)
      })
    },

  },

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})
