import VueRouter from 'vue-router'

import Home from './components/tabbar/Home.vue'
import member from './components/tabbar/member.vue'
import search from './components/tabbar/search.vue'
import shopcar from './components/tabbar/shopcar.vue'

/*新闻列表*/
import newsList from './components/news/NewsList.vue'
import newsInfo from './components/news/NewsInfo.vue'
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
        {path: '/home/newsinfo/:id', component: newsInfo}
    ],
    linkActiveClass: 'mui-active'
});

export default router;