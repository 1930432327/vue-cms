<template>
    <div class="goods-desc">
        <h3>{{descList.title}}</h3>
        <hr>
        <div class="goods-content" v-html="descList.content">

        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsDesc",
        data(){
            return{
                descList:{}
            }
        },
        methods:{
          getdesc(){
              this.$http.get('api/goods/getdesc/'+this.$route.params.id).then(result=>{
                    if (result.body.status == 0){
                        this.descList = result.body.message[0];
                    }
              })
          }
        },
        created(){
            this.getdesc();
        }
    }
</script>

<style lang="less">
    .goods-desc{
        padding: 4px;
        h3{
            text-align: center;
            font-size: 16px;
            color: #41A5EE;
            line-height: 30px;
            margin: 15px 0;
        }
        .goods-content{
            img{
                width: 100%;
            }
            td>img{
                width: 165px;
            }
        }
    }
</style>