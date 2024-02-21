// 封装我们的请求函数

import request from "./request";

export function getStuListApi(){
    return request({
        url: "/students",
        method: "GET"
    });
}


export function AddStuApi(data){
    return request({
        url:"/students",
        method:"post",
        data
    })
}

export function getStuByIdApi(id){
    return request({
        url: `students/${id}`,
        method: "get"
    })
}


export function deleteStuByIdApi(id){
    return request({
        url : `/students/${id}`,
        method : "DELETE",
    })
}

export function updateStuApi(id,data){
    return request({
        url: `/students/${id}`,
        method: "PUT",
        data
    })
}
