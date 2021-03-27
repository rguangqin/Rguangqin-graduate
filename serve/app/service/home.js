'use strict';
const Service = require('egg').Service;
class HomeService extends Service {
  async lbt() {
    const sql = 'select * from lbt';
    const data = await this.app.mysql.query(sql);
    return data;
  }
  async food() {
    const sql = 'SELECT food.id, food.title, food.image, myuser.userName FROM food, myuser WHERE food.userId = myuser.userId ORDER BY food.id LIMIT 20';
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
  async details(params) {
    const sql = `select * from food_detail where foodId=${params.foodId}`;
    const result = await this.app.mysql.query(sql);
    const data = {};
    // 点赞
    if (result[0].thumb && (result[0].thumb.indexOf(params.phone) !== -1)) data.thumb = true;
    else data.thumb = false;
    // // 收藏
    if (result[0].favorite && (result[0].favorite.indexOf(params.favorite) !== -1)) data.favorite = true;
    else data.favorite = false;
    data.description = result[0].description;
    const step1 = result[0].step.split('||');
    // 步骤
    const step = [];
    for (let i = 0; i < step1.length; i++) {
      const step3 = {};
      step3.img1 = step1[i].split('&&')[0];
      step3.describle = step1[i].split('&&')[1];
      step.push(step3);
    }
    data.step = step;
    // 细节
    data.careful = result[0].careful.split('||');
    // 食材明细
    const cailiao = [];
    const Ingredient1 = result[0].Ingredient.split('。');
    for (let i = 0; i < Ingredient1.length; i++) {
      const obj = {};
      obj.clname = Ingredient1[i].split('：')[0];
      obj.detai = Ingredient1[i].split('：')[1].split('，');
      cailiao.push(obj);
    }
    data.cailiao = cailiao;
    return data;
  }
  async search(obj) {
    const res = {};
    const bookSql = `select * from book where name='${obj.searchKey}'`;
    const bookRes = await this.app.mysql.query(bookSql);
    res.book = bookRes;
    const foodSql = `select * from food where title like '%${obj.searchKey}%'`;
    const foodRes = await this.app.mysql.query(foodSql);
    for (let i = 0; i < foodRes.length; i++) {
      const userSql = `select username from myuser where userId=${foodRes[i].userId}`;
      const userRes = await this.app.mysql.query(userSql);
      foodRes[i].userName = userRes[0].username;
    }
    res.food = foodRes;
    return res;
  }
  async dianzan(params) {
    const sql = `select thumb,favorite from food_detail where foodId=${params.foodId}`;
    const result = await this.app.mysql.query(sql);
    // 删除点赞
    if (result[0].thumb && (result[0].thumb.indexOf(params.phone) !== -1)) {
      if (!JSON.parse(params.dianzanIcon)) {
        const dianzanSql = `update food_detail set thumb='${result[0].thumb.replace(params.phone + ',', '')}' where foodId = ${params.foodId}`;
        const res = await this.app.mysql.query(dianzanSql);
        console.log('res', res);
      }// 增加点赞
    } else if (!result[0].thumb || result[0].thumb.indexOf(params.phone) === -1) {
      if (JSON.parse(params.dianzanIcon)) {
        const dianzanSql = `update food_detail set thumb='${result[0].thumb + params.phone + ','}' where foodId = ${params.foodId}`;
        const res = await this.app.mysql.query(dianzanSql);
        console.log('res', res);
      }
    }
    // 删除收藏
    if (result[0].favorite && (result[0].favorite.indexOf(params.phone) !== -1)) {
      if (!JSON.parse(params.shoucangIcon)) {
        const shoucangSql = `update food_detail set favorite='${result[0].favorite.replace(params.phone + ',', '')}' where foodId = ${params.foodId}`;
        const res = await this.app.mysql.query(shoucangSql);
        return res;
      }// 增加收藏
    } else if (!result[0].favorite || result[0].favorite.indexOf(params.phone) === -1) {
      if (JSON.parse(params.dianzanIcon)) {
        const shoucangSql = `update food_detail set favorite='${result[0].favorite + params.phone + ','}' where foodId = ${params.foodId}`;
        const res = await this.app.mysql.query(shoucangSql);
        return res;
      }
    }
  }
  async shoucang(params) {
    const sql = `select thumb,favorite from food_detail where foodId=${params.foodId}`;
    const result = await this.app.mysql.query(sql);
    // 删除收藏
    if (result[0].favorite && (result[0].favorite.indexOf(params.phone) !== -1)) {
      if (!JSON.parse(params.shoucangIcon)) {
        const shoucangSql = `update food_detail set favorite='${result[0].favorite.replace(params.phone + ',', '')}' where foodId = ${params.foodId}`;
        const res = await this.app.mysql.query(shoucangSql);
        return res;
      }// 增加收藏
    } else if (!result[0].favorite || result[0].favorite.indexOf(params.phone) === -1) {
      if (JSON.parse(params.dianzanIcon)) {
        const shoucangSql = `update food_detail set favorite='${result[0].favorite + params.phone + ','}' where foodId = ${params.foodId}`;
        const res = await this.app.mysql.query(shoucangSql);
        return res;
      }
    }
  }
  async fabucaipu(data, filePath) {
    console.log(data, filePath);
    const foodSql = `insert into food (title,userId,image) values ('${data.name}',${data.userId},'${filePath[0]}')`;
    const foodRes = await this.app.mysql.query(foodSql);
    // 处理存入数据库的数据
    const step = data.stepText.map((item, index) => filePath[index + 1] + '&&' + item).join('||');
    const ingredient = data.ingredient.filter(item => item.content).map(item => item.name + ':' + item.content).join('。');
    const carful = data.careful.split('\n').join('||');
    console.log('看是否存在', data.description, step, ingredient, carful);
    const foodDetailSql = `insert into food_detail (description,step,Ingredient,careful) values('${data.description}','${step}','${ingredient}','${carful}')`;
    const foodDetailRes = await this.app.mysql.query(foodDetailSql);
    if (foodRes.affectedRows && foodDetailRes.affectedRows) {
      return { code: 2002, info: '发布菜谱成功' };
    }
    return { coode: 4004, info: '出现错误，请重新上传菜谱' };
  }
  // 个人发布的菜单
  async menu(params) {
    console.log(params);
    const sql = `select * from food,food_detail where userId=${params.userId} and food.id = food_detail.foodId`;
    const res = await this.app.mysql.query(sql);
    console.log(res[0]);
    res.forEach(item => {
      item.thumb = item.thumb ? item.thumb.split(',') : [];
      item.favorite = item.favorite ? item.favorite.split(',') : [];
    });
    console.log(res);
    return res;
  }
  // 查看收藏的菜谱
  async favorite(data) {
    console.log(data);
    const sql = `select * from food,food_detail where favorite like '%${data.phone}%' and food.id = food_detail.foodId`;
    const res = await this.app.mysql.query(sql);
    console.log(res);
    return res;
  }
}
module.exports = HomeService;
