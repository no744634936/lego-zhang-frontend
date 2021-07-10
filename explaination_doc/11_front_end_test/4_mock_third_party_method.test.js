// 手动mock ，覆盖第三方的方法，返回一些假数据
const axios = require('axios')

const  getUserName = async (id)=>{
    let result = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    return result.data.name
}

// ;(async () => {
//     let result = await getUserName(1)
//     console.log(result);   //返回的user名字为 Leanne Graham
// })()

test('test with mock module',async()=>{
    let name = await getUserName(1)
    console.log(name);  //返回的name为 Leanne Graham

    // 会发送一个真实的请求，拿到一个真实的API数据
    // 前端测试不要用真实的api来做获取测试
})


// 真正请求数据的方法是axios.get方法，所以要对它进行替换
// 注意要先导入axios，然后将axios字符串作为参数传入
// jest 就接管了axios

jest.mock('axios')

//规定get方法的返回值
axios.get.mockImplementation(()=>{
    return Promise.resolve({data:{name:'zhanghaifeng'}})
})

// 用下面这两种方法也都是可以的

// axios.get.mockReturnValue(
//     Promise.resolve({data:{name:'zhanghaifeng'}})
// )

// axios.get.mockResolvedValue({data:{name:'zhanghaifeng'}})

// axios.get.mockRejeValue({err:'未找到相关信息'})




test('test with mock module2',async()=>{
    let name = await getUserName(1)
    console.log(name);  //返回的name为 zhanghaifeng

    // 还可以拿到监控到的数据
    expect(axios.get).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledTimes(2)  // 为什么会是2呢？ 因为15行也调用了axios.get
    expect(axios.get).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users/1")
})


// 假如几个测试文件都要mock axios的话，为了不需要每次都写mock代码
// 创建一个__mocks__ 文件夹
// 创建axios.js 文件。注意要跟覆盖的第三方库的名称一样
// 查看axios.js 文件的写法
// 参看 5_mock_third_party_method2.test.js 文件