import {h,resolveComponent} from 'vue'
import {createRouter,createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'

const routes=[
    {
        path:'/',
        name:'home',
        component:Home,
    },
    {
        path:'/login',
        name:'login',
        component:()=>import('../views/Login.vue'),
    },
    {
        path:'/404',
        name:'notFound',
        component:()=>import('../views/NotFound.vue'),
    },
    {
        path:'/:W+',
        component:()=>import('../views/BaseLayout.vue'),
        name:'BaseLayout',
        redirect:'/404',
        hidden:true
    }
]

const router=createRouter({
    history:createWebHistory(),
    routes
})

router.beforeEach((to,from,next)=>{
    let userId=sessionStorage.getItem('userId')
    let userMenu=JSON.parse(sessionStorage.getItem('userMenu'))
    if(to.path!=='/login'){
        if(userId&&userMenu){
            for(let item of userMenu){
                item['component']=Home
                if(item['children']!=undefined){
                    let arr=[]
                    for(let child of item.children){
                        arr.push({path:child.path.slice(1),name:child.path.slice(1),component:Home,meta:child.meta})
                    }
                    item.children=arr
                    item['component']={render:() => h(resolveComponent("router-view"))}
                }
                router.addRoute(item)
            }
            let curRoutes=router.getRoutes()
            let obj=curRoutes.find(item=>item.path===to.path)
            if(!obj&&!routes.includes(to.path)){
                next('/404')
            }else{
                if(to.path==='/404'&&to.redirectedFrom!==undefined&&curRoutes.find(item=>item.path===to.redirectedFrom.fullPath)){
                    next({path:to.redirectedFrom.fullPath,replace:true})
                }else next()
            }
        }else{
            window.sessionStorage.clear()
            next('/login')
        }
    }
    else{
        next()
    }
})

export default router