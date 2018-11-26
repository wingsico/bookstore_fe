const Mock = require('mockjs'); // mockjs 导入依赖模块
const { getJSONData } = require('./utils'); // 自定义工具模块

module.exports = app => {
  app.get('/api/user/login', (req, res) => {
    const json = getJSONData('./templates/user.json');
    res.json(Mock.mock(json));
  });
};
