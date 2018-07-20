const app = getApp()

Page({

  data: {

  },


  onLoad: function(op) {
    let list = app.data.bmlist
    for (let i in list) {
      if (list[i].id == op.id) {
        this.setData({
          Res: list[i]
        })
        break;
      }
    }
  },

})