import request from '@/utils/request'

export function addCourse(course) {
    return request({
        url: "/eduservice/course/addChapter",
        method: 'Post',
        data: course
    })
}