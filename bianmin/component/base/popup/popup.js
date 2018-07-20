Component({

  properties: {

    state: {
      type: Boolean,
      value: false, // show
    },

    title: {
      type: String,
      value: '福利（可多选）', // show
    },

    wancheng: {
      type: String,
      value: '完成',
    }

  },


  data: {

  },

  methods: {

    // popup点击
    popupTap_() {
      console.log('popupTap_')
    },

    // 完成
    wancheng_() {
      console.log('wancheng_')
      let detail = {}
      let option = {}
      this.triggerEvent('wancheng', detail, option);
    },

  }

})