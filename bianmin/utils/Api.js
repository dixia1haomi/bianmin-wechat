import { Base } from './Base.js'

class Api extends Base {
  constructor() {
    super()
  }

  // 获取信息列表
  getList(data, callback) {
    wx.showLoading({ title: '加载中' })
    this.request({
      url: 'index/getlist', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 创建list
  createList(data, callback) {
    this.request({ url: 'index/create', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 创建img
  createImg(data, callback) {
    this.request({ url: 'index/createimg', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 增加点击量
  incLiulangcishu(data, callback) {
    this.request({ url: 'index/incliulangcishu', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // ------------------------------------------------- 我的 ---------------------------------------------------
  // 我的发布
  myFabu(data, callback) {
    this.request({ url: 'index/myfabu', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 删除我的发布(接受list_id)
  deleteMyFabu(data, callback) {
    this.request({ url: 'index/deletemyfabu', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 刷新(接受id)
  updateTime(data, callback) {
    this.request({ url: 'index/updatetime', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 获取电话
  getPhone(data, callback) {
    this.request({ url: 'index/getphone', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // ------------------------------------------------- COS ---------------------------------------------------
  // cos签名
  cosQianming(data, callback) {
    this.request({ url: 'cos/qianmingdanci', data: data, sCallback: (res) => { callback && callback(res) } })
  }


  // ------------------------------------------------- Token ---------------------------------------------------
  // 登陆
  newLogin(data, callback) {
    this.request({ url: 'token/gettoken', data: data, sCallback: (res) => { callback && callback(res.data) } })
  }

  // 检查token是否失效 
  checkToken(data, callback) {
    this.request({ url: 'token/verify', data: data, sCallback: (res) => { callback && callback(res.data) } })
  }


  // ------------------------------------------------- 文章 ---------------------------------------------------
  // 获取文章列表
  wenzhangList(data, callback) {
    this.request({ url: 'index/wenzhanglist', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 获取文章详情
  wenzhangDetail(data, callback) {
    this.request({ url: 'index/wenzhangdetail', data: data, sCallback: (res) => { callback && callback(res) } })
  }


  // ------------------------------------------------- 商家 ---------------------------------------------------
  // 新增商家
  createShangjia(data, callback) {
    this.request({ url: 'index/createshangjia', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 新增商家图片
  createShangjiaImg(data, callback) {
    this.request({ url: 'index/createshangjiaimg', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 查询商家详情(接受商家ID)
  findShangjia(data, callback) {
    this.request({ url: 'index/findshangjia', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 查询商家列表
  selectShangjia(data, callback) {
    this.request({ url: 'index/selectshangjia', data: data, sCallback: (res) => { callback && callback(res) } })
  }


  // // ------------------------------------------------- 卡卷接口测试 ---------------------------------------------------


  // // 查询优惠商家列表 || 失败返回1,成功返回0
  // selectKajuan(data, callback) {
  //   this.request({ url: 'kajuan/select', data: data, sCallback: (res) => { callback && callback(res.data) } })
  // }

  // // 查询指定卡劵(客户端卡劵页用，接受卡劵ID)
  // findKajuan(data, callback) {
  //   this.request({ url: 'kajuan/find', data: data, sCallback: (res) => { callback && callback(res.data) } })
  // }

  // // 去服务器换signature，接受card_id（用于调用wx.addCard）
  // signatureKajuan(data, callback) {
  //   this.request({ url: 'kajuan/signature', data: data, sCallback: (res) => { callback && callback(res.data) } })
  // }

  // // 解密wx.addCard成功后返回的code(接受加密code, 解密后用于wx.openCard)
  // codeKajuan(data, callback) {
  //   this.request({ url: 'kajuan/code', data: data, sCallback: (res) => { callback && callback(res.data) } })
  // }

  // // 更新卡劵剩余数量(接受card_id，表id)
  // shengyushuliangKajuan(data, callback) {
  //   this.request({ url: 'kajuan/shengyushuliang', data: data, sCallback: (res) => { callback && callback(res.data) } })
  // }

  // // 卡劵领取记录(接受卡劵ID==card_id)
  // logKajuan(data, callback) {
  //   this.request({ url: 'kajuan/log', data: data, sCallback: (res) => { callback && callback(res.data) } })
  // }

  // // --------------------------------------------------- 餐厅 ---------------------------------------------------

  // // 查询餐厅列表
  // listCanting(data, callback) {
  //   this.request({ url: 'canting/list', data: data, sCallback: (res) => { callback && callback(res.data) } })
  // }

  // // 查询收藏的餐厅列表（我的-我的收藏使用，接受缓存的收藏数组）
  // shoucanglistCanting(data, callback) {
  //   this.request({ url: 'canting/shoucanglist', data: data, sCallback: (res) => { callback && callback(res.data) } })
  // }

  // // 查询餐厅详细信息,接受餐厅表ID
  // detailCanting(data, callback) {
  //   this.request({ url: 'canting/detail', data: data, sCallback: (res) => { callback && callback(res.data) } })
  // }

  // // 餐厅点赞
  // dianzanCanting(data, callback) {
  //   this.request({ url: 'canting/zan', data: data, sCallback: (res) => { callback && callback(res.data) } })
  // }

  // // --------------------------------------------------- User ---------------------------------------------------


  // // 查询我的留言（根据uid-服务器内部获取，page分页,每页20条）
  // myLiuyan(data, callback) {
  //   this.request({ url: 'user/myliuyan', data: data, sCallback: (res) => { callback && callback(res.data) } })
  // }


  // // --------------------------------------------------- 留言 ---------------------------------------------------

  // // 查询留言列表(接受canting_id,page分页,每页20条)
  // listLiuyan(data, callback) {
  //   this.request({ url: 'liuyan/list', data: data, sCallback: (res) => { callback && callback(res.data) } })
  // }

  // // 新增留言
  // createLiuyan(data, callback) {
  //   this.request({ url: 'liuyan/create', data: data, sCallback: (res) => { callback && callback(res.data) } })
  // }


  // // 删除留言
  // deleteLiuyan(data, callback) {
  //   this.request({ url: 'liuyan/delete', data: data, sCallback: (res) => { callback && callback(res.data) } })
  // }

}

export { Api }

