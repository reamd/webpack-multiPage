/**
 * Created by reamd on 2017/11/10.
 */
import '../styles/common.scss'
import $ from 'jquery'
import config from './config'

let renderUI = data => {
    return `
        <li>任务ID：${data[0].TaskID}</li>
        <li>任务题目：${data[0].TaskTitle}</li>
        <li>创建日期：${data[0].CreateDate}</li>
    `
}
let host = config.host
$.ajax({
    type: 'get',
    url: host + '/GetClassTaskList',
    data: {
        userId: '123'
    },
    dataType: 'json',
    success: function (res) {
        console.log(res)
        if(res.Success) {
            let tpl = renderUI(res.Data)
            $('.main ul').html(tpl)
        }
    },
    error: function (err) {

    }
})