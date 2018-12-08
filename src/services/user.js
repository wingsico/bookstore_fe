import request from '@/utils/request';

function register(data = {}) {
  return request('/api/user/register', {
    method: 'POST',
    data,
  })
}

function login(params) {
  return request('/api/user/login', {
    method: 'POST',
    data: params,
  });
}


function updatePayPwd(payPwd) {
  return request('/api/user/updatePayment', {
    method: 'POST',
    data: {
      payment: payPwd,
    },
  })
}

function updateNickname(nickname) {
  return request('/api/user/update', {
    method: 'POST',
    data: {
      nickname,
    }
  })
}

function getDeposit() {
  return request('/api/user/deposit');
}


export default {
  login,
  updateNickname,
  updatePayPwd,
  getDeposit,
  register
}
