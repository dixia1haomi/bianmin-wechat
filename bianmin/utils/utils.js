
class Utils {
  constructor() { }

  // -------------------------- 处理换行符号 --------------------------

  // \n\n换\n
  checkHuanHangFu2_1(str) {
    for (let i in str) {
      if (str.indexOf("\n\n") == -1) {
        break;
      }
      str = str.replace(/\n\n/g, "\n")
    }
    return str;
  }

  // \n换空格
  checkHuanHangFu(str) {
    for (let i in str) {
      if (str.indexOf("\n") == -1) {
        break;
      }
      str = str.replace(/\n/g, " ")
    }
    return str;
  }


  // -------------------------- 处理换行符号 --------------------------
  // -------------------------- 处理换行符号 --------------------------

}

export { Utils }