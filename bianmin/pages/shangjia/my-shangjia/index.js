import { Api } from '../../../utils/Api.js'

const api = new Api()
const app = getApp()


Page({

  data: {
    myShangjiaRes: false,
  },


  // -----------------------  onLoad  ------------------------

  onLoad: function (options) {
    this._load()
  },

  _load(callback) {
    // API 我的店铺
    api.getMyShangjia({}, (res) => {
      console.log('我的店铺', res)
      this.setData({ myShangjiaRes: res.data })
      callback && callback()
    })
  },


  // 商家扫描核销
  // 1.自己只可以核销自己店铺下的
  //   （码上带商家ID，扫后对比是不是商家的活动）
  //   （码上带活动ID，扫后对比是否一致）
  // 
  saoma_() {
    // 登录
    if (app.data.LoginState) {
      // 只允许从相机扫码
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          console.log('只允许从相机扫码', res)
          if (res.result) {
            let arr = res.result.split('-');
            console.log('arr', arr)
            // 对比
            let myShangjiaRes = this.data.myShangjiaRes
            if (myShangjiaRes.id == arr[0]) {
              console.log('对比成功', myShangjiaRes.id, arr[0])
              // 准备发送请求删除劵
              api.hexiaoLingquHuodong({
                // state：1 商家扫码核销标识
                params: { state: 1, shangjia_id: arr[0], huodong_id: arr[1], id: arr[2] }
              }, back => {
                console.log('扫码核销OK', back)
                // back.msg = 成功 || 不存在 || 对比失败
                wx.showModal({ title: back.msg })
              })
            } else {
              console.log('对比失败', shangjia_id, arr[0])
              // 提示对比失败
            }
          }
        }
      })
    } else {
      // 提示登陆
      this.setData({ loginState: true })
    }
  },


  // 刷新
  shuaxin_(e) {
    console.log('shuaxin', e.detail.formId, e.currentTarget.id)
    api.shuaXinShangjia({ id: e.currentTarget.id, form_id: e.detail.formId }, back => {
      this.setData({ 'myShangjiaRes.form_id': e.detail.formId })
      wx.showToast({ title: '刷新成功' })
    })
  },


  // ----------------------- 删除店铺 -----------------------
  deleteShangjia_(e) {
    if (app.data.LoginState) {
      wx.showModal({
        title: '删除店铺？', content: '将会删除店铺相关的所有数据。', success: (res) => {
          if (res.confirm) {
            api.deleteShangjia({ id: e.currentTarget.id }, (back) => {
              console.log('删除店铺OK', back)
              this._load()
            })
          }
        }
      })
    } else {
      // 提示登陆
      this.setData({ loginState: true })
    }
  },

  // ----------------------- 转到商家详情页 -----------------------
  // 组件点击头图事件
  com_toutu_(e) {
    wx.navigateTo({ url: '/pages/shangjia/detail?id=' + e.detail.id })
  },


  // ----------------------- 下拉刷新 -----------------------
  onPullDownRefresh: function () {
    this._load(back => {
      wx.stopPullDownRefresh()
    })
  },



})