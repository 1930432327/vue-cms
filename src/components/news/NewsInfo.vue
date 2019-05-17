<template>
    <div class="newsInfo-container">
        <h3 class='title' v-text="newsInfo.title"></h3>
        <p class='subtitle'>
            <span>发表时间: <i>{{newsInfo.add_time|formatDate}}</i></span>
            <span>点击:{{newsInfo.click}}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsInfo.content">

        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        name: "NewsInfo",
        data(){
            return{
                newsInfo:{}
            }
        },
        methods:{
            getnewsInfo(){
                this.$http.get("api/getnew/"+this.$route.params.id).then(result=>{
                    if (result.body.status == 0){
                        console.log(result.body.message[0])
                        this.newsInfo = result.body.message[0];
                    }else{
                        Toast('新闻获取失败');
                    }
                })
            }
        },created(){
            this.getnewsInfo();
        }

    }

</script>

<style lang="less" scoped>
    .newsInfo-container{
        .title{
            font-size: 14px;
            color: red;
            text-align: center;
            padding: 10px 0px;
        }
        .subtitle{
            color:  #226aff;
            >span{
                &:first-of-type{
                    padding-left: 15px;
                }
                &:nth-of-type(2){
                   float: right;
                }
            }
        }
    }
</style>