<template>
    <div>
        <ul class="mui-table-view">
            <li v-for="news in newsList" :key="news.id" class="mui-table-view-cell mui-media">
                <router-link :to="'/home/newsinfo/'+news.id">
                    <img class="mui-media-object mui-pull-left" :src="news.img_url">
                    <div class="mui-media-body">
                        <h3>{{news.title}}</h3>
                        <p class='mui-ellipsis'>
                            <span class="mui-pull-left">{{news.add_time|formatDate}}</span>
                            <span class="mui-pull-right">点击 {{news.click}} 次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'


    export default {
        name: "NewsList",
        data(){
            return{
                newsList:[]
            }
        },
        methods:{
            getnewsList(){
                    this.$http.get('api/getnewslist').then(result=>{
                        if (result.body.status == 0){
                            this.newsList = result.body.message;
                        }else{
                            Toast('新闻获取失败');
                        }
                    })
            }
        },created(){
            this.getnewsList();
        }
    }
</script>

<style lang="less" scoped>
.mui-media-body{
    h3{
        font-size: 14px;
    }
    .mui-ellipsis{
        font-size: 12px;
        color: #226aff;
    }
}
</style>