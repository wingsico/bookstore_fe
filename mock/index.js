const Mock = require('mockjs'); // mockjs 导入依赖模块
const bodyParser = require('body-parser');
const { getJSONData } = require('./utils'); // 自定义工具模块


module.exports = app => {
  app.use(bodyParser.json())
  app.post('/api/user/login', (req, res) => {
    const json = getJSONData('./templates/user.json');
    res.json(Mock.mock(json));
  });
  app.get('/api/order/allOrders', (req, res) => {
    const json = getJSONData('./templates/order.json');
    res.json(Mock.mock(json));
  })
  app.post('/api/user/update', (req, res) => {
    console.log(req.body)
    res.json({
      status: 200,
      message: '修改成功!'
    })
  })
  app.post('/api/user/updatePayment', (req, res) => {
    console.log(req.body)
    res.json({
      status: 200,
      message: '修改成功!'
    })
  })
  app.get('/api/book', (req, res) => {
    const json = getJSONData('./templates/books.json');
    res.json(Object.assign(Mock.mock(json), req.query));
  })
  app.get('/api/book/recommend', (req, res) => {
    const json = getJSONData('./templates/guess.json');
    res.json(Mock.mock(json));
  })
  app.post('/api/book/detail', (req, res) => {
    const json = getJSONData('./templates/book.json');
    res.json(Mock.mock(json));
  })
  app.post('/api/commodity/allCommodity', (req, res) => {
    const json = getJSONData('./templates/goods.json');
    res.json(Mock.mock(json));
  })
};
