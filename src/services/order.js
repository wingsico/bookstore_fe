import request from '@/utils/request';

function list(user_id) {
  return request('/api/order/list', {
    method: 'get',
    addToken: false,
    params: {
      user_id,
    }
  });
}

export default {
  list
}
