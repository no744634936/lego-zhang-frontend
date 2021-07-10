const loopFetchtUser=(callback)=>{

    setTimeout(()=>{

        callback('one')

        setTimeout(()=>{

            callback('two')

        },2000)

    },2000)
}

// 告诉整个测试，现在所有的timer都被jest接管了
jest.useFakeTimers()

test('test the loopFetchUser',()=>{
    const callback = jest.fn()

    loopFetchtUser(callback)
    
    // 因为要等2秒，所以callback函数还没有被调用，但是实际测试的时候不可能真等2秒
    expect (callback).not.toHaveBeenCalled()

    //先结束第一个setTimeout
    jest.runOnlyPendingTimers()

    // 测试第一个setTimeout里的内容
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('one')

    //结束第二个setTimeout
    jest.runOnlyPendingTimers()

    // 测试第二个setTimeout里的内容
    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith('two')
})



// 手动精确控制timer前进的时间
test('test the loopFetchUser2',()=>{
    const callback = jest.fn()

    loopFetchtUser(callback)
    
    // 因为要等2秒，所以callback函数还没有被调用，但是实际测试的时候不可能真等2秒
    expect (callback).not.toHaveBeenCalled()

    //首先前进1000毫秒
    jest.advanceTimersByTime(1000)// 前进1000毫秒，也就是1秒

    expect (callback).not.toHaveBeenCalled()   

    //再前进1000毫秒
    jest.advanceTimersByTime(1000)// 前进1000毫秒，也就是1秒

    // 测试第一个setTimeout里的内容
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('one')

    //直接前进2000毫秒
    jest.advanceTimersByTime(2000)

    // 测试第二个setTimeout里的内容
    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith('two')
})