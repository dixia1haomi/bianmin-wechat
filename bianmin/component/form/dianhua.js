import { Api } from '../../utils/Api.js'
const api = new Api()

Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {


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

