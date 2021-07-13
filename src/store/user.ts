import {Module} from "vuex"
import {GlobalDataProps} from "./index"


// 当前用户的数据格式
export interface UserProps{
    isLogin: boolean;
    userName?: string;
}

// GlobalDataProps在这里好像并没什么用啊，但是又必须要写。
const user: Module<UserProps,GlobalDataProps>={
    state:{
        isLogin:false,
        userName:''
    },
    //修改数据地方法写在这里面
    mutations:{
        login:(state,loginUserName)=> {
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