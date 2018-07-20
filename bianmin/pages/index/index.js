import {
  Api
} from '../../utils/Api.js'

import {
  Config
} from '../../utils/Config.js'

const api = new Api()

const app = getApp()

let page = 1;
// let leibie = '全部'



Page({

  // * 组件foot没有用了

  data: {
    // Res: [],
    // shangjiaList: [], // 商家列表
    // noData: false, // 上拉更多
    leibieArr: Config.leibie,
    leibieArr_index: 0,
    // 选中的类别
    leibie: "全部",
    // 展开条件列表
    where: false,
    //  -------
    zhaopinfuliArr: [{
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
  },


  mask_() {
    this.setData({
      mask: true
    })
  },

  wancheng_() {
    this.setData({
      mask: false
    })
  },

  // ------
  zhaopin_fuli_(e) {
    console.log('zhaopin_fuli_', e.detail)
  },

  where_() {
    console.log('aaa')
  },

  // where
  where_xinxi_() {
    console.log('where')
    this.setData({
      where: !this.data.where
    })
  },

  // itme1_
  itme1_(e) {
    console.log('itme1_', e.currentTarget.dataset.index)
    this.setData({
      leibieArr_index: e.currentTarget.dataset.index
    })
  },

  // itme2_
  itme2_(e) {
    console.log('itme2_', e.currentTarget.dataset.name)
    this.setData({
      where: false,
      leibie: e.currentTarget.dataset.name,
      // 清除Res,显示加载
      Res: false,
      // 清除noData,正常下拉刷新
      noData: false
    })

    // 请求
    this._load()
  },

  // 去地图插件页
  go_map_(e) {
    console.log('go_map_', e.detail)
    api.authorize_userLocation(() => {
      console.log('已授权地理位置')
      wx.navigateTo({
        url: '/pages/index/map?address=' + e.detail.address + '&longitude=' + e.detail.longitude + '&latitude=' + e.detail.latitude
      })
    })
  },

  // 剪贴板
  fuzhi_() {
    wx.setClipboardData({
      data: 'daishuweixin1',
      success: function(res) {
        wx.showModal({
          title: '袋鼠微信已复制',
          content: '你好、我是小优、很期待与你成为朋友、快去加我吧。',
          showCancel: false
        })
      }
    })
  },

  // ----------------- 登录组件 -------------------
  // 打开登录弹窗
  com_login_() {
    console.log('com_login_')
    this.setData({
      loginState: true
    })
  },

  // -------------------------------------------- 展开 --------------------------------------
  zhankai_() {
    this.setData({
      zhankai: !this.data.zhankai
    })
  },


  // -------------------------------------------- onLoad --------------------------------------

  onLoad: function(op) {
    // app.checkToken(() => {
    //   // // 检查op
    //   // op = this._check_op(op)
    //   // console.log('qwe',op)
    //   // // 检查page
    //   // if (op.page == 'huodongDetail') {
    //   //   // 去活动页
    //   //   let url = op.canyuId ? '/pages/huodong/detail?id=' + op.id + '&canyuId=' + op.canyuId : '/pages/huodong/detail?id=' + op.id
    //   //   wx.navigateTo({ url: url })
    //   // }
    // })

    console.log('index', op)

    this._load()

    app.checkToken(() => {
      // 检查op
      op = this._check_op(op)
      // 检查page
      if (op.page && op.page == 'yaoqing') {
        // 去邀请页
        let url = '/pages/wode/xinxi/yaoqing?id=' + op.id
        wx.navigateTo({
          url: url
        })
      }
    })


  },


  // 检查op
  _check_op(op) {
    if (op.scene) {
      let scene_arr = decodeURIComponent(op.scene).split('-');
      console.log('scene_arr', scene_arr)
      // 去信息邀请页
      if (scene_arr[0] == 'yaoqing') {
        op.page = scene_arr[0]
        op.id = scene_arr[1]
      }
    }
    return op;
  },

  // 请求数据
  _load(callback) {
    // 分页1
    page = 1
    // log
    console.log('page=', page, 'leibie=', this.data.leibie, 'noData=', this.data.noData)
    // 
    api.getList({
      page: page,
      leibie: this.data.leibie
    }, res => {
      console.log('信息列表', res)
      this.setData({
        Res: res.data
      })
      // 回调给下拉刷新用
      callback && callback()
      // 存到appData
      app.data.bmlist = res.data
    })
  },

  // // 获取商家列表
  // _getShangjiaList() {
  //   api.selectShangjia({}, res => {
  //     console.log('商家列表', res)
  //     this.setData({ shangjiaList: res.data })
  //   })
  // },



  // 去我的页
  go_wode() {
    wx.navigateTo({
      url: '/pages/wode/index'
    })
  },


  // ------------------------------------------------- 下拉刷新、上拉加载、分享 -------------------------------------------------


  // 下拉刷新
  onPullDownRefresh: function() {
    this._load(back => {
      this.setData({
        noData: false
      })
      wx.stopPullDownRefresh()
    })
    // this._getShangjiaList()
  },

  // 上拉触底
  onReachBottom: function() {
    // 检查登录状态
    // this._checkLogin()
    console.log('上拉触底')

    // 显示loadmore
    // this.setData({
    //   loadmore: true
    // }, () => {

    // })

    if (this.data.noData == true) {
      // 没有数据

    } else {
      // 请求
      if (this.data.Res.length < 20) {
        this.setData({
          noData: true
        })
      } else {
        this.setData({
          // 加载中
          loading: true
        })
        // 请求
        page++
        api.getList({
          page: page,
          leibie: this.data.leibie
        }, res => {
          // == 0 || < 20 || == 20
          if (res.data.length == 0) {
            this.setData({
              loading: false,
              nodata: true
            })
          } else if (res.data.length < 20) {
            let newRes = this.data.Res.concat(res.data)
            this.setData({
              Res: newRes,
              loading: false,
              noData: true
            })
            app.data.bmlist = newRes
          } else {
            let newRes = this.data.Res.concat(res.data)
            this.setData({
              Res: newRes,
              loading: false,
              noData: false
            })
            app.data.bmlist = newRes
          }
        })
      }
    }
  },

  // 检查登录状态
  // _checkLogin() {
  //   console.log('_checkLogin-app-loginstate', app.data.LoginState)
  //   if (!app.data.LoginState && !this.data.login_quxiao) {
  //     // setTimeout(() => {
  //     this.com_login_()
  //     // }, 2000)
  //   }
  // },

  // 登录组件取消 -- 取消过就不在提示
  // com_login_quxiao_() {
  //   if (!this.data.login_quxiao) { this.setData({ login_quxiao: true }) }
  // },

  // 分享
  onShareAppMessage: function() {
    return {
      title: '',
      path: '/pages/index/index'
    }
  },


  // ---------------------------------- 组件foot --------------------------------------------------

  // // 打开留言窗
  // foot_liuyan_(e) {
  //   console.log('foot_liuyan_', e.detail.id)
  //   if (app.data.LoginState) {
  //     // 打开留言窗，携带id
  //     this.setData({
  //       liuyanchuang_state: true,
  //       liuyanchuang_id: e.detail.id
  //     })
  //   } else {
  //     // 登录窗
  //     this.setData({
  //       loginState: true
  //     })
  //   }
  // },

  // ---------------------- 留言窗 -------------------------
  // // 确定
  // liuyanchuang_queding_(e) {
  //   console.log('留言窗确定', e.detail.params)
  //   // 新增留言
  //   api.createBianminLiuyan({
  //     form_id: e.detail.params.form_id,
  //     neirong: e.detail.params.input,
  //     bmxx_id: this.data.liuyanchuang_id
  //   }, (back) => {
  //     console.log('新增留言OK', back)
  //     // 刷新
  //     // this.setData({ Res: back.data })
  //     let Res = this.data.Res
  //     for (let i in Res) {
  //       console.log('for')
  //       if (back.data.id == Res[i].id) {
  //         this.setData({
  //           ['Res[' + i + ']']: back.data
  //         })
  //         break;
  //       }
  //     }
  //   })
  // },

})