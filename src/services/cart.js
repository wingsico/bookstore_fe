import request from '@/utils/request';

/**
   * data {
   *  bookID,
   *  number,
   * }
   */
function addGood(data = {}) {
  return request('/api/commodity/addCommodities', {
    method: 'POST',
    data,
  })
}

/**
 *
 * @param {Object} data
 * data {
 *  bookID,
 *  number
 * }
 */
function updateGoodCount(data = {}) {
  return request('/api/commodity/updateNumber', {
    method: 'POST',
    data,
  })
}


/**
 * 删除商品
 * data {
 *  user_id
 * }
 */
function deleteGood(bookID = "") {
  return request('/api/commodity/deleteCommodities', {
    method: 'POST',
    data: {
      bookID,
    }
  })
}


function getCartGoods() {
  return request('/api/commodity/allCommodities', {
    method: 'POST',
  })
}

export default {
  getCartGoods,
  deleteGood,
  updateGoodCount,
  addGood,
}
