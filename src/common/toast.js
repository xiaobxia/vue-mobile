/**
 * Created by xiaobxia on 2018/5/31.
 */
import { Toast } from 'mint-ui'

const duration = 500

export default {
  success (text) {
    Toast({
      message: text,
      iconClass: 'icon far fa-check-circle',
      className: 'success',
      duration: duration
    })
  },
  error (text) {
    Toast({
      message: text,
      iconClass: 'icon far fa-frown',
      className: 'error',
      duration: duration
    })
  }
}
