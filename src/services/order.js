import request from '@/utils/request';

function list() {
  return request('/api/order/allOrders');
}

function getOrder(orderID = "") {
  return request('/api/order/findOrder', {
    method: 'post',
    data: {
      orderID,
    }
  });
}

function addOrder(bookIDs = []) {
  return request('/api/order/create', {
    method: 'post',
    data: {
      bookIDs,
    }
  });
}

function deleteOrder(orderID = "") {
  return request('/api/order/delete', {
    method: 'post',
    data: {
      orderID,
    }
  });
}

function payOrder(data = {}) {
  return request('/api/order/pay', {
    method: 'post',
    data,
  });
}

export default {
  list,
  getOrder,
  addOrder,
  deleteOrder,
  payOrder,
}
