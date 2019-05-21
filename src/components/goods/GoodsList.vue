<template>
    <div class="GoodsList">
        <div class='goodsitem' v-for="item in goodsList" :key="item.id" @click="Detail(item.id)">
            <div class='goodsitem-head'>
                <img :src="item.img_url"
                     alt="">
                <h3 class="goodsitem-title">{{item.title}}</h3>
            </div>
            <div class="goodsitem-content clearfloat">
                <p><span><i>￥</i>{{item.sell_price}}</span><s><span><i>￥</i>{{item.market_price}}</span></s></p>
                <p><span>热卖中</span><span>剩{{item.stock_quantity}}件</span></p>
            </div>
        </div>
        <mt-button type="danger"  @click="loadgoods" size="large">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                pageindex:1,
                goodsList:[]
            }
        },
        created(){
            this.getgoodslist();
        },
        methods:{
            getgoodslist(){
                //获取商品列表数据
                this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
                  if (result.body.status == 0){
                      this.goodsList = this.goodsList.concat(result.body.message);
                  }
                })
            },
            loadgoods(){
                //加载更多商品
                this.pageindex++
                this.getgoodslist();
            },
            Detail(id){
                // 编程式路由跳转
                this.$router.push({ path: '/home/goodsinfo/'+id })
            }
        }

    }
</script>

<style scoped lang="less">
    .GoodsList {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-wrap:wrap ;
        padding: 7px;
        justify-content: space-between;
        > .goodsitem {
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8 #ccc;
            margin: 4px 0;

            p {
                margin: 0px;
                padding: 0px;
            }
            .goodsitem-head {
                height: 80%;
                background: white;
                img {
                    width: 100%;
                }
                h3 {
                    font-size: 13px;
                    text-align: center;
                    padding: 0px;
                    margin: 0px;
                }
            }
            .goodsitem-content {
                height: 20%;
                background: #EEECEE;
                margin: 0px;
                padding: 0px;
                > p {
                    line-height: 30px;
                    &:nth-of-type(1) {
                        >span {
                            color: red;
                            font-size: 14px;
                            font-weight: bold;
                            letter-spacing: 1px;
                            margin-left: 15px;
                        }
                        s {
                            span {
                                color:darkgray;
                                margin-left: 15px;
                                letter-spacing: 1px;
                                font-size: 14px;
                            }
                        }
                        i {
                            padding-right: 5px;
                        }
                    }
                    &:nth-of-type(2) {
                        line-height: 35px;
                        >span{
                            &:nth-of-type(1){
                                float: left;
                                margin-left: 15px;
                            }
                            &:nth-of-type(2){
                                float: right;
                                margin-right: 5px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>