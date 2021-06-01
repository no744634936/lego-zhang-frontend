import {createStore} from 'vuex';
import templates,{TemplatesProps} from "./template"
import user,{UserProps} from './user'
import editor,{EditorDataProps} from './editor'

// 全局结构
export interface GlobalDataProps{
    user: UserProps;
    templates: TemplatesProps;
    editor: EditorDataProps;
}

const store=createStore({
    modules: {
        user,
        templates,
        editor,
    }
});

export default store;