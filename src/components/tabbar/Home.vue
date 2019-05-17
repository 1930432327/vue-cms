<template>
    <div id="home">
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in lunboList" :key="item.id">
                <a :href="item.url">
                    <img :src="item.img" alt="">
                </a>
            </mt-swipe-item>
        </mt-swipe>
        <!--九宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist" tag="a" >
                    <img src="../../image/menu1(1).png" class="mui-icon mui-icon-home"></img>
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist" tag="a" >
                    <img src="../../image/menu2.png" class="mui-icon mui-icon-email"><span class="mui-badge">5</span></img>
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../image/menu3.png" class="mui-icon mui-icon-chatbubble"></img>
                    <div class="mui-media-body">商品购买</div>
                </a>
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
        }
    }
</script>

<style scoped lang="less">
    .mint-swipe {
        height: 200px;
        .mint-swipe-item {
            &:nth-child(1) {
                background: pink;
            }
            &:nth-child(2) {
                background: yellow;
            }
            &:nth-child(3) {
                background: green;
            }
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

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