const Mock = require('mockjs'); // mockjs 导入依赖模块
const bodyParser = require('body-parser');
const { getJSONData } = require('./utils'); // 自定义工具模块


module.exports = app => {
  app.use(bodyParser.json())
  app.post('/api/user/login', (req, res) => {
    const json = getJSONData('./templates/user.json');
    res.json(Mock.mock(json));
  });
  app.get('/api/order/list', (req, res) => {
    const json = getJSONData('./templates/order.json');
    res.json(Mock.mock(json));
  })
  app.post('/api/user/change', (req, res) => {
    console.log(req.body)
    res.json({
      status: 200,
      message: '修改成功!'
    })
  })
  app.get('/api/book/list', (req, res) => {
    const json = getJSONData('./templates/books.json');
    res.json(Object.assign(Mock.mock(json), req.query));
  })
  app.get('/api/book/:id', (req, res) => {
    const json = getJSONData('./templates/books.json');
    res.json(Mock.mock(json));
  })
};
