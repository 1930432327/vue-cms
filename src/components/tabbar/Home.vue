<template>
    <div id="home">
        <Swiper :lunboList="lunboList" :isfull="true"></Swiper>
        <!--九宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist" tag="a" >
                    <img src="../../image/menu1(1).png" class="mui-icon mui-icon-home"></img>
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist" tag="a" >
                    <img src="../../image/menu2.png" class="mui-icon mui-icon-email"><span class="mui-badge">5</span></img>
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <img src="../../image/menu3.png" class="mui-icon mui-icon-chatbubble"></img>
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../image/menu4.png" class="mui-icon mui-icon-location"></img>
                <div class="mui-media-body">留言反馈</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../image/menu5.png" class="mui-icon mui-icon-search"></img>
                <div class="mui-media-body">视屏专区</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../image/menu6.png" class="mui-icon mui-icon-phone"></img>
                <div class="mui-media-body">联系我们</div>
            </a></li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import Swiper from '../subcomponents/Swiper.vue'
    export default {
        name: "Home",
        data() {
            return {
                lunboList: []
            }
        },
        methods: {
            //获取需要轮播的图片
            getLunbotu() {
                this.$http.get('api/getlunbo').then(result => {
                    result = result.body;
                    if (result.status == 0) {
                        this.lunboList = result.message;
                    } else {
                        Toast('加载轮播图失败')
                    }
                })
            }
        },
        created() {
            this.getLunbotu();
        },
        components:{
            Swiper:Swiper
        }
    }
</script>

<style scoped lang="less">


    .mui-grid-view.mui-grid-9 {
        background: white;
        img {
            height: 60px;
            width: 60px;
        }
        .mui-media-body {
            font-size: 13px;
        }
    }
</style>