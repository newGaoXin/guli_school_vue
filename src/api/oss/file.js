import request from '@/utils/request'

export function uploadFile(file) {
    return request({
        url: '/oss/file/uploadFile',
        method: 'post',
        data: file
    })
}