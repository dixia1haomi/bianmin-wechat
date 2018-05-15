import { Api } from '../../utils/Api.js'
import { Base } from '../../utils/Base.js'
import { Cos } from '../../utils/Cos.js'
import { Config } from '../../utils/Config.js'
import { Utils } from '../../utils/utils.js'

import WxValidate from '../../validate/WxValidate.js'

const cos = new Cos()
const api = new Api()
const utils = new Utils()
const app = getApp()

//---------------------------------------------- 验证 ----------------------------------------------------
// 验证字段的规则
const rules = {
  leimu: { required: true },
  neirong: { required: true, rangelength: [10, 200] },
  address: { required: true },
  phone: { required: true }
}
// 验证字段的提示信息，若不传则调用默认的信息
const messages = {
  leimu: { required: '请选择类目' },
  neirong: { required: '请修改内容', rangelength: '内容长度在 10 到 200 之间' },
  address: { required: '地址不能为空' },
  phone: { required: '电话不能为空' }
}

const wxValidate = new WxValidate(rules, messages)

Page({

  data: {
    // 类目
    com_xuanzeleimu_kaiguan: true,
    com_xuanzeleimu_data: {},
    value2index: 0,
    // textarea
    com_textarea: {
      value: '',
      cursor: 0
    },
    // 选择图片
    com_xuanzetupian: [],
    // 地址
    com_dizhi: {

    },
    // 错误提示开关
    toptips_kaiguan: '',
    // // 错误提示内容
    toptips_text: '',
  },

  // ------------------------------------------ onLoad ------------------------------------------
  onLoad: function (op) {

  },


  // ----------------- 组件事件 -----------------------

  // 选择类目
  com_xuanzeleimu_(e) {
    console.log('com_xuanzeleimu_', e.detail)
    this.setData({
      com_xuanzeleimu_data: e.detail,
      com_xuanzeleimu_kaiguan: false,
      value2index: 0
    })
  },

  // 输入框 
  com_textarea_(e) {
    console.log('textarea', e.detail)
    this.setData({ com_textarea: e.detail })
  },

  // 切换模板按钮
  qiehuanmoban_() {
    let index = this.data.value2index
    let len = this.data.com_xuanzeleimu_data.value2.length;
    // 改变Value2的键、清空要提交的textarea数据、键 = 长度 - 1
    index = index >= len - 1 ? 0 : ++index
    this.setData({ value2index: index })
  },

  // 选择器
  com_xuanzeqi_() {
    console.log('com_xuanzeqi_')
    this.setData({ com_xuanzeleimu_kaiguan: true })
  },

  // 选择图片
  com_xuanzetupian_(e) {
    this.setData({ com_xuanzetupian: e.detail })
  },

  // 地址
  com_dizhi_(e) {
    this.setData({ com_dizhi: e.detail })
  },

  // 电话
  com_dianhua_(e) {
    this.setData({ com_dianhua: e.detail })
  },

  // 提交
  tijiao(e) {
    // 给服务器的参数，user_id服务器获取
    let params = {
      leibie: this.data.com_xuanzeleimu_data.name,
      neirong: this.data.com_textarea.value,
      phone: this.data.com_dianhua,
      address: this.data.com_dizhi.address,
      longitude: this.data.com_dizhi.longitude,
      latitude: this.data.com_dizhi.latitude,
      form_id: e.detail.formId
    }
    // 处理换行符
    params.neirong = utils.checkHuanHangFu2_1(params.neirong)
    console.log('params', params)

    // 传入表单数据，调用验证方法
    if (!wxValidate.checkForm({ leimu: params.leibie, neirong: params.neirong, phone: params.phone, address: params.address })) {
      const error = wxValidate.errorList[0]
      // 调用组件tips提示
      this.setData({ toptips_kaiguan: true, toptips_text: error.msg })
      return false
    }

    // 检查是否有图片准备上传
    if (this.data.com_xuanzetupian.length > 0) {
      // 有图片、创建信息
      api.createList(params, (res) => {
        let list_id = res.data.id, cospath = "/bianmin", img = this.data.com_xuanzetupian
        // cos上传
        cos.update_img_cos(cospath, img, (back) => {
          // 上传成功，写入图片数据库
          api.createImg({ list_id: list_id, url: back.data.source_url }, res => {
            console.log('写入图片到数据库OK', res)
          })
        }, (ok) => {
          console.log('ok', ok)
          // 关闭当前页面，跳转到bmxx/myfabu页
          wx.showModal({
            title: '发布成功',
            content: '信息随时可以修改、刷新或删除、还可以邀请好友帮你增加顶置时间',
            showCancel: false,
            success: () => { wx.redirectTo({ url: '/pages/bmxx/myfabu' }) }
          })
        })
      })
    } else {
      // 没图片
      api.createList(params, res => {
        console.log('没图片create', res)
        // 关闭当前页面，跳转到bmxx/myfabu页
        wx.showModal({
          title: '发布成功',
          content: '信息随时可以修改、刷新或删除、还可以邀请好友帮你增加顶置时间',
          showCancel: false,
          success: () => { wx.redirectTo({ url: '/pages/bmxx/myfabu' }) }
        })
      })
    }
  },


})


