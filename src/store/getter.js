const userId=JSON.parse(sessionStorage.getItem('userId'))
const userMenu=JSON.parse(sessionStorage.getItem('userMenu'))
const styleConfig=JSON.parse(sessionStorage.getItem('styleConfig'))

const menu=function(){
    let arr=[]
    if(userMenu&&userId!==null){
        let index=0
        for(let item of userMenu){
            if(item.children){
                for(let child of item.children){
                    child['meta']={key:child.id,subMn:item.meta.key}
                }
            }
            let obj={id:index++,name:item.name,path:item.path,children:item.children}
            arr.push(obj)
        }
    }
    return arr
}

const userInfo=function(){
    let isLogin=userId?true:false
    let userName
    if(userId===0){
        userName='admin'
    }else if(userId===1){
        userName='user1'
    }else if(userId===2){
        userName='user2'
    }
    let obj={isLogin,userId,userName}
    return obj
}

const routes=function(){
    let routesList=userMenu
    if(userMenu&&userId!==null){
        for(let item of routesList){
            item.name=item.path.slice(1)
        }
    }
    return routesList
}

const config=function(){
    let obj
    if(!styleConfig) obj={theme:false,lang:'zh'}
    else obj=styleConfig
    return obj 
}

const getters={
    routes,
    userInfo,
    menu,
    config
}

export default getters