'use strict';
const Service = require('egg').Service;
class HomeService extends Service {
  async lbt() {
    const sql = 'select * from lbt';
    const data = await this.app.mysql.query(sql);
    return data;
  }
  async food() {
    const sql = 'SELECT food.id, food.title, food.image, food.alone, myuser.userName FROM food, myuser WHERE food.userId = myuser.userId ORDER BY food.id LIMIT 20';
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
        'SELECT topic.id, myuser.userName, myuser.userPic FROM myuser, topic WHERE topic.userId = myuser.userId';
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
    const sql1 = `select *from myuser where phone ="${userInfo.phone}"`;
    const result = await this.app.mysql.query(sql1);
    if (result[0]) return { code: '4002', info: '手机号已经注册过了哟' };
    const insertSql = `insert into myuser (userName, phone, userPwd) values ("${userInfo.phone.substring(7, 11)}", "${userInfo.phone}","${userInfo.userPwd}")`;
    const result1 = await this.app.mysql.query(insertSql);
    if (result1.affectedRows > 0) return { code: '2001', info: '注册成功' };
    return { code: '5001', info: '后台错误' };
  }
  async login(loginInfo) {
    const sql = `select * from myuser where phone="${loginInfo.phone}" and userPwd="${loginInfo.userPwd}"`;
    const result = await this.app.mysql.query(sql);
    return result;
  }
  async details(Id) {
    console.log(Id);
    const sql = `select * from food_detail where foodId=${Id}`;
    const result = await this.app.mysql.query(sql);
    const data = {};
    // const step1 = [];
    data.description = result[0].description;
    // eslint-disable-next-line no-const-assign
    const step1 = result[0].step.split('||');
    // 步骤
    const step = [];
    for (let i = 0; i < step1.length; i++) {
      const step3 = {};
      step3.img1 = step1[i].split('&&')[0];
      step3.describle = step1[i].split('&&')[1];
      step.push(step3);
    }
    // 细节
    data.careful = result[0].careful.split('||');
    console.log(data.careful);

    return 'result';
  }
}
module.exports = HomeService;
