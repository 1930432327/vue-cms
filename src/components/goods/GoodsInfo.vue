<template>
    <div class="goodsinfo">
        <!--商品轮播区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <Swiper :lunboList="lunboList" :isfull="false"></Swiper>
                </div>
            </div>
        </div>
        <!--小球-->
        <transition
                @before-enter="beforeenter"
                @enter="enter"
                @after-enter="afterenter"
        >
            <div class='ball' v-show="ballflag" ref="ball"></div>
        </transition>
        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfolist.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        <span>市场价格: <del>￥{{goodsinfolist.market_price}}</del> </span>
                        <span>销售价格: <i>￥{{goodsinfolist.sell_price}}</i> </span>
                    </p>
                    <p class="shopping-number">
                        购买数量:
                        <numbox @getcount="getSelectedCount" :max="goodsinfolist.stock_quantity"></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" @click="addtoShopCar" size="small">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!--商品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:&nbsp;&nbsp;{{goodsinfolist.goods_no}}</p>
                    <p>库存情况: &nbsp;&nbsp;{{goodsinfolist.stock_quantity}}</p>
                    <p>上架时间:&nbsp;&nbsp;{{goodsinfolist.add_time|formatDate}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" plain size="large" @click="goGoodsDesc">图文介绍</mt-button>
                <mt-button type="danger" plain size="large" @click="goGoodsComment">商品评论</mt-button>
            </div>
        </div>
    </div>

</template>

<script>
    import Swiper from '../subcomponents/Swiper.vue'
    import numbox from "../subcomponents/goodsinfo_numbox.vue";

    export default {
        name: "GoodsInfo",
        data() {
            return {
                id: this.$route.params.id,//商品id
                lunboList: [],//轮播图数据
                goodsinfolist: {},//商品信息
                ballflag: false,
                selectedCount: 1//保存用户选中的商品数量
            }
        },
        methods: {
            //获取轮播图数据
            getLunbotu() {
                this.$http.get('api/getthumimages/' + this.id).then(result => {
                    if (result.body.status == 0) {
                        result.body.message.forEach(item => {
                            item.img = item.src;
                        })
                        this.lunboList = result.body.message;
                    }
                })
            },
            //获取商品信息
            getGoodsinfo() {
                this.$http.get('api/goods/getinfo/' + this.id).then(result => {
                    if (result.body.status == 0) {
                        this.goodsinfolist = result.body.message[0];
                    }
                })
            },
            goGoodsDesc() {
                this.$router.push({name: 'goodsdesc', params: {id: this.id}});
            },
            goGoodsComment() {
                this.$router.push({name: 'gogoodscomment', params: {id: this.id}});
            },
            //添加到购物车
            addtoShopCar() {
                this.ballflag = !this.ballflag;
                //{id:商品id,count:"购买数量",price:"单价",select:true}
                //得到购物车对象

                let carobj = {
                    id: this.id,
                    count: this.selectedCount,
                    price: this.goodsinfolist.sell_price,
                    selectd: true
                };
                this.$store.commit('addToCar',carobj)

            },
            beforeenter(el) {
                //设置小球开始动画的起始位置
                el.style.transform = "translate(0,0)"
            },
            enter(el, done) {
                el.offsetWidth
                //表示动画 开始之后的样式 这里,可以设置小球完成动画之后的状态

                const ballPosition = this.$refs.ball.getBoundingClientRect();
                //获取小球在页面中的位置
                //得到徽标在页面中的位置
                const badgePosition = document.getElementById("badge").getBoundingClientRect();
                const xDist = (badgePosition.left - ballPosition.left);
                const yDist = (badgePosition.top - ballPosition.top) + ballPosition.height;
                console.log("x:"+xDist+"y:"+yDist)
                el.style.transform = `translate(${xDist}px, ${yDist}px)`;
                el.style.transition = "all .5s cubic-bezier(.4,-0.3,1,.68)";
                done();
            },
            afterenter(el) {
                this.ballflag = !this.ballflag;
            },
            getSelectedCount(count) {
                this.selectedCount = count;
                console.log("父组件拿到的值为:" + count);
            }
        },
        created() {
            this.getLunbotu();
            this.getGoodsinfo();
        },
        components: {
            Swiper: Swiper,
            numbox
        }
    }
</script>

<style scoped lang="less">
    .goodsinfo {
        background: #EEE;
        overflow: hidden;
    }

    .price {
        color: black;
        > span {
            &:nth-of-type(1) {
                > del {
                    color: red;
                    padding-left: 10px;
                }
            }
            &:nth-of-type(2) {
                margin-left: 10px;
                > del {
                    color: red;
                    padding-left: 15px;
                }
            }
        }
    }

    .mui-card-footer {
        display: block;
        button {
            margin: 15px 0;
        }
    }

    .ball {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 405px;
        left: 145px;
    }
</style>