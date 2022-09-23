// 展示当前详细时间点
export function formateTime(time) {
    if (!time) return ''
    let date = new Date(time);
    // 返回当前时间
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
}