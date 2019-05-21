<!--suppress ALL -->

<template>
    <div class="comment">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入评论(最多120)" maxlength="120" v-model="content"></textarea>
        <mt-button type="primary" size="large" @click="addComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(comment,index) in commentinfolist">
                <div class="title">
                    第{{index+1}}楼 &nbsp;&nbsp; {{comment.user_name}} &nbsp; 发表时间:{{comment.add_time|formatDate}}
                </div>
                <div class="cmt-body">{{comment.content=="undefinde"||comment.content=="undefined"||comment.content==""?"此用户没有评价":comment.content}}</div>
            </div>
        </div>
        <mt-button type="danger" plain="" @click="loadmore" size="large">加载更多</mt-button>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui'
    export default {
        name: "comment",
        data(){
            return{
                pageindex:1,
                commentinfolist:[],
                content:''
            }
        },
        methods:{
            getcomment(){
                let api = 'api/getcomments/' + this.id + '?pageindex='+this.pageindex;
                this.$http.get(api).then(result=>{
                    if (result.body.status == 0){
                        this.commentinfolist = this.commentinfolist.concat(result.body.message);
                    }else{
                        Toast("获取评论失败");
                    }
                })
            },
            loadmore(){
                this.pageindex++;
                this.getcomment();
            },
            addComment(){
                let api = "api/postcomment/"+this.id;
                let content = this.content;
                if(content==null||content==""){
                    Toast("请填写评论内容");
                    return;
                }
                this.$http.post(api,{content:content},{emulateJSON:true}).then(result=>{
                    if(result.body.status == 0){
                        Toast("发表成功");
                        this.content='';
                        let cmr = {
                            user_name:"匿名用户",
                            add_time:Date.now(),
                            content:content
                        }
                        this.commentinfolist.unshift(cmr)
                    }else{
                        Toast("发表失败");
                    }
                })

            }
        },
        props: ["id"],
        created(){
            this.getcomment()
        }
    }
</script>

<style scoped lang="less">
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        padding: 10px;
        margin: 0px;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .title{
                background: #ccc;
                line-height: 30px;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
</style>