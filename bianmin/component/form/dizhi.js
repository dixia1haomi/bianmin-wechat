import { Base } from '../../utils/Base.js'

Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    // address
    address: {
      type: String,
      value: ''
    },

    // name
    // name: {
    //   type: String,
    //   value: ''
    // },
  },


  data: {

    setData: {
      // 地址
      address: '',
      name: '',
      longitude: '',
      latitude: '',
    }
  },

  methods: {

    // ----- 地址 -----
    dizhi_() {
      new Base().authorize_userLocation(back => {
        wx.chooseLocation({
          success: (e) => {
            console.log('success', e)
            // 去除“云南省曲靖市”
            if ((e.address.indexOf("云南省曲靖市")) != -1) {
              e.address = e.address.substring((e.address.indexOf("市") + 1), e.address.length)
            }
            // address只是用来初始显示用的、抛出的是setData对象里面也包含address
            this.setData({ setData: e, address: e.address })
            // 记录已选择的位置
            this.triggerEvent('dizhi', e)
          }
        })
      })
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