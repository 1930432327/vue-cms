import VueRouter from 'vue-router'

import Home from './components/tabbar/Home.vue'
import member from './components/tabbar/member.vue'
import search from './components/tabbar/search.vue'
import shopcar from './components/tabbar/shopcar.vue'

/*新闻列表*/
import newsList from './components/news/NewsList.vue'
import newsInfo from './components/news/NewsInfo.vue'

//图片详情
import photoList from './components/photos/PhotoList.vue'
import photoInfo from './components/photos/PhotoInfo.vue'
//商品详情
import goodslist from './components/goods/GoodsList.vue'
import goodsinfo from './components/goods/GoodsInfo.vue'
import goodsdesc from './components/goods/GoodsDesc.vue'
import gogoodscomment from './components/goods/GoodsComment.vue'

let router = new VueRouter({
    routes: [
        {path: '/', redirect: '/home'},
        {
            path: '/home',
            component: Home
        },
        {path: '/member', component: member},
        {path: '/shopcar', component: shopcar},
        {path: '/search', component: search},
        {path: '/home/newslist', component: newsList},
        {path: '/home/newsinfo/:id', component: newsInfo},
        {path:"/home/photolist",component:photoList},
        {path:"/home/photoinfo/:id",component:photoInfo},
        {path:"/home/goodslist",component:goodslist},
        {path:"/home/goodsinfo/:id",component:goodsinfo},
        {path:"/home/goodsdesc/:id",component:goodsdesc,name: 'goodsdesc'},
        {path:"/home/gogoodscomment/:id",component:gogoodscomment,name: 'gogoodscomment'}
    ],
    linkActiveClass: 'mui-active'
});

export default router;