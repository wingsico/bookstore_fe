import request from '@/utils/request';

function addBook(book) {
    return request('/api/admin/addBooks', {
        method: 'POST',
        data: book
    })
}

function getAllOrders(status) {
    return request('/api/admin/allOrders', {
        method: 'GET',
        params: {
            status
        }
    })
}

function updateStatus(orderID, status) {
    return request('/api/admin/updateStatus', {
        method: 'POST',
        data: {
            orderID,
            status
        }
    })
}

function getAllUsers() {
    return request('/api/admin/allUsers', {
        method: 'GET'
    })
}

function query(username) {
    return request('/api/admin/query', {
        method: 'POST',
        data: {
            username
        }
    })
}


export default {
    addBook,
    getAllOrders,
    updateStatus,
    getAllUsers,
    query
}