import { Api } from '../../utils/Api.js'

const api = new Api()
const app = getApp()

Page({

  data: {
    // 活动信息
    huodongRes: null,
    // 参与人数据
    canyuRes: null,
    // 助力按钮
    zhuli: false,
    // 切换按钮
    qiehuan: false,
    // 参与按钮(默认)
    canyu: false,
    // 邀请按钮
    yaoqing: false,
    // 已领、跳转
    tiaozhuan: false,
    // 保存自己的数据、切换时使用
    zijiRes: null,

    // 分享窗
    fenxiangTanChuang: false,
  },


  onLoad: function (op) {
    console.log('活动页-查询活动详情', op)
    this._load(op)
  },


  _load(op) {
    // 查询活动详情
    this._find_Huodong(op)
  },

  // 查询活动详情
  _find_Huodong(op) {
    api.findShangjiaHuodong({ id: op.id }, res => {
      console.log('活动详情', res)
      if (res.data) {
        this.setData({ huodongRes: res.data }, () => {
          if (res.data.state == 1) {
            // 已发布、判断条件
            if (res.data.tiaojian == 0) {
              // 无条件
              this.setData({ lingqu: true })
            } else {
              // 有条件、判断有无canyuID
              if (op.canyuId) {
                // 有canyuId
                console.log('有canyuId', op)
                // 查别人的参与结果
                this._bieren(op)
              } else {
                // 无canyuId
                console.log('无canyuId', op)
                this._ziji(op)
              }
            }
          }
        })
      }
      wx.hideLoading()
    })
  },


  // 检查自己的参与结果
  _ziji(op) {
    api.checkZiji({ params: { huodong_id: op.id } }, back => {
      console.log('查自己的参与结果', back)
      if (back.data) {
        // 有
        if (back.msg == '邀请') {
          this.setData({ canyuRes: back.data, yaoqing: true, canyu: false })
        } else if (back.msg == '跳转') {
          this.setData({ canyuRes: back.data, tiaozhuan: true, canyu: false })
        } else if (back.msg == '领取') {
          this.setData({ canyuRes: back.data, lingqu: true, canyu: false })
        }
      } else {
        // 无、参与
        this.setData({ canyu: true })
      }
      wx.hideLoading()
    })
  },

  // 检查别人的参与结果
  _bieren(op) {
    api.checkBieren({ params: { canyu_id: op.canyuId, huodong_id: op.id } }, back => {
      console.log('有canyuId-back', back)
      if (back.data) {
        // 有结果、自己是否助力过
        if (back.msg == '已助') {
          // 已助、提示、别人的数据+切换按钮、继续查自己的参与结果
          wx.showModal({ title: '您已为好友助力过', content: '袋鼠同城感谢您的参与', showCancel: false })
          this.setData({ canyuRes: back.data }, () => {
            // 继续查自己的参与结果
            api.checkZiji({ params: { huodong_id: op.id } }, zijiback => {
              console.log('继续查自己的参与结果 (保存在zijiRes里，等待用户切换)', zijiback)
              if (zijiback.data) {
                // 有、自己已参与、切换
                this.setData({ qiehuan: true, zijiRes: zijiback })
              } else {
                // 无、自己未参与、参与
                this.setData({ canyu: true })
              }
            })
          })
        } else {
          // 未助、别人的数据+助力按钮
          this.setData({ canyuRes: back.data, zhuli: true })
        }
      } else {
        // 无结果、查自己的参与结果
        this._ziji(op)
      }
      wx.hideLoading()
    })
  },

  // 切换
  qiehuan_() {
    let zijiRes = this.data.zijiRes

    if (zijiRes.msg == '邀请') {
      this.setData({ canyuRes: zijiRes.data, yaoqing: true, qiehuan: false })
    }
    else if (zijiRes.msg == '领取') {
      this.setData({ canyuRes: zijiRes.data, lingqu: true, qiehuan: false })
    }
    else if (zijiRes.msg == '跳转') {
      this.setData({ canyuRes: zijiRes.data, tiaozhuan: true, qiehuan: false })
    }
  },


  // -------------------- 参与 --------------------
  canyu_() {
    // 需要先登录获得用户资料
    if (app.data.LoginState) {
      // 写入参与表
      api.createCanyuHuodong({ params: { shangjia_id: this.data.huodongRes.shangjia_id, huodong_id: this.data.huodongRes.id } }, back => {
        console.log('写入参与表OK', back)
        // 提示
        wx.showModal({ title: '参与成功', content: '袋鼠同城感谢您的参与', showCancel: false })
        // 查自己
        // op.id = this.data.huodongRes.id
        this._ziji({ id: this.data.huodongRes.id })
      })
    } else {
      // 提示登陆
      this.setData({ loginState: true })
    }
  },

  // -------------------- 助力 --------------------
  zhuli_() {
    // 需要先登录获得用户资料
    if (app.data.LoginState) {
      // 写入助力表
      api.createZhuliHuodong({ params: { canyu_id: this.data.canyuRes.id } }, back => {
        console.log('写入助力表OK', back)
        // 提示
        wx.showModal({ title: '助力成功', content: '袋鼠同城感谢您的参与', showCancel: false })
        // push显示
        let with_zhuli = this.data.canyuRes.with_zhuli
        with_zhuli.push(back.data)
        // 查自己是否参与过不设置数据只要msg
        api.checkZiji({ params: { huodong_id: this.data.huodongRes.id } }, ziji => {
          if (ziji.data) {
            // 自己已参与、显示切换按钮、保存自己的数据、切换时使用
            this.setData({ 'canyuRes.with_zhuli': with_zhuli, qiehuan: true, zhuli: false, zijiRes: ziji })
          } else {
            // 自己未参与、显示参与按钮
            this.setData({ 'canyuRes.with_zhuli': with_zhuli, canyu: true, zhuli: false })
          }
        })
        wx.hideLoading()
      })
    } else {
      // 提示登陆
      this.setData({ loginState: true })
    }
  },


  // 领取
  lingqu_() {
    // e.currentTarget.id
    // 需要先登录获得用户资料
    if (app.data.LoginState) {
      api.createLingquHuodong({ params: { shangjia_id: this.data.huodongRes.shangjia_id, huodong_id: this.data.huodongRes.id } }, back => {
        console.log('领取OK', back)
        // 提示
        wx.showModal({ title: '领取成功', content: '袋鼠同城感谢您的参与', showCancel: false })
        this.setData({ tiaozhuan: true, lingqu: false })
        wx.hideLoading()
      })
    } else {
      // 提示登陆
      this.setData({ loginState: true })
    }
  },

  // 跳转
  tiaozhuan_() {
    console.log('跳转')
    if (app.data.LoginState) {
      let juan_id = this.data.canyuRes.kajuan.id
      wx.navigateTo({ url: '/pages/kajuan/detail?id=' + juan_id })
    } else {
      // 提示登陆
      this.setData({ loginState: true })
    }
  },



  // 邀请弹窗
  yaoqing_() {
    // 预防之前参与过然后登录态又失效要邀请先登录
    if (app.data.LoginState) {
      // 打开弹窗
      this.setData({ fenxiangTanChuang: true })
    } else {
      // 提示登陆
      this.setData({ loginState: true })
    }
  },

  // 组件海报事件
  com_haibao_() {
    console.log(' * 组件海报事件 * ')
    let huodong_id = this.data.huodongRes.id
    let canyuId = this.data.canyuRes.id
    let scene = 'huodongDetail' + '-' + huodong_id + '-' + canyuId
    api.huodongZhulierweima({ scene: scene }, back => {
      console.log('活动二维码OK', back)
      if (back.msg == 'ok') {
        // 显示图片
        this.setData({ haibaoImg: 'https://bianmin.qujingdaishuyanxuan.org' + back.data })
        // 提示
        wx.showModal({
          title: '制作完成',
          content: '长按保存到相册，即可分享给好友，每个好友能帮你增加一天顶置时间',
          showCancel: false,
          success: () => {
            // this.yulanghaibao_()
          },
        })
      } else {
        wx.showModal({
          title: '制作失败',
          content: '请使用直接分享给好友或群',
          showCancel: false
        })
      }
      // 关闭分享弹窗
      this.setData({ fenxiangTanChuang: false })
    })
  },



  // 直接分享
  onShareAppMessage: function () {
    let huodong_id = this.data.huodongRes.id
    let canyu = this.data.canyuRes
    let path;
    if (canyu) {
      path = '/pages/index/index1?page=' + 'huodongDetail' + '&id=' + huodong_id + '&canyuId=' + canyu.id
    } else {
      path = '/pages/index/index1?page=' + 'huodongDetail' + '&id=' + huodong_id
    }
    console.log('onShareAppMessage', path)
    return {
      title: '帮我助力',
      path: path,
      imageUrl: '/img/150.jpg',
      complete: () => {
        // 关闭分享弹窗
        this.setData({ fenxiangTanChuang: false })
      }
    }
  },


})