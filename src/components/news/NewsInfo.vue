<template>
    <div class="newsInfo-container">
        <h3 class='title' v-text="newsInfo.title"></h3>
        <p class='subtitle'>
            <span>发表时间: <i>{{newsInfo.add_time|formatDate}}</i></span>
            <span>点击:{{newsInfo.click}}次</span>
        </p>
        <hr>
        <!--内容区域-->
        <div class="content" v-html="newsInfo.content">

        </div>
        <!--[评论区域-->
        <Comment-box :id="id"></Comment-box>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
        //导入评论子组件
    import Comment from '../subcomponents/comment.vue'
    export default {
        name: "NewsInfo",
        data(){
            return{
                newsInfo:{},
                id:this.$route.params.id
            }
        },
        methods:{
            getnewsInfo(){
                this.$http.get("api/getnew/"+this.$route.params.id).then(result=>{
                    if (result.body.status == 0){
                        this.newsInfo = result.body.message[0];
                    }else{
                        Toast('新闻获取失败');
                    }
                })
            }
        },created(){
            this.getnewsInfo();
        },
        components:{
           'Comment-box':Comment
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