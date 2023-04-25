import router from '../router/index.js'

const generateRoutes=function(state,data){
    state.paths=[]
    for(let item of data.menu){
        let obj={path:item.path,name:item.name,children:item.children,meta:{key:item.id}}
        state.paths.push(obj)
        router.addRoute(obj)
    }
    window.sessionStorage.setItem('userId',data.userInfo.userId)
    window.sessionStorage.setItem('userMenu',JSON.stringify(state.paths))
}

const mutations={
    generateRoutes
}

export default mutations