
Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    // title
    title: {
      type: String,
      value: 'title'
    },

    // 多维数组
    multiArray: {
      type: Array,
      value: []
    },

    // index
    multiIndex: {
      type: Array,
      value: []
    },
  },


  data: {

  },

  methods: {

    bindMultiPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      // this.setData({ multiIndex: e.detail.value })
      this.triggerEvent('pickermulti', e.detail)
    },

    bindMultiPickerColumnChange: function (e) {
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      // 不应该在组件内部随动,应该确定后在外部改变
      // var data = {
      //   multiArray: this.data.multiArray,
      //   multiIndex: this.data.multiIndex
      // };
      // data.multiIndex[e.detail.column] = e.detail.value;
      // this.setData(data);
    },

  },

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})
