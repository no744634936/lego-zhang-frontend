// test callback 
// 1秒钟之后将hello 给callback函数
const fetchUser=(callback)=>{
    setTimeout(()=>{
        callback('hello')
    },1000)
}


// 异步测试使用done
test('test callback function ',(done)=>{
    fetchUser((data)=>{
        expect(data).toBe('hello')
        done()
    })
})

//promise 两种方法测试，第一种跟第二种必须要return，第三种比较好一点
const userPromise=()=>Promise.resolve('hello')
const userPromise_reject=()=>Promise.reject('error')

// 第一种方法
test('test promise',()=>{
    return userPromise().then(data=>{
       expect(data).toBe('hello')
    })
})

// 第二种方法
test('test promise2',()=>{
    return expect(userPromise()).resolves.toBe('hello')
})

test('test promise3',()=>{
    return expect(userPromise_reject()).rejects.toBe('error')
})


// 第三种方法
test('test with async',async()=>{
    const data=await userPromise()
    expect(data).toBe('hello')
})