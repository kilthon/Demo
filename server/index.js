const Koa=require('koa')
const Router=require('koa-router')

let app=new Koa()
let router=new Router()

const adminAuth=[
    {id:0,name:'admin权限1',path:'/admin1'},
    {
        id:1,
        name:'admin权限2',
        path:'/admin2',
        children:[
            {id:'c21',name:'我是admin子权限c21',path:'/adminc21'},
            {id:'c22',name:'我是admin子权限c22',path:'/adminc22'},
            {id:'c23',name:'我是admin子权限c23',path:'/adminc23'},
        ]
    },
    {id:2,name:'admin权限3',path:'/admin3'},
    {id:3,name:'admin权限4',path:'/admin4'},
    {id:4,name:'admin权限5',path:'/admin5'},
    {id:5,name:'admin权限6',path:'/admin6'},
    {id:6,name:'admin权限7',path:'/admin7'},
    {id:7,name:'admin权限8',path:'/admin8'},
    {id:8,name:'admin权限9',path:'/admin9'},
    {id:9,name:'admin权限10',path:'/admin10'},
]

const user1Auth=[
    {id:0,name:'user1权限1',path:'/u1A1'},
    {id:1,name:'user1权限2',path:'/u1A2'},
    {id:2,name:'user1权限3',path:'/u1A3'},
    {id:3,name:'user1权限4',path:'/u1A4'},
    {id:4,name:'user1权限5',path:'/u1A5'},
    {id:5,name:'user1权限6',path:'/u1A6'},
    {id:6,name:'user1权限7',path:'/u1A7'},
]

const user2Auth=[
    {id:0,name:'user2权限1',path:'/u2A1'},
    {id:1,name:'user2权限2',path:'/u2A2'},
    {id:2,name:'user2权限3',path:'/u2A3'},
    {id:3,name:'user2权限4',path:'/u2A4'},
    {id:4,name:'user2权限5',path:'/u2A5'},
    {id:5,name:'user2权限6',path:'/u2A6'},
    {id:6,name:'user2权限7',path:'/u2A7'},
]

router.get('/',function(ctx,next){
    ctx.body=`<h1>hello</h1>`
})
router.get('/api/getInfo',(ctx)=>{
    let req_query=ctx.request.query
    console.log(req_query)
    if(req_query.userId==0){
        ctx.response.body={code:'success',data:adminAuth}
    }else if(req_query.userId==1){
        ctx.response.body={code:'success',data:user1Auth}
    }else if(req_query.userId==2){
        ctx.response.body={code:'success',data:user2Auth}
    }
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(9099,()=>{
    console.log('server is working at 9099...')
})