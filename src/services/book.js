import request from '@/utils/request';


function getBookList({ size = 20, page = 1 }) {
  return request('/api/book', {
    method: 'GET',
    params: {
      size,
      page,
    }
  })
}

function getRecommends() {
  return request('/api/book/recommend')
}

function getBookDetail(id = "") {
  return request(`/api/book/detail`, {
    method: 'POST',
    data: {
      id,
    }
  })
}

function getClassifications() {
  return request('/api/book/classification')
}

function getClassificationBooks({ size = 20, page = 1, classification }) {
  return request('/api/book/classificationBooks', {
    method: 'GET',
    params: {
      size,
      page,
      classification,
    }
  })
}

export default {
  getBookList,
  getRecommends,
  getBookDetail,
  getClassifications,
  getClassificationBooks,
}
