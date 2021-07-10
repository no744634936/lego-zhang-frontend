const axios = require('axios')

const  getUserName = async (id)=>{
    let result = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    return result.data.name
}


test('test with mock module2',async()=>{
    let name = await getUserName(1)
    console.log(name);  //返回的name为 zhanghaifeng1123

    // 还可以拿到监控到的数据
    expect(name).toBe('zhanghaifeng1123')
    expect(axios.get).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledTimes(1) 
    expect(axios.get).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users/1")
})



// 很多个test都要用到 axios.get方法且要求返回值不一样的时候怎么办呢？