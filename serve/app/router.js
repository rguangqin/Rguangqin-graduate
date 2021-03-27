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
};
