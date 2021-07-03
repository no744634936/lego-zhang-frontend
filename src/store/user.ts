import {Module} from "vuex"
import {GlobalDataProps} from "./index"


// 当前用户的数据格式
export interface UserProps{
    isLogin: boolean;
    userName?: string;
}


const user: Module<UserProps,GlobalDataProps>={
    state:{
        isLogin:false,
        userName:''
    },
    //修改数据地方法写在这里面
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