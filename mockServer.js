/* eslint-disable @typescript-eslint/no-var-requires */
const jsonServer = require('json-server')
const jwt= require('jsonwebtoken')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const SECRET_KEY="123456789"
const expiresIn="2h"

const createToken=(payload)=>{
    return `Bearer ${jwt.sign(payload,SECRET_KEY,{expiresIn})}`
}

const verifyToken=(token)=>{
    return jwt.verify(token,SECRET_KEY)
}

server.use(jsonServer.bodyParser)  // bodyParser这个必须在上面，才能获取api，post过来的 req里的body的数据


// 这是我要修改的路由
// http://localhost:3000/posts  会被改成 http://localhost:3000/api/posts 
const rewriter =jsonServer.rewriter({
    "/api/*": '/$1'  
})


// 这个是我自定义的api数据的返回格式
router.render=(req,res)=>{
    console.log(req.url)

    if(req.url=="/posts"){  //如果是posts路由返回的就是下面这个格式的数据,注意是/post,不是/api/posts
        res.jsonp({
            errno: 0,
            data:{
                list: res.locals.data,  //res.locals.data 是db.json文件里的posts数组
                count: res.locals.data.length
            }
        })
    }else{
        res.jsonp({data:res.locals.data})
    }
}

//这是自己自定义的路由
server.get("/api/echo",(req,res)=>{
    console.log("test");
    res.jsonp({
        test:"123456"
    })
})

// 生成token
server.post("/api/users/loginByPhoneNumber",(req,res)=>{
    const { phoneNumber, verifyCode}=req.body
    console.log(phoneNumber, verifyCode);
    const accessToken=createToken({phoneNumber,verifyCode})


    // 这个就是返回的数据
    res.status(200).json({
        data:{token: accessToken}
    })
})
// 给server添加一个中间件，让server在正式处理路由的逻辑之前验证token是否合法
// server.use() 有两个参数 第一个参数是对应的路由，如果不添加就是对所有路由都起作用
// 这是一个中间件，
// 所有以/api/works 开头的路由都要验证token之后才能取出数据
server.use("/api/works",(req,res,next)=>{
    const ErrorResp={
        "errno":12001,
        "message":"登录校验失败"
    }

    const authHeader=req.headers.authorization
    if(authHeader===undefined){
        res.jsonp(ErrorResp)
        return // 结束不要执行try catch了
    }

    try{
        verifyToken(authHeader.split(' ')[1]) //去掉token前的Bearer 字符
        next() // 验证通过进行下一步，通过路由取出数据
    }catch(e){
        res.jsonp(ErrorResp)
    }
})



server.use(rewriter)
server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})