import request from '@/utils/request';

export function userLogin(params) {
  return request('/api/user/login', {
    method: 'POST',
    data: params,
    addToken: false,
  });
}
