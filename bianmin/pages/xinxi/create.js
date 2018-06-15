import {
  Api
} from '../../utils/Api.js'
import {
  Base
} from '../../utils/Base.js'
import {
  Cos
} from '../../utils/Cos.js'
import {
  Config
} from '../../utils/Config.js'
import {
  Utils
} from '../../utils/utils.js'

import WxValidate from '../../validate/WxValidate.js'

const cos = new Cos()
const api = new Api()
const utils = new Utils()
const app = getApp()


Page({

  data: {
    // 类目
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

    leimu_state: true,
    // -------------
    params: {
      // 基本
      base: {},
      // 信息图
      img: [],
      // 分类
      fenlei: {}
    },

    // --- 招聘 ---
    // 薪资
    zhaopin_xinziArr: ['1000-2000', '2000-3000', '3000-5000', '5000-8000', '面议'],
    zhaopin_xinzi_index: 0,
    // 福利
    checkboxArr: [{
      name: '包吃',
      state: false
    }, {
      name: '包住',
      state: false
    }, {
      name: '保险',
      state: false
    }, {
      name: '双休',
      state: false
    }, {
      name: '加班补助',
      state: false
    }],

    // --- 求职 ---
    // 性别
    qiuzhi_xingbieArr: ['男', '女'],
    qiuzhi_xingbie_index: 0,
    // 学历
    qiuzhi_xueliArr: ['小学', '中学', '高中', '大学', '博士'],
    qiuzhi_xueli_index: 0,

    // --- 房产出售 ---
    // 装修
    fangchan_chushou_zhuangxiuArr: ['毛坯', '简装', '精装'],
    fangchan_chushou_zhuangxiu_index: 0,

    // --- 房产出租 ---
    // 房型
    multiArray: [
      ['0室', '1室', '2室', '3室', '4室', '5室', '6室'],
      ['0厅', '1厅', '2厅', '3厅', '4厅', '5厅', '6厅'],
      ['0卫', '1卫', '2卫', '3卫', '4卫', '5卫', '6卫']
    ],
    multiIndex: [0, 0, 0],
  },



  // ------------------------------------------ onLoad ------------------------------------------
  onLoad: function(op) {
    // API获得类目数组
    api.leiMu({}, back => {
      console.log('API获得类目数组')
      this.setData({
        leimuArr: back.data
      })
    })
  },


  // --------------------- 分类 -----------------------

  // -------- 招聘 --------

  // 职位
  zhaopin_zhiwei_(e) {
    console.log('招聘-职位', e.detail.value)
    this.setData({
      'params.fenlei.zhaopin_zhiwei': e.detail.value
    })
  },
  // 公司
  zhaopin_gongsi_(e) {
    console.log('招聘-公司', e.detail.value)
    this.setData({
      'params.fenlei.zhaopin_gongsi': e.detail.value
    })
  },
  // 工作地址
  zhaopin_gongzuodizhi_(e) {
    console.log('招聘-工作地址', e.detail.value)
    this.setData({
      'params.fenlei.zhaopin_gongzuodizhi': e.detail.value
    })
  },
  // 薪资
  zhaopin_xinzi_(e) {
    console.log('招聘-薪资', e.detail.value)
    this.setData({
      zhaopin_xinzi_index: e.detail.value
    })
  },

  // 福利
  zhaopin_fuli_(e) {
    console.log('checkbox_', e.detail,'Json.str', JSON.stringify(e.detail))
    this.setData({
      'params.fenlei.zhaopin_fuli': JSON.stringify(e.detail)
    })
  },


  // -------- 求职 --------

  // 性别
  qiuzhi_xingbie_(e) {
    console.log('求职-性别', e.detail.value)
    this.setData({
      qiuzhi_xingbie_index: e.detail.value
    })
  },

  // 年龄
  qiuzhi_nianling_(e) {
    console.log('求职-年龄', e.detail.value)
    this.setData({
      'params.fenlei.qiuzhi_nianling': e.detail.value
    })
  },

  // 学历
  qiuzhi_xueli_(e) {
    console.log('求职-学历', e.detail.value)
    this.setData({
      qiuzhi_xueli_index: e.detail.value
    })
  },

  // 意向职位
  qiuzhi_yixiangzhiwei_(e) {
    console.log('求职-意向职位', e.detail.value)
    this.setData({
      'params.fenlei.qiuzhi_yixiangzhiwei': e.detail.value
    })
  },

  // -------- 房产出售 --------

  // 小区 - input
  fangchan_chushou_xiaoqu_(e) {
    console.log('房产出售-小区', e.detail.value)
    this.setData({
      'params.fenlei.fangchan_chushou_xiaoqu': e.detail.value
    })
  },

  // 面积 - input
  fangchan_chushou_mianji_(e) {
    console.log('房产出售-面积', e.detail.value)
    this.setData({
      'params.fenlei.fangchan_chushou_mianji': e.detail.value
    })
  },

  // 总价 - input
  fangchan_chushou_zongjia_(e) {
    console.log('房产出售-总价', e.detail.value)
    this.setData({
      'params.fenlei.fangchan_chushou_zongjia': e.detail.value
    })
  },

  // 装修 - picker
  fangchan_chushou_zhuangxiu_(e) {
    console.log('房产出售-装修', e.detail.value)
    this.setData({
      fangchan_chushou_zhuangxiu_index: e.detail.value
    })
  },


  // -------- 房产求购 --------

  // 区域 - input
  fangchan_qiugou_quyu_(e) {
    console.log('房产求购-区域', e.detail.value)
    this.setData({
      'params.fenlei.fangchan_qiugou_quyu': e.detail.value
    })
  },

  // -------- 房产出租 --------

  // 小区 - input
  fangchan_chuzu_xiaoqu_(e) {
    console.log('房产出租-小区', e.detail.value)
    this.setData({
      'params.fenlei.fangchan_chuzu_xiaoqu': e.detail.value
    })
  },
  // 面积 - input
  fangchan_chuzu_mianji_(e) {
    console.log('房产出租-面积', e.detail.value)
    this.setData({
      'params.fenlei.fangchan_chuzu_mianji': e.detail.value
    })
  },
  // 价格 - input
  fangchan_chuzu_jiage_(e) {
    console.log('房产出租-价格', e.detail.value)
    this.setData({
      'params.fenlei.fangchan_chuzu_jiage': e.detail.value
    })
  },

  // 房型 - picker2
  fangchan_chuzu_fangxing_(e) {
    console.log('房产出租-房型', e.detail.value)
    let value = e.detail.value
    let multiArray = this.data.multiArray
    this.setData({
      'params.fenlei.fangchan_chuzu_fangxing': multiArray[0][value[0]] + multiArray[1][value[1]] + multiArray[2][value[2]]
    })
  },

  // -------- 房产求租 --------
  // 区域 - input
  fangchan_qiuzu_quyu_(e) {
    console.log('房产求租-区域', e.detail.value)
    this.setData({
      'params.fenlei.fangchan_qiuzu_quyu': e.detail.value
    })
  },

  // ----------------- 组件事件 -----------------------

  // 选择类目
  com_xuanzeleimu_(e) {
    console.log('com_xuanzeleimu_', e.detail)
    this.setData({
      leimu_state: false,
      com_xuanzeleimu_data: e.detail,
      value2index: 0,
      'params.base.leibie': e.detail.name
    })
  },

  // 输入框 
  com_textarea_(e) {
    console.log('textarea', e.detail)
    this.setData({
      com_textarea: e.detail,
      'params.base.neirong': e.detail.value
    })
  },

  // 切换模板按钮
  qiehuanmoban_() {
    let index = this.data.value2index
    let len = this.data.com_xuanzeleimu_data.value2.length;
    // 改变Value2的键、清空要提交的textarea数据、键 = 长度 - 1
    index = index >= len - 1 ? 0 : ++index
    this.setData({
      value2index: index,
      com_textarea: '',
      'params.base.neirong': ''
    })
  },

  // 选择图片
  com_xuanzetupian_(e) {
    this.setData({
      com_xuanzetupian: e.detail,
      'params.img': e.detail
    })
  },

  // 地址
  com_dizhi_(e) {
    this.setData({
      com_dizhi: e.detail,
      'params.base.address': e.detail.address,
      'params.base.longitude': e.detail.longitude,
      'params.base.latitude': e.detail.latitude
    })
  },

  // 电话
  com_dianhua_(e) {
    this.setData({
      com_dianhua: e.detail,
      'params.base.phone': e.detail
    })
  },

  // 提交
  tijiao_(e) {
    console.log('formId', e.detail.formId)
    let params = this.data.params
    // 处理换行符
    params.base.neirong = utils.checkHuanHangFu2_1(params.base.neirong)
    // ------ 验证参数 ------
    let error = this._checkParams(params)
    if (!error) {
      return
    }
    console.log('通过')
    params.base.form_id = e.detail.formId

    // 检查是否有图片准备上传
    if (params.img.length > 0) {
      // 有图片、创建信息
      api.createList({
        params: params
      }, (res) => {
        let list_id = res.data.id,
          cospath = "/bianmin",
          img = params.img
        // cos上传
        cos.update_img_cos(cospath, img, (back) => {
          // 上传成功，写入图片数据库
          api.createImg({
            list_id: list_id,
            url: back.data.source_url
          }, res => {
            console.log('写入图片到数据库OK', res)
          })
        }, (ok) => {
          console.log('ok', ok)
          // 关闭当前页面，跳转到bmxx/myfabu页
          wx.showModal({
            title: '发布成功',
            content: '信息随时可以修改、刷新或删除、还可以邀请好友帮你增加顶置时间',
            showCancel: false,
            // success: () => { wx.redirectTo({ url: '/pages/bmxx/myfabu' }) }
          })
        })
      })
    } else {
      // 没图片
      api.createList({
        params: params
      }, res => {
        console.log('没图片create', res)
        // 关闭当前页面，跳转到bmxx/myfabu页
        wx.showModal({
          title: '发布成功',
          content: '信息随时可以修改、刷新或删除、还可以邀请好友帮你增加顶置时间',
          showCancel: false,
        })
      })
    }
  },

  // ------ 参数验证 ------
  _checkParams(params) {
    console.log('参数验证', params)

    // --- 验证分类参数 ---
    if (params.base.leibie == '招聘') {
      // -- 获取单选项 -- | -薪资-
      params.fenlei.zhaopin_xinzi = this.data.zhaopin_xinziArr[this.data.zhaopin_xinzi_index]
      // -- 获取福利项 -- | -福利-
      params.fenlei.zhaopin_fuli = params.fenlei.zhaopin_fuli || ''
      // -- 招聘分类参数 -- 职位，薪资，公司，工作地址
      const rules = {
        zhaopin_zhiwei: {
          required: true,
          rangelength: [2, 10]
        },
        zhaopin_xinzi: {
          required: true
        },
        zhaopin_gongsi: {
          required: true,
          rangelength: [2, 10]
        },
        zhaopin_gongzuodizhi: {
          required: true,
          rangelength: [2, 10]
        }
      }
      // 验证字段的提示信息，若不传则调用默认的信息
      const messages = {
        zhaopin_zhiwei: {
          required: '职位是必填项',
          rangelength: '职位长度在 2 到 10 之间'
        },
        zhaopin_xinzi: {
          required: '薪资是必填项'
        },
        zhaopin_gongsi: {
          required: '公司是必填项',
          rangelength: '公司长度在 2 到 10 之间'
        },
        zhaopin_gongzuodizhi: {
          required: '工作地址是必填项',
          rangelength: '工作地址长度在 2 到 10 之间'
        }
      }
      // 
      return this._validate_fenlei(rules, messages, params)

    } else if (params.base.leibie == '求职') {
      // -- 求职 -- | --性别-学历 --
      params.fenlei.qiuzhi_xingbie = this.data.qiuzhi_xingbieArr[this.data.qiuzhi_xingbie_index]
      params.fenlei.qiuzhi_xueli = this.data.qiuzhi_xueliArr[this.data.qiuzhi_xueli_index]
      // 性别 - 年龄 - 学历 - 意向职位
      const rules = {
        qiuzhi_xingbie: {
          required: true
        },
        qiuzhi_nianling: {
          required: true
        },
        qiuzhi_xueli: {
          required: true
        },
        qiuzhi_yixiangzhiwei: {
          required: true,
          rangelength: [2, 10]
        }
      }
      const messages = {
        qiuzhi_xingbie: {
          required: '性别是必填项'
        },
        qiuzhi_nianling: {
          required: '年龄是必填项'
        },
        qiuzhi_xueli: {
          required: '学历是必填项'
        },
        qiuzhi_yixiangzhiwei: {
          required: '意向职位是必填项',
          rangelength: '意向职位长度在 2 到 10 之间'
        }
      }
      // 
      return this._validate_fenlei(rules, messages, params)
    } else if (params.base.leibie == '房产出售') {
      // 小区-input、面积-input、总价-input、装修-单选
      params.fenlei.fangchan_chushou_zhuangxiu = this.data.fangchan_chushou_zhuangxiuArr[this.data.fangchan_chushou_zhuangxiu_index]
      //
      const rules = {
        fangchan_chushou_xiaoqu: {
          required: true,
          rangelength: [2, 10]
        },
        fangchan_chushou_mianji: {
          required: true
        },
        fangchan_chushou_zongjia: {
          required: true
        },
        fangchan_chushou_zhuangxiu: {
          required: true
        }
      }
      const messages = {
        fangchan_chushou_xiaoqu: {
          required: '小区是必填项',
          rangelength: '小区长度在 2 到 10 之间'
        },
        fangchan_chushou_mianji: {
          required: '面积是必填项'
        },
        fangchan_chushou_zongjia: {
          required: '总价是必填项'
        },
        fangchan_chushou_zhuangxiu: {
          required: '装修是必填项'
        }
      }
      // 
      if (this._validate_fenlei(rules, messages, params)) {
        // 验证img必填
        return this._validate_img(params.img)
      }
    } else if (params.base.leibie == '房产求购') {
      // 区域-input
      const rules = {
        fangchan_qiugou_quyu: {
          required: true,
          rangelength: [2, 10]
        },
      }
      const messages = {
        fangchan_qiugou_quyu: {
          required: '区域是必填项',
          rangelength: '区域长度在 2 到 10 之间'
        }
      }
      return this._validate_fenlei(rules, messages, params)

    } else if (params.base.leibie == '房产出租') {
      //  -------------- 房产出租 --------------
      // 小区 - input、面积 - input、房型 - picker2、价格 - input
      const rules = {
        fangchan_chuzu_xiaoqu: {
          required: true,
          rangelength: [2, 10]
        },
        fangchan_chuzu_mianji: {
          required: true
        },
        fangchan_chuzu_jiage: {
          required: true
        },
        fangchan_chuzu_fangxing: {
          required: true
        }
      }
      const messages = {
        fangchan_chuzu_xiaoqu: {
          required: '小区是必填项',
          rangelength: '小区长度在 2 到 10 之间'
        },
        fangchan_chuzu_mianji: {
          required: '面积是必填项'
        },
        fangchan_chuzu_jiage: {
          required: '价格是必填项'
        },
        fangchan_chuzu_fangxing: {
          required: '房型是必填项'
        }
      }
      if (this._validate_fenlei(rules, messages, params)) {
        // 验证img必填
        return this._validate_img(params.img)
      }
    } else if (params.base.leibie == '房产求租') {
      // 区域-input
      const rules = {
        fangchan_qiuzu_quyu: {
          required: true,
          rangelength: [2, 10]
        },
      }
      const messages = {
        fangchan_qiuzu_quyu: {
          required: '区域是必填项',
          rangelength: '区域长度在 2 到 10 之间'
        }
      }
      return this._validate_fenlei(rules, messages, params)
    }


    // return validate
  },

  // --- 验证分类参数 ---
  _validate_fenlei(rules, messages, params) {
    // 
    const wxValidate = new WxValidate(rules, messages)
    // 传入表单数据，调用验证方法
    if (!wxValidate.checkForm(params.fenlei)) {
      const error = wxValidate.errorList[0]
      // 调用组件tips提示
      wx.showModal({
        content: error.msg,
        showCancel: false
      })
      return false
    }
    // --- 验证基本参数 ---
    return this._validate_base(params.base)
  },

  // --- 验证基本参数 ---
  _validate_base(base) {
    //
    const rules = {
      leibie: {
        required: true
      },
      neirong: {
        required: true,
        rangelength: [10, 200]
      },
      address: {
        required: true
      },
      phone: {
        required: true
      }
    }
    //
    const messages = {
      leibie: {
        required: '请选择类目'
      },
      neirong: {
        required: '请修改内容',
        rangelength: '内容长度在 10 到 200 之间'
      },
      address: {
        required: '地址是必填项'
      },
      phone: {
        required: '电话是必填项'
      }
    }
    //
    const wxValidate = new WxValidate(rules, messages)
    // 传入表单数据，调用验证方法
    if (!wxValidate.checkForm(base)) {
      const error = wxValidate.errorList[0]
      // 调用组件tips提示
      wx.showModal({
        content: error.msg,
        showCancel: false
      })
      return false
    }
    return true
  },

  // --- 验证img ---
  _validate_img(img) {
    // 
    if (img.length > 0) {
      return true
    } else {
      wx.showModal({
        content: '至少上传1张图片',
        showCancel: false
      })
      return false
    }
  },

  // 提交
  // tijiao(e) {
  // // 给服务器的参数，user_id服务器获取
  // let params = {
  //   leibie: this.data.com_xuanzeleimu_data.name,
  //   neirong: this.data.com_textarea.value,
  //   phone: this.data.com_dianhua,
  //   address: this.data.com_dizhi.address,
  //   longitude: this.data.com_dizhi.longitude,
  //   latitude: this.data.com_dizhi.latitude,
  //   form_id: e.detail.formId
  // }
  // // 处理换行符
  // params.neirong = utils.checkHuanHangFu2_1(params.neirong)
  // console.log('params', params)

  // // 传入表单数据，调用验证方法
  // if (!wxValidate.checkForm({ leimu: params.leibie, neirong: params.neirong, phone: params.phone, address: params.address })) {
  //   const error = wxValidate.errorList[0]
  //   // 调用组件tips提示
  //   this.setData({ toptips_kaiguan: true, toptips_text: error.msg })
  //   return false
  // }

  // // 检查是否有图片准备上传
  // if (this.data.com_xuanzetupian.length > 0) {
  //   // 有图片、创建信息
  //   api.createList(params, (res) => {
  //     let list_id = res.data.id, cospath = "/bianmin", img = this.data.com_xuanzetupian
  //     // cos上传
  //     cos.update_img_cos(cospath, img, (back) => {
  //       // 上传成功，写入图片数据库
  //       api.createImg({ list_id: list_id, url: back.data.source_url }, res => {
  //         console.log('写入图片到数据库OK', res)
  //       })
  //     }, (ok) => {
  //       console.log('ok', ok)
  //       // 关闭当前页面，跳转到bmxx/myfabu页
  //       wx.showModal({
  //         title: '发布成功',
  //         content: '信息随时可以修改、刷新或删除、还可以邀请好友帮你增加顶置时间',
  //         showCancel: false,
  //         success: () => { wx.redirectTo({ url: '/pages/bmxx/myfabu' }) }
  //       })
  //     })
  //   })
  // } else {
  //   // 没图片
  //   api.createList(params, res => {
  //     console.log('没图片create', res)
  //     // 关闭当前页面，跳转到bmxx/myfabu页
  //     wx.showModal({
  //       title: '发布成功',
  //       content: '信息随时可以修改、刷新或删除、还可以邀请好友帮你增加顶置时间',
  //       showCancel: false,
  //       success: () => { wx.redirectTo({ url: '/pages/bmxx/myfabu' }) }
  //     })
  //   })
  // }
  // },


})