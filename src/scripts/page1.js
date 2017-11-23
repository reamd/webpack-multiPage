/**
 * Created by reamd on 2017/11/10.
 */
import '../styles/page1.scss'
// import img1 from '../img/001.png'

export default class {
    constructor () {
        $('.page1').html('page1')
    }

    attachEvent () {
        $('.page1').on('click', function () {
            console.log(111111111)
            // new Image().src = img1
        })
    }
}