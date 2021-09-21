
export interface RespData<T> {
  errno: number;
  data: T;
  message?: string;
}
export interface ListData<T> {
  list: T[];
  count: number;
}
export type RespListData<T> = RespData<ListData<T>>


// 按照这个格式来写的 RespListData 泛型
// {
//     "errno": 0,
//     "data": {
//         "list": [
//             {
//                 "id": 72,
//                 "uuid": "bacc",
//                 "title": "樊登解读意志力-复制",
//                 "desc": "未命名作品",
//                 "contentId": "5fa128349fa7b1005c9f0541",
//                 "publishContentId": "5fa128749fa7b1005c9f0542",
//                 "author": "136****5632",
//                 "coverImg": "http://static-dev.imooc-lego.com/upload-files/screenshot-036563.png",
//                 "isTemplate": true,
//                 "status": 2,
//                 "copiedCount": 37,
//                 "latestPublishAt": "2020-11-04T01:28:16.000Z",
//                 "isHot": true,
//                 "isNew": true,
//                 "orderIndex": 0,
//                 "isPublic": true,
//                 "createdAt": "2020-11-03T09:51:48.000Z",
//                 "updatedAt": "2021-09-04T03:01:47.000Z",
//                 "user": {
//                     "userName": "136****5632",
//                     "nickName": "Viking3",
//                     "gender": 0,
//                     "picture": "http://imooc-lego-resource-dev.oss-cn-hangzhou.aliyuncs.com/logo-915499.png"
//                 }
//             },
//         ],
//         "count": 9
//     }
// }