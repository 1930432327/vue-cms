<template>
    <div class="shopcar">
       <!--商品列表区-->
        <div class="goods-list">
            <div class="mui-card" >
                <div class="mui-card-content">
                    <div class="mui-card-content-inner clearfloat" v-for="item in goodslist">
                       <div class="car-left">
                           <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                           <img :src="item.thumb_path" alt="">
                       </div>
                        <div class="car-info">
                            <h3>{{item.title}}</h3>
                            <div class="count">
                                <span>￥{{item.sell_price}}</span>
                                <shopCarNumbox :count="item.count" :goodsid="item.id"></shopCarNumbox>
                                <a href="">刪除</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--商品结算区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="red">{{$store.getters.getGoodsSelectedCount.count}}</span> 件， 总价 <span class="red">￥{{ $store.getters.getGoodsSelectedCount.zj}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mui from "../../lib/mui/js/mui.min.js";
    import shopCarNumbox from '../subcomponents/ShopCar_numbox.vue'
    export default {
        name: "shopcar",
        mounted(){
            mui(".mui-numbox").numbox()
        },
        data(){
            return{
                goodslist:[]
            }
        },
        methods:{
            //获取购物车的参数
            getGoodsList(){
                let idArr = [];
                this.$store.state.car.forEach(item=>{
                    idArr.push(item.id)
                })
                if (idArr.length>0){
                    this.$http.get("api/goods/getshopcarlist/"+idArr.join(",")).then(result=>{
                        if (result.body.status == 0){
                            let objlist= JSON.parse(localStorage.getItem("car"));
                            if (objlist.length>0){
                                result.body.message.forEach(item=>{
                                    objlist.forEach(obj=>{
                                        if (item.id == obj.id) {
                                            item.count = obj.count;
                                        }
                                    })
                                })
                                this.goodslist = result.body.message;
                            }
                        }
                    })
                }

            },
            selectedChange(id,val){
                this.$store.commit("updateGoodsSelected",{id:id,selectd:val})
            }
        },
        created(){
            this.getGoodsList();
        },components:{
            shopCarNumbox
        }
    }
</script>

<style scoped lang="less">
    .goods-list{
        width: 100%;
        background: #eee;
        display: flex;

        .mui-card{
            width: 100%;
            padding: 5px 5px;
        }
        .mint-switch{
            display: inline-block;
            bottom: 10px;
        }
        .mui-card-content-inner{
            padding: 0px;
            width: 100%;
            border-bottom: 1px solid #ccc;
            &:last-of-type{
                border-bottom: none;
            }
        }
        .car-left{
            width: 40%;
            float: left;
            margin: 0px;
            padding: 0px;
            img{
                width: 60px;
                height: 60px;
            }
        }
        .car-info{
            width: 60%;
            float: left;
            h3{
                font-size: 14px;
            }
            .count{
                font-size: 12px;
                margin-top: 10px;
                position: relative;
                span{
                    color: red;
                    display: inline-block;
                    height: 30px;
                    line-height: 45px;
                    font-size: 12px;
                }
                .mui-numbox{
                    vertical-align: top;
                }
                a{
                    padding-left: 10px;
                    display: inline-block;
                    height: 30px;
                    line-height: 45px;
                    font-size: 12px;
                }
            }
        }

    }
    .jiesuan {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red {
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }
</style>