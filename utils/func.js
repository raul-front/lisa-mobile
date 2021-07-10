/*
 * @Descripttion: 公共方法
 * @Author: pujianguo
 * @Date: 2021-04-02 09:41:58
 */
import * as filterConst from '@/filter/const'
import * as filterConstLisa from 'lisa/filter/const'
import formatFunc from '@/filter/format'
import formatFuncLisa from 'lisa/filter/format'

/** *************** 数据相关 *************** **/
/**
 * 深拷贝数据
 * @param {Object} data 要拷贝的原数据
 * @return {Object} 拷贝后的数据
 */
export const copy = data => {
  return JSON.parse(JSON.stringify(data))
}
/**
 * 将const中的数据转化为下拉框选择时可用的数组
 * @param {Object} obj  const中的数据
 * @param {Object|null} firstItem 下拉框第一项，如：{value: '', label: '请选择xxx'}
 * @param {Boolean} isNumber key是否是number类型
 * @return {Array} 转换后的数据
 */
export const constDataToArray = (obj, firstItem = null, isNumber = false) => {
  const arr = []
  if (isNumber) {
    Object.getOwnPropertyNames(obj).forEach(k => {
      if (k !== 'default') {
        arr.push({ value: Number(k), label: obj[k] })
      }
    })
  } else {
    Object.getOwnPropertyNames(obj).forEach(k => {
      if (k !== 'default') {
        arr.push({ value: k, label: obj[k] })
      }
    })
  }
  firstItem && arr.unshift(firstItem)
  return arr
}

/**
 * filter过滤器 优先选择项目中的过滤器
 * @param {String} filterName 过滤器名称
 * @param {String} arg 参数
 * @return {String|Number} 转换结果，一般结果为字符串或数字
 */
export const filter = (filterName, arg) => {
  let data = filterConst[`${filterName}Data`]
  if (data) {
    return data[arg] || data.default
  } else {
    data = filterConstLisa[`${filterName}Data`]
    return data ? (data[arg] || data.default) : ''
  }
}
/**
 * format格式化 优先执行项目中的方法
 * @param {String} formatName 过滤器名称
 * @param {Array} args 任意多个参数
 * @return {String|Number} 转换结果，一般结果为字符串或数字
 */
export const format = (formatName, ...args) => {
  return formatFunc[formatName] ? formatFunc[formatName](...args) : (formatFuncLisa[formatName] ? formatFuncLisa[formatName](...args) : '')
}

/** *************** 时间相关 *************** **/
/**
 * 获取最近几小时的时间
 * @param {number} n 最近n小时，负数表示向前
 * @param {Date|String} t 计算的开始时间，为空时默认取当前时间
 * @param {string} filterName 最后格式化的filter名称，取值为：month、date、minute、second
 * @return {String} 计算后的格式化时间
 */
export const getRecentHour = (n, t, filterName = 'second') => {
  const now = t ? (new Date(t)) : new Date()
  now.setHours(now.getHours() + n)
  return filter(filterName, now)
}
/**
 * 获取最近几天的时间
 * @param {number} n 最近n天，负数表示向前
 * @param {Date|String} t 计算的开始时间，为空时默认取当前时间
 * @param {string} filterName 最后格式化的filter名称，取值为：month、date、minute、second
 * @return {String} 计算后的格式化时间
 */
export const getRecentDate = (n, t, filterName = 'date') => {
  const now = t ? (new Date(t)) : new Date()
  now.setDate(now.getDate() + n)
  return filter(filterName, now)
}

/**
 * 异步延迟
 * @param {number} n 延迟时间 毫秒
 * @return {Promise}
 */
export const sleep = (s) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve('')
    }, s)
  })
}

// 用于调试
// 在打印json数据时，控制台默认收缩的数据，不方便查看内层数据
export const console = function (json, flag = 'log') {
  const a = [`${flag}--------------------`]
  for (const k in json) {
    if (typeof json[k] === 'object') {
      a.push(`${k}: ${JSON.stringify(json[k])}`)
    } else {
      a.push(`${k}: ${json[k]}`)
    }
  }
  a.push('--------------------')
  window.console.log(a.join('\n'))
}

/**
 * 数字转英文字母
 * 如：1->A
 * @param num
 * @returns {string}
 */
export const convert = (num) => {
  let result = ''
  while (num) {
    result = String.fromCharCode(--num % 26 + 65) + result
    num = Math.floor(num / 26)
  }
  return result
}
