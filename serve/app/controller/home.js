'use strict';
const fs = require('fs');
const path = require('path');
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
      this.ctx.body = result;
    }
  }
  async login() {
    const { ctx } = this;
    const result = await ctx.service.home.login(ctx.request.body);
    if (result[0]) {
      // 登录成功，通知浏览器做 cookie，
      // ctx.session.email 在整个后端任何地方都可访问，仅限同一个客户端ip
      ctx.session.email = ctx.request.body.email;
      // 返回客户端
      ctx.body = { code: '2002', info: result[0], userId: result[0].userId };
    } else {
      ctx.body = { code: '4005', info: '账号或密码错误' };
    }
  }
  async details() {
    const { ctx } = this;
    const result = await this.ctx.service.home.details(ctx.request.query);
    ctx.body = result;
  }
  async search() {
    const { ctx } = this;
    const res = await ctx.service.home.search(ctx.query);
    console.log(res);
    ctx.body = res;
  }
  async dianzan() {
    const { ctx } = this;
    const result = await ctx.service.home.dianzan(ctx.query);
    ctx.body = result;
  }
  async shoucang() {
    const { ctx } = this;
    const result = await ctx.service.home.shoucang(ctx.query);
    ctx.body = result;
  }
  async fabucaipu() {
    const { ctx } = this;
    const filePath = [];
    // 处理传递过来的图片地址
    for (const key in ctx.request.files) {
      // key为0表示为成品图
      filePath.push(dealFile(ctx.request.files[key], key === '0' ? 'food' : 'step'));
    }
    const result = await ctx.service.home.fabucaipu(JSON.parse(ctx.request.body.data), filePath);
    this.ctx.body = result;
  }
  async menu() {
    const { ctx } = this;
    const result = await ctx.service.home.menu(ctx.query);
    ctx.body = result;
  }
  async favorite() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.favorite(ctx.query);
  }
  async userinfo() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.userinfo(ctx.query);
  }
  async revise() {
    const { ctx } = this;
    const params = ctx.request.body;
    if (ctx.request.files.length) params.userPic = dealFile(ctx.request.files[0], 'headPic');
    else params.userPic = params.oldUserPic;
    ctx.body = await ctx.service.home.revise(params);
  }
}
module.exports = HomeController;

// 将图片复制当相应的文件且返回存放的地址
function dealFile(file, fileAdd) {
  const filename = path.basename(file.filepath);
  const oldPath = file.filepath;
  const nwePath = `${__dirname}/../public/${fileAdd}/${filename}`;
  fs.copyFileSync(oldPath, nwePath);
  fs.unlink(oldPath, err => {
    if (err) console.log(err);
  });
  return `http://localhost:7001/public/${fileAdd}/${filename}`;
}
