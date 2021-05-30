import {createStore} from 'vuex';
import templates,{TemplatesProps} from "./template"
import user,{UserProps} from './user'



// 全局结构
export interface GlobalDataProps{
    user: UserProps;
    templates: TemplatesProps;
}


// createStore 可以接受一个泛型,将全局结构传递下去
const store=createStore<GlobalDataProps>({
    modules: {
        user,
        templates,
    }
});

export default store;