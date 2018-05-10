
Component({

  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    // wx:for-item
    arr: {
      type: Array,
      value: [],
      observer(newVal, oldVal) {

      }
    },

  },


  data: {

  },

  methods: {

  },



  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})

// 方法名	参数	描述
// setData	Object newData	设置data并执行视图层渲染
// hasBehavior	Object behavior	检查组件是否具有 behavior （检查时会递归检查被直接或间接引入的所有behavior）
// triggerEvent	String name, Object detail, Object options	触发事件，参见 组件事件