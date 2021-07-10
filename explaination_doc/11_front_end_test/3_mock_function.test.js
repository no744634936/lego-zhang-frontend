// 创建mock function 在测试中使用，用来测试回调函数

function mockTest(shouldCall,call_back){
    let result=22+20

    if(shouldCall){
        return call_back(result)  // 将42传给call_back函数
    }
}


// 测试上面的call_back函数是否被调用，参数是什么，结果是什么之类的
test('test with mock function',()=>{
    //将jest.fn() 看成是一个监听器，主要是收集有关函数调用的信息
    //用来验证是否调用了函数，参数是什么，return的结果是什么
    const mockCb=jest.fn()
    // 将mockCb作为call_back函数传进需要测试的函数里
    mockTest(true,mockCb)

    expect(mockCb).toHaveBeenCalled()  //又被调用
    expect(mockCb).toHaveBeenCalledWith(42) // callback的参数为42
    expect(mockCb).toHaveBeenCalledTimes(1) // callback函数被调用了一次

    // mockCb这个函数上有一些属性很好用
    console.log(mockCb.mock.calls); // 每次call_back被执行时的参数是什么[[42]]
    console.log(mockCb.mock.results);  // 查看call_back 函数的返回值，这里为undefined 
    
})

test('test  mock with implementation',()=>{
    const mockCb=jest.fn((x)=>{
        return x*2
    })
    // 将mockCb作为call_back函数传进需要测试的函数里
    mockTest(true,mockCb)
    // 查看call_back 函数也就是mockCb的返回值，这里为84，因为 result*2 等于84
    console.log(mockCb.mock.results);
})


test('test  mock return value',()=>{

    // 可以直接指定要return的值
    const mockCb=jest.fn().mockReturnValue(20)

    // 将mockCb作为call_back函数传进需要测试的函数里
    mockTest(true,mockCb)

    // 查看call_back 函数也就是mockCb的返回值，这里为20
    console.log(mockCb.mock.results);  
    
})