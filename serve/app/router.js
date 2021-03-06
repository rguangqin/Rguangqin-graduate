'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 登录
  router.post('/login', controller.home.login);
  // 注册
  router.post('/register', controller.home.register);
  // 轮播图
  router.get('/lbt', controller.home.lbt);
  // 菜谱
  router.get('/food', controller.home.food);
  // 时令食材
  router.get('/book', controller.home.book);
  // 话题
  router.get('/topic', controller.home.topic);
  // advice 健康 烘焙 为您推荐
  router.get('/advice', controller.home.advice);
  // 菜谱详情部分
  router.get('/details', controller.home.details);
  // 搜索
  router.get('/search', controller.home.search);
  // 点赞
  router.get('/dianzan', controller.home.dianzan);
  // 收藏
  router.get('/shoucang', controller.home.shoucang);
  // 发布菜谱
  router.post('/fabucaipu', controller.home.fabucaipu);
  // 个人发布的作品
  router.get('/menu', controller.home.menu);
  // 收藏的菜谱
  router.get('/favorite', controller.home.favorite);
  // 查询个人信息
  router.get('/userinfo', controller.home.userinfo);
  // 修改个人信息
  router.post('/revise', controller.home.revise);
  // 获取食材的做法
  router.get('/bookdetail', controller.home.bookdetail);
  // 获取某个用户发表的菜谱
  router.get('/userfood', controller.home.userfood);
  // 取消收藏
  router.get('/unfavorite', controller.home.unfavorite);
  // 删除发布的菜谱
  router.get('/deletefood', controller.home.deletefood);
  // 关注
  router.get('/aeeente', controller.home.aeeente);
  // 修改密码
  router.get('/modifyPwd', controller.home.modifyPwd);
  // 菜谱的分类
  router.get('/classify', controller.home.classify);
};
