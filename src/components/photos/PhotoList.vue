<template>
    <div >
        <div id="slider" class="mui-slider">
            <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a @click="getimages(item.id)" :class="[item.id==0?'mui-active':'','mui-control-item']" v-for='item in cates' :key="item.id" >
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>
        <ul class="photo-list">
            <router-link :to="'/home/photoinfo/'+item.id" tag="li" v-for="item in imagesinfo" :key="item.id">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        name: "PhotoList",
        data(){
            return{
                cates:[],
                imagesinfo:[]
            }
        },mounted(){
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },methods:{
            getAllCategory(){
                this.$http.get('api/getimgcategory').then(result=>{
                    if (result.body.status == 0){

                        this.cates = result.body.message;
                        this.cates.unshift({title:"全部",id:0})
                    }
                })
            },
            getimages(cateId){
                // 根据 分类Id，获取图片列表
                this.$http.get("api/getimages/" + cateId).then(result => {
                    if (result.body.status === 0) {
                        this.imagesinfo = result.body.message;
                    }
                });

            }
        },created(){
            this.getAllCategory();
            this.getimages(0);
        }
    }
</script>

<style scoped lang="less">
    * { touch-action: pan-y; }
    .photo-list {
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0;
        li {
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;
            img {
                width: 100%;
                vertical-align: middle;
            }
            img[lazy="loading"] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .info {
                width: 100%;
                color: white;
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.4);
                max-height: 84px;
                .info-title {
                    font-size: 14px;
                }
                .info-body {
                    font-size: 13px;
                }
            }
        }
    }
</style>