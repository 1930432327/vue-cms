// 入口文件
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
let car = JSON.parse(localStorage.getItem("car")||"[]");

const store = new Vuex.Store({
    state: {//this.$store.state
        car: car,//将购物车中的商品数据 用一个数组存起来 在car数组中 存储一些商品的对象  占时设计成{id:商品id,count:"购买数量",price:"单价",select:true}
    },
    mutations: {
        addToCar(state,goodsObj){
            //点击加入购物车
            let flag = true;
            state.car.some(item=>{
                if (item.id == goodsObj.id){
                    item.count+=parseInt(goodsObj.count);
                    flag = false;
                    return true;
                }
            })
         if (flag){
             state.car.push(goodsObj)
         }
         //当car 更新后  把他保存到  本地localStorage中去
            localStorage.setItem("car",JSON.stringify(state.car))
        },
        updateCar(state,goodsObj){
            state.car.some(item=>{
                if (item.id == goodsObj.id){
                    item.count=parseInt(goodsObj.count);
                    return true;
                }
            });
            //当car 更新后  把他保存到  本地localStorage中去
            localStorage.setItem("car",JSON.stringify(state.car))
        },
        updateGoodsSelected(state,goodsObj){
            state.car.some(item=>{
                if (item.id == goodsObj.id){
                    item.selectd = goodsObj.selectd;
                    return true;
                }
            });
            //当car 更新后  把他保存到  本地localStorage中去
            localStorage.setItem("car",JSON.stringify(state.car))
        }
    },
    getters:{//this.$store.getters.***
        // 相当于计算属性 和过滤器
        getAllCount(state){
            let c = 0;
            state.car.forEach(item =>{
                c+=item.count;
            })
            return c;
        },
        getGoodsSelected(state){
            let obj = {};
            state.car.forEach(item =>{
                obj[item.id]=item.selectd;
            })
            return obj;
        },
        getGoodsSelectedCount(state){
            let c = {
                count:0,
                zj:0
            };
            state.car.forEach(item =>{
                if (item.selectd) {
                    c.count+=item.count;
                    c.zj+=item.price*item.count;
                }
            })
            return c;
        },
    }
})

// 导入路由的包
import VueRouter from 'vue-router'
// 安装路由
Vue.use(VueRouter)

//  导入 vue-resource
import VueResource from 'vue-resource'
// 安装 vue-resource
Vue.use(VueResource)

//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/';
import 'jquery/dist/jquery.js'
//引入 Mint UI样式
import 'mint-ui/lib/style.css'
// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'


// 按需导入 Mint-UI 中的组件
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(MintUi);

/*图片预览插件*/
import VuePreview from 'vue-preview'
Vue.use(VuePreview);

import './lib/css/golbal.css'
// 1.3 导入自己的 router.js 路由模块
import router from './router.js'


// 导入 App 根组件
import app from './App.vue'

//格式化时间
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};

Vue.filter('formatDate',(date)=>{
    return new Date(date).format('yyyy-MM-dd hh:mm:ss');
})


var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router, // 1.4 挂载路由对象到 VM 实例上
    store
})