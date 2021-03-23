import request from '@/utils/request'

export function teacherList(current, limit, teacherQuery) {
    return request({
        url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
        method: 'post',
        data: teacherQuery
    })
}

export function teacherAll() {
    return request({
        url: '/eduservice/teacher/findAll',
        method: 'get',
        // data: 
    })
}


export function deleteTeacherById(id) {
    return request({
        url: `/eduservice/teacher/delete/${id}`,
        method: 'delete',
    })
}

export function addTeacher(teacher) {
    return request({
        url: "/eduservice/teacher/addTeacher",
        method: 'post',
        data: teacher
    })
}

export function updateTeacher(data) {
    return request({
        url: "/eduservice/teacher/updateTeacher",
        method: 'post',
        data: data
    })
}