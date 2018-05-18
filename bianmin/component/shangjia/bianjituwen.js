import { Api } from '../../utils/Api.js'
import { Cos } from '../../utils/Cos.js'

const api = new Api()
const cos = new Cos()

Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    Res: {
      type: Object,
      value: null
    }

  },


  data: {
    // 开关
    disabled: true,
    // 保存修改前的数据
    save_value: null
  },

  methods: {

    // ------------------------------ 输入框事件 ------------------------------

    // 开关
    textarea_kaiguan_() {
      // 如果是禁用状态
      if (this.data.disabled) {
        wx.showModal({
          title: '修改描述?', success: (res) => {
            if (res.confirm) {
              this.setData({ disabled: false, save_value: this.data.Res.text })
            }
          }
        })
      }
    },

    // textarea——bindinput 
    textarea_bindinput_(e) {
      console.log('textarea_bindinput_', e)
      this.setData({ 'Res.text': e.detail.value })
    },

    // 确定
    textarea_queding_(e) {
      let id = e.currentTarget.id
      let text = this.data.Res.text
      // API 更新商家IMG表text
      api.createShangjiaImgText({ params: { id: id, text: text } }, back => {
        console.log('修改text确定-OK', back)
        // 禁用输入框、清空保存的value
        this.setData({ disabled: true, save_value: null })
      })
    },

    // 取消
    textarea_quxiao_() {
      // 禁用输入框、回复修改前的数据
      this.setData({ disabled: true, 'Res.text': this.data.save_value }, () => {
        // 清空保存的value
        this.setData({ save_value: null })
      })
    },

    // ------------------------------ 图片事件 ------------------------------
    // 修改图片
    xiugai_img_(e) {
      wx.showModal({
        title: '修改图片?', success: (res) => {
          if (res.confirm) {
            // 选择图片
            wx.chooseImage({
              count: 1,
              sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
              success: (imgres) => {
                // 上传COS
                let img = imgres.tempFilePaths
                let cospath = "/shangjia"
                cos.update_img_cos(cospath, img, (back) => {
                  // 上传成功
                  // API 更新商家IMG表url
                  let id = e.currentTarget.id
                  let url = back.data.source_url
                  api.createShangjiaImgUrl({ params: { id: id, url: url } }, apiback => {
                    console.log('修改图片OK', apiback)
                    this.setData({ 'Res.url': img[0] })
                  })
                }, (ok) => {
                  console.log('ok', ok)
                })
              }
            })
          }
        }
      })
    },


    // ------------------------------ 长按删除图文块 ------------------------------
    delete_(e) {
      wx.showModal({
        title: '删除这块图文?', content: '会删除这段文字描述和这张图片', success: (res) => {
          if (res.confirm) {
            // API 删除商家IMG一条数据
            let id = e.currentTarget.id
            api.deleteShangjiaImg({ id: id }, back => {
              console.log('删除商家IMG-OK', back)
              this.triggerEvent('delete', { id: id })
            })
          }
        }
      })
    }
  },


  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})
