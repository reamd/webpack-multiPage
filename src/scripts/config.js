/**
 * Created by reamd on 2017/11/22.
 */
export default {
    host: /localhost/.test(window.location.host)? `http://localhost:3000` : '/api/'
}