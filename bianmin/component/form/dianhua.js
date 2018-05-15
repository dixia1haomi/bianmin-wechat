import { Api } from '../../utils/Api.js'
const api = new Api()

Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    // 电话
    // dianhua: {
    //   type: Boolean,
    //   value: false
    // },

  },


  data: {

    setData: {
      // 电话
      phone: '',
    }
  },

  methods: {

    // ----- 电话 -----
    dianhua_(e) {
      // 如果用户允许了、API获取电话号码
      if (e.detail.iv && e.detail.encryptedData) {
        api.getPhone({ encryptedData: e.detail.encryptedData, iv: e.detail.iv }, res => {
          this.setData({ 'setData.phone': res.data })
          this.triggerEvent('dianhua', res.data)
        })
      }
    }

  },



  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})

// 方法名	参数	描述
// setData	Object newData	设置data并执行视图层渲染
// hasBehavior	Object behavior	检查组件是否具有 behavior （检查时会递归检查被直接或间接引入的所有behavior）
// triggerEvent	String name, Object detail, Object options	触发事件，参见 组件事件