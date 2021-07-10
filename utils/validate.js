/*
 * @Descripttion: 校验
 * @Author: pujianguo
 * @Date: 2021-04-02 13:56:26
 */

/** ***********************************  正则表达式  *********************************** **/
export const regExpPhone = /^1[34578]\d{9}$/
export const regExpEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

/** ***********************************  正则校验  *********************************** **/
export const validatePhone = function (value) {
  return regExpPhone.test(value)
}
export const validateEmail = function (value) {
  return regExpEmail.test(value)
}
