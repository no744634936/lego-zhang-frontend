import {Module} from "vuex"
import {GlobalDataProps} from "./index"


// 当前用户的数据格式
export interface UserProps{
    isLogin: boolean;
    userName?: string;
}

//Module 接收两个泛型，第一个泛型是本地这个state的类型，
//第二个泛型是全局state的类型，也就是getters的第三个参数rootState的类型，具体说明查看 template.ts 文件
//写完泛型之后，state跟rootState后面打上点之后，会自动出现个泛型里的属性
const user: Module<UserProps,GlobalDataProps>={
    state:{
        isLogin:false,
        userName:''
    },
    //修改数据的方法写在mutations里面
    mutations:{
        login:(state)=> {
            state.isLogin = true
            state.userName = 'zhang'
        },
        logout:(state)=>{
            state.isLogin = false
            state.userName = ''
        }
    },
}



export default user