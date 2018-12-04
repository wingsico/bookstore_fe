import request from '@/utils/request';

function login(params) {
  return request('/api/user/login', {
    method: 'POST',
    data: params,
  });
}

function updateUserPwd(userPwd) {
  return request('/api/user/change', {
    method: 'POST',
    data: {
      userPwd,
    }
  })
}

function updatePayPwd(payPwd) {
  return request('/api/user/change', {
    method: 'POST',
    data: {
      payPwd,
    },
  })
}

function updateNickname(nickname) {
  return request('/api/user/change', {
    method: 'POST',
    data: {
      nickname,
    }
  })
}

function getBookList({ pageSize = 20, page = 1 }) {
  return request('/api/book/list', {
    method: 'GET',
    params: {
      pageSize,
      page,
    }
  })
}

export default {
  login,
  updateNickname,
  updatePayPwd,
  updateUserPwd,
  getBookList
}
