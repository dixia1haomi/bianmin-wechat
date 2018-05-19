import { Api } from '../../utils/Api.js'
const api = new Api()

Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    tips: {
      type: Boolean,
      value: false
    }

  },


  data: {

    setData: {
      // 电话
      phone: '',
    },

    // 电话说明
    shuoming:'获取电话说明：授权后直接获取微信已绑定的电话号码，如果还未绑定，建议绑定。'

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

