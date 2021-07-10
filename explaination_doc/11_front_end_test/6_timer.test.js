const fetchtUser=(callback)=>{
    setTimeout(()=>{

        //10秒钟过后将zhang这个参数给callback函数
        callback('zhang')

    },10000)
}

// 告诉整个测试，现在所有的timer都被jest接管了
jest.useFakeTimers()

test('test the call back after 10s',()=>{
    const callback = jest.fn()

    fetchtUser(callback)
    
    // 因为要等十秒，所以callback函数还没有被调用，但是实际测试的时候不可能真等10秒
    expect (callback).not.toHaveBeenCalled()
    
    //让所有的timer都运行完毕,不必真的等10秒
    jest.runAllTimers()

    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith('zhang')
})