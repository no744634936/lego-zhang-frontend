const axios= {
    // 意思就是相当与调用axios的get方法的时候，返回使用的是jest.fn(()=>{return Promise.resolve({data:{name:'zhanghaifeng1123'}})})
    get: jest.fn(()=>{
        return Promise.resolve({data:{name:'zhanghaifeng1123'}})
    })
}

module.exports=axios