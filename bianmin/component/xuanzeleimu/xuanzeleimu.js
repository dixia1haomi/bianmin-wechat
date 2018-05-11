
// 接受的arr结构
// arr: [
//   {
//     id: 0,
//     name: '房产交易',
//     value: [
//       {
//         name: '房屋出售',
//         value2: [{
//           moban: '房屋出售模板1'
//         }]
//       },
//       {
//         name: '房屋求购',
//         value2: [{
//           moban: '房屋求购模板1'
//         }]
//       }
//     ]
//   },
//   {
//     id: 1,
//     name: '招聘求职',
//     value: [
//       {
//         name: '招聘',
//         value2: [{
//           moban: '招聘模板1'
//         }, {
//           moban: '招聘模板2'
//         }]
//       },
//       {
//         name: '求职',
//         value2: [{
//           moban: '求职模板1'
//         }]
//       }
//     ]
//   }
// ],

Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    // 类目数据
    arr: {
      type: Array,
      value: [],
      observer(newVal, oldVal) {

      }
    },

    // 显示开关
    kaiguan: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal) {
        this.setData({ kaiguan: newVal })
      }
    },

  },


  data: {
    id: 0,
  },

  methods: {
    // 一级选择
    xuanze1_(e) {
      this.setData({ id: e.currentTarget.id })
    },

    // 二级选择
    xuanze2_(e) {
      console.log('xuanze2', e.currentTarget.dataset.value)
      // 抛出
      this.triggerEvent('event', { value: e.currentTarget.dataset.value })
    },
  },



  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})

// 方法名	参数	描述
// setData	Object newData	设置data并执行视图层渲染
// hasBehavior	Object behavior	检查组件是否具有 behavior （检查时会递归检查被直接或间接引入的所有behavior）
// triggerEvent	String name, Object detail, Object options	触发事件，参见 组件事件