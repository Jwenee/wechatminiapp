// import导入用相对路径
import {config} from "../config"

const tips = {
  1:'抱歉，出现了一个错误',
  1005:'appkey无效，请重新申请',
  3000:'期刊不存在'
}
class HTTP{
  request(params) {
    if (!params.method) {
      params.method = "GET"
    }
    wx.request({
      url: config.api_base_url + params.url,
      data: params.data,
      method: params.method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-typr': 'application/json',
        'appkey': config.appkey
      }, // 设置请求的 header
      success: (res)=>{
        // success 状态码为number类型
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          // 结果传递
          params.success && params.success(res.data)
        }
        else {
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err)=>{
        // fail
       this._show_error(1)
      },
      complete: function() {
        // complete
      }
    })
  }

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip?tip:tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}
export {
  HTTP
}