import request from '@/utils/request'

export function addSubjectByReadyExcel(file) {
    return request({
        url: "/eduservice/subject/addSubjectByReadyExcel",
        method: 'post',
        data: file
    })
}

export function getList() {
    return request({
        url: "/eduservice/subject/getSubjectList",
        method: 'get',
    })
}