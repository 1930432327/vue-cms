<template>
    <div>
        <!--头部区域-->
        <div class='pi-title-box'>
            <h3>{{imageInfolist.title}}</h3>
            <div class="pi-title-info">
                <span>发表时间: {{imageInfolist.add_time|formatDate}}</span>
                <span>点击 {{imageInfolist.click }}次</span>
            </div>
        </div>
        <hr>
        <!--中间图片预览区-->
        <div class="thumbs">
            <vue-preview :slides="thumimages" @close="handleClose"></vue-preview>
        </div>
        <!--内容区域-->
        <div class="content" v-html="imageInfolist.content"></div>
        <!--评论区域-->
        <Comment :id="id"></Comment>
    </div>
</template>

<script>
    import Comment from '../subcomponents/comment.vue'

    export default {
        name: "PhotoInfo",
        data() {
            return {
                id: this.$route.params.id,
                imageInfolist: {},
                thumimages: []
            }
        }, created() {
            this.getimageInfo();
            this.getthumimages();
        },
        components: {
            Comment
        }, methods: {
            //获取图片详情
            getimageInfo() {
                this.$http.get('api/getimageInfo/' + this.id).then(result => {
                    if (result.body.status == 0) {
                        this.imageInfolist = result.body.message[0];
                    }
                })
            },
            //获取详情中缩略图数组
            getthumimages() {
                this.$http.get('api/getthumimages/' + this.id).then(result => {
                    if (result.body.status == 0) {
                        result.body.message.forEach(item=>{
                            item.w = 600;
                            item.h = 400;
                            item.msrc=item.src
                        });
                        this.thumimages = result.body.message;
                    }
                })
            },
            handleClose() {
                console.log('close event')
            },
            mounted() {
                // 需要在组件的 mounted 事件钩子中，注册 mui 的 scroll 滚动事件
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .pi-title-box {
        width: 100%;
        color: #4D87EC;
        h3 {
            font-size: 14px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            padding: 10px;
        }
        .pi-title-info {
            width: 100%;
            > span {
                font-size: 12px;
                &:nth-of-type(1) {
                    text-indent: 5px;
                    padding-left: 10px;
                }
                &:nth-of-type(2) {
                    float: right;
                    padding-right: 10px;
                }
            }
        }
    }


    .content {
        font-size: 13px;
        line-height: 30px;
    }
</style>