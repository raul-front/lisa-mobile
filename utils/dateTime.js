import moment from 'moment'
import 'moment/locale/zh-cn'

/**
 * 获取本周一时间
 * @returns {number}
 */
export const getWeekDay = () => {
  // 起止日期数组
  // var startStop = []
  // 获取当前时间
  var currentDate = new Date()
  // 返回date是一周中的某一天
  var week = currentDate.getDay()
  // 返回date是一个月中的某一天
  // var month = currentDate.getDate()

  // 一天的毫秒数
  var millisecond = 1000 * 60 * 60 * 24
  // 减去的天数
  var minusDay = week !== 0 ? week - 1 : 6
  // alert(minusDay)
  // 本周 周一
  var monday = new Date(currentDate.getTime() - (minusDay * millisecond))
  // 本周 周日
  var sunday = new Date(monday.getTime() + (6 * millisecond))
  monday = monday.getFullYear() + '-' + (monday.getMonth() + 1) + '-' + monday.getDate()
  sunday = sunday.getFullYear() + '-' + (sunday.getMonth() + 1) + '-' + sunday.getDate()
  return {
    monday: monday,
    sunday: sunday
  }
}
/**
 * 格式化相对时间
 * @returns {string}
 * @param value
 * @param now
 */
export const relativelyTime = (value, now) => {
  if (!now) {
    now = moment()
  }
  const diff = moment(now).diff(moment(value), 'hours')
  if (diff < 0) {
    return '刚刚'
  }
  if (diff <= 1) {
    return moment(value).fromNow()
  }
  const today = moment(now).get('date')
  const current = moment(value).get('date')
  if (current < today - 1) {
    // return moment(value).format('M月D日 H:mm');
  }
  let detailTime = moment(value).format('H:mm')
  const currentDate = moment(value).format('YYYY-MM-DD')
  const currentMonday = moment().weekday(0).format('YYYY-MM-DD')
  const currentSunday = moment().weekday(6).format('YYYY-MM-DD')
  let weekDate = ''
  if (currentDate < currentMonday) {
    weekDate = '[上周]dd ' + detailTime
  } else if (currentDate > currentSunday) {
    weekDate = '[下周]dd ' + detailTime
  } else {
    weekDate = '[周]dd ' + detailTime
  }
  return moment(value).calendar(null, {
    sameDay: '[今天 ]' + moment(value).format('H:mm'),
    nextDay: '[明天 ]' + detailTime,
    nextWeek: weekDate,
    lastDay: '[昨天 ]' + detailTime,
    lastWeek: weekDate,
    sameElse: 'M月D日 H:mm'
  })
}
/**
 *
 * @param value 日期
 * @param showDetailTime 是否显示具体时间
 * @returns {string}
 */
export const relativelyTaskTime = (value, showDetailTime = false) => {
  let detailTime = moment(value).format('H:mm')
  if (!showDetailTime) {
    detailTime = ''
  }
  const currentDate = moment(value).format('YYYY-MM-DD')
  const currentMonday = moment().weekday(0).format('YYYY-MM-DD')
  const currentSunday = moment().weekday(6).format('YYYY-MM-DD')
  let weekDate = ''
  if (currentDate < currentMonday) {
    weekDate = '[上周]dd ' + detailTime
  } else if (currentDate > currentSunday) {
    weekDate = '[下周]dd ' + detailTime
  } else {
    weekDate = '[周]dd ' + detailTime
  }
  return moment(value).calendar(null, {
    sameDay: '[今天 ]' + moment(value).format('H:mm'),
    nextDay: '[明天 ]' + detailTime,
    nextWeek: weekDate,
    lastDay: '[昨天 ]' + detailTime,
    lastWeek: weekDate,
    sameElse: 'M月D日 H:mm'
  })
}
export const formatTaskTime = (begin, end) => {
  // 如果不是今天则不显示具体时间
  if (!end && begin) {
    return relativelyTaskTime(begin) + ' 开始'
  }
  if (!begin) {
    return relativelyTaskTime(end) + ' 截止'
  }
  return relativelyTaskTime(begin) + ' - ' + relativelyTaskTime(end)
}

export const formatDate = (data, show = true) => {
  // 格式化时间
  let now = null
  if (isNaN(data)) {
    now = new Date(data * 1000)
  } else {
    now = new Date(data)
  }
  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let date = now.getDate()
  let hour = now.getHours()
  let minute = now.getMinutes()
  // let second = now.getSeconds();
  if (month < 10) {
    month = '0' + month
  }
  if (date < 10) {
    date = '0' + date
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  const finallyDate = {
    year: year,
    month: month,
    day: date,
    hour: hour,
    minute: minute
  }
  if (show) {
    return year + '-' + month + '-' + date + '   ' + hour + ':' + minute
  } else {
    return finallyDate
  }
}

/**
 *  格式化项目任务时间
 * @param beginTime
 * @param endTime
 * @returns {string}
 */
export const showTaskTime = (beginTime, endTime) => {
  let taskTime = ''
  let beginTimeFormat = ''
  let endTimeFormat = ''
  beginTime = Date.parse(new Date(beginTime)) / 1000
  endTime = Date.parse(new Date(endTime)) / 1000
  if (beginTime > 0) {
    let begin = formatDate(beginTime, false)
    beginTimeFormat = begin.month + '月' + begin.day + '日' + ' - '
  }
  if (endTime > 0) {
    let end = formatDate(endTime, false)
    endTimeFormat = end.month + '月' + end.day + '日'
    if (end.hour > 12 && end.hour <= 18) {
      endTimeFormat += ' 下午下班前'
    }
    if (end.hour > 18) {
      endTimeFormat += ' 加班'
    }
    if (end.hour <= 12 && end.hour >= 8) {
      endTimeFormat += ' 上午下班前'
    }
    if (end.hour < 8 && end.hour > 0) {
      endTimeFormat += ' 通宵'
    }
  }
  if (beginTimeFormat === '') {
    endTimeFormat += '完成'
  }
  taskTime += beginTimeFormat + endTimeFormat
  return taskTime
}
/**
 *
 * @returns {string}
 * @param time
 */
export const showHelloTime = (time) => {
  let timeFormat = ''
  if (time === undefined) {
    time = new Date()
  }
  let hr = time.getHours()
  if ((hr >= 0) && (hr <= 4)) { timeFormat = '深夜了，注意身体，' }
  if ((hr >= 4) && (hr < 7)) { timeFormat = '清晨好， ' }
  if ((hr >= 7) && (hr < 12)) { timeFormat = '早安，' }
  if ((hr >= 12) && (hr <= 13)) { timeFormat = '午饭时间到了，' }
  if ((hr >= 13) && (hr <= 17)) { timeFormat = '下午好，' }
  if ((hr >= 17) && (hr <= 18)) { timeFormat = '进入傍晚了，' }
  if ((hr >= 18) && (hr <= 20)) { timeFormat = '吃过晚饭了吗，' }
  if ((hr >= 20) && (hr <= 24)) { timeFormat = '在加班吗？辛苦了，' }
  return timeFormat
}
