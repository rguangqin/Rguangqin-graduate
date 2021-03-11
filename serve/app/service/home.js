'use strict';
const Service = require('egg').Service;
class HomeService extends Service {
  async lbt() {
    const sql = 'select * from lbt';
    const data = await this.app.mysql.query(sql);
    return data;
  }
  async food() {
    const sql = 'SELECT food.id, food.title, food.image, food.alone, myuser.userName FROM food, myuser WHERE food.userId = myuser.id ORDER BY food.id LIMIT 20';
    return await this.app.mysql.query(sql);
  }
  async book() {
    const sql = 'SELECT * FROM book ORDER BY book.id LIMIT 14';
    const data = await this.app.mysql.query(sql);
    return data;
  }
  async topic() {
    const sql1 = 'SELECT topic.id, topic.proDate, topic.article, topic.title FROM topic';
    const data1 = await this.app.mysql.query(sql1);
    const res = data1;

    const sql2 = 'SELECT topic_img.topicId, topic_img.image FROM topic_img';
    const data2 = await this.app.mysql.query(sql2);

    res.forEach(item => {
      item.content = [];
    });

    for (let i = 0; i < data2.length; i++) {
      res[data2[i].topicId - 1].content.push(data2[i].image);
    }

    const sql3 =
        'SELECT topic.id, myuser.userName, myuser.userPic FROM myuser, topic WHERE topic.userId = myuser.id';
    const data3 = await this.app.mysql.query(sql3);

    for (let i = 0; i < res.length; i++) {
      res[i].userName = data3[i].userName;
      res[i].userPic = data3[i].userPic;
    }
    return res;
  }
  async advice() {
    const sql =
        'SELECT advise_title.adviseId,advise.image,advise_title.title,advise_title.titlelink FROM advise,advise_title WHERE advise.id = advise_title.adviseId';
    const data = await this.app.mysql.query(sql);
    return data;
  }
  async register(userInfo) {
    // const { ctx } = this;
    const sql1 = `select *from myuser where email ="${userInfo.email}"`;
    const result = await this.app.mysql.query(sql1);
    console.log(result);
    if (result[0]) return { code: '4002', info: '手机号已经注册过了哟' };
    const insertSql = `insert into myuser (userSex,email, userPwd, userPic) values ("${userInfo.userSex}","${userInfo.email}","${userInfo.userPwd}","${userInfo.userPic}")`;
    const result1 = await this.app.mysql.query(insertSql);
    if (result1.affectedRows > 0) return { code: '2001', info: '注册成功' };
    return { code: '5001', info: '后台错误' };
  }
  async login(loginInfo) {
    console.log('loginInfo', loginInfo);
    const sql = `select * from myuser where email="${loginInfo.email}" and userPwd="${loginInfo.userPwd}"`;
    const result = await this.app.mysql.query(sql);
    console.log(result);
    return result;
  }
}
module.exports = HomeService;
