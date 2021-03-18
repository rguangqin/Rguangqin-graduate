'use strict';
// const fs = require('fs');
// const path = require('path');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async lbt() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.lbt();
  }
  async food() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.food();
  }
  async book() {
    const { ctx } = this;
    ctx.body = await this.ctx.service.home.book();
  }
  async topic() {
    const { ctx } = this;
    ctx.body = await this.ctx.service.home.topic();
  }
  async advice() {
    const { ctx } = this;
    ctx.body = await this.ctx.service.home.advice();
  }
  async register() {
    console.log(this.ctx.request.files);
    const { ctx } = this;
    if (ctx.request.files) {
      // const filename = path.basename(ctx.request.files[0].filepath);
      // const oldPath = `${ctx.request.files[0].filepath}`;
      // const newPath = `${__dirname}/../public/upload/${filename}`;
      // fs.copyFileSync(oldPath, newPath);
      // fs.unlink(oldPath, err => {
      //   if (err) console.log(err);
      // });
      // const imgUrl = `http://localhost:7001/public/upload/${filename}`;
      // ctx.request.body.userPic = imgUrl;
      const result = await ctx.service.home.register(ctx.request.body);
      console.log('result', result);
      this.ctx.body = result;
    }
  }
  async login() {
    const { ctx } = this;
    const result = await ctx.service.home.login(ctx.request.body);
    console.log('result', result);
    if (result[0]) {
      // 登录成功，通知浏览器做 cookie，
      // ctx.session.email 在整个后端任何地方都可访问，仅限同一个客户端ip
      ctx.session.email = ctx.request.body.email;
      // 返回客户端
      ctx.body = { code: '2002', info: result[0] };
    } else {
      ctx.body = { code: '4005', info: '账号或密码错误' };
    }
  }
  async details() {
    const { ctx } = this;
    console.log(ctx.request.query.foodId);
    const result = await this.ctx.service.home.details(ctx.request.query.foodId);
    ctx.body = result;
  }
}
module.exports = HomeController;
