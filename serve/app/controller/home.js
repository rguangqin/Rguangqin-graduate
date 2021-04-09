'use strict';
// 用于对系统的文件及目录进行读写操作。
const fs = require('fs');
// 处理文件路径
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
    ctx.body = await this.ctx.service.home.book(ctx.query);
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
      // ctx.body = { code: '2002', info: result[0], userId: result[0].userId };
      ctx.body = { code: '2002', info: '登录成功', data1: result[0] };
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
  async bookdetail() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.bookdetail(ctx.query);
  }
  async userfood() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.userfood(ctx.query);
  }
  async unfavorite() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.unfavorite(ctx.query);
  }
  async deletefood() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.deletefood(ctx.query);
  }
  async aeeente() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.aeeente(ctx.query);
  }
  async modifyPwd() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.modifyPwd(ctx.query);
  }
  async classify() {
    this.ctx.body = await this.ctx.service.home.classify();
  }
}
// 返回的是模块对象本身，返回的是一个类
module.exports = HomeController;

// 将图片复制当相应的文件且返回存放的地址
function dealFile(file, fileAdd) {
  // 返回path的最后一个部分
  const filename = path.basename(file.filepath);
  const oldPath = file.filepath;
  // __dirname 总是指向被执行 js 文件的绝对路径
  const nwePath = `${__dirname}/../public/${fileAdd}/${filename}`;
  fs.copyFileSync(oldPath, nwePath);
  fs.unlink(oldPath, err => {
    if (err) console.log(err);
  });
  return `http://localhost:7001/public/${fileAdd}/${filename}`;
}
