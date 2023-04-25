import axios from 'axios'

const user=['admin','user1','user2']

const userChange=function({commit},userId){
    axios({method:'get',url:'/api/getInfo',params:{userId}}).then((res)=>{
            if(res){
            let routes=res.data.data
            let obj={isLogin:true,userName:user[userId],userId:userId}
            commit('generateRoutes',{menu:routes,userInfo:obj})
            window.location.pathname='/'
        }
    })
}

const actions={
    userChange
}

export default actions