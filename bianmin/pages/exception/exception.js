
Page({

  data: {
    exception: '',
  },

  onLoad: function (op) {
    if (op.exception) {
      this.setData({ exception: op.exception })
    }
  },

})