import { Api } from '../../../../utils/Api.js'

const api = new Api()

Component({

  properties: {

    Res: {
      type: Object,
      value: null
    }

  },

  //	否	组件的内部数据，和 properties 一同用于组件的模版渲染
  data: {
    zhankai: false,
  },



  //	否	组件的方法，包括事件响应函数和任意的自定义方法，关于事件响应函数的使用，参见 组件事件
  methods: {
    // -------------------------------------------------------- 展开，折叠 --------------------------------------------------------
    flodFn_(e) {
      this.setData({ zhankai: !this.data.zhankai }, () => {
        // 调用API发送请求增加点击
        api.incLiulangcishu({ id: this.data.Res.id }, back => {
          console.log('增加点击成功', back)
        })
      })
    },

    // -------------------------------------------------------- 预览 --------------------------------------------------------
    yulan_(e) {
      console.log('预览', e.currentTarget.dataset)
      let img = e.currentTarget.dataset.img, index = e.currentTarget.dataset.index, arr = []
      for (let i in img) { arr.push(img[i].url) }

      wx.previewImage({
        current: arr[index], // 当前显示图片的http链接
        urls: arr // 需要预览的图片http链接列表
      })
    },

  },

  //	否	一些组件选项，请参见文档其他部分的说明
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})

