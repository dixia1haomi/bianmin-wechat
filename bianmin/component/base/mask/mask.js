Component({

  properties: {

    state: {
      type: Boolean,
      value: false, // show
    }

  },


  data: {

  },

  methods: {

    // 禁止蒙层下面滚动_
    禁止蒙层下面滚动_() {

    },

    // 蒙层点击事件_
    蒙层点击事件_() {
      console.log('蒙层点击事件_')
      let detail = {}
      let option = {}
      this.triggerEvent('mask', detail, option);
    },
  }
})