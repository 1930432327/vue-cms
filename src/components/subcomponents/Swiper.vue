<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunboList" :key="item.id">
                <a :href="item.url">
                    <img :src="item.img" alt="" :class="{'full':isfull}">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        name: "Swiper",
        props: ['lunboList', "isfull"]
    }
</script>

<style scoped lang="less">
    .mint-swipe {
        height: 200px;
        .mint-swipe-item {
            text-align: center;
            img {
                height: 100%;
            }
        }
    }

    .full {
        width: 100%;
        height: 100%;
    }
</style>