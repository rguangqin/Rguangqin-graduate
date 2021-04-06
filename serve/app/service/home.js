'use strict';
const Service = require('egg').Service;
class HomeService extends Service {
  async lbt() {
    const sql = 'select food.image,food.id,food_detail.thumbCount from food_detail,food where food.id=food_detail.foodId order by thumbCount desc limit 0,10';
    const data = await this.app.mysql.query(sql);
    return data;
  }
  async food() {
    const sql = 'SELECT food.id, food.title, food.image, myuser.userName, myuser.userId FROM food, myuser WHERE food.userId = myuser.userId ORDER BY food.id LIMIT 20';
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
    const sql1 = `select * from myuser where phone ="${userInfo.phone}"`;
    const result = await this.app.mysql.query(sql1);
    if (result[0]) return { code: '4002', info: '手机号已经注册过了哟' };
    const insertSql = `insert into myuser (userName, phone, userPwd, userPic,userSex) values ("${userInfo.phone.substring(7, 11)}", "${userInfo.phone}","${userInfo.userPwd}","http://127.0.0.1:7001/public/headPic/d48aa8b2-88f8-4e8c-843c-43a88fbdd137.png","保密")`;
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
    const sql = `select * from food,myuser,food_detail where food.id=${params.foodId} and food.userId=myuser.userId and food.id=food_detail.foodId`;
    const result = await this.app.mysql.query(sql);
    const data = result[0];
    // 是否点赞
    if (result[0].thumb && (result[0].thumb.indexOf(params.phone) !== -1)) data.thumb = true;
    else data.thumb = false;
    // 是否收藏
    if (result[0].favorite && (result[0].favorite.indexOf(params.phone) !== -1)) data.favorite = true;
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
    console.log(params);
    const sql = `select thumb,favorite,thumbCount,favoriteCount from food_detail where foodId=${params.foodId}`;
    const result = await this.app.mysql.query(sql);
    // 删除点赞
    if (result[0].thumb && (result[0].thumb.indexOf(params.phone) !== -1)) {
      if (!JSON.parse(params.dianzanIcon)) {
        const dianzanSql = `update food_detail set thumb='${result[0].thumb.replace(params.phone + ',', '')}',thumbCount=${result[0].thumbCount - 1} where foodId = ${params.foodId}`;
        const res = await this.app.mysql.query(dianzanSql);
        if (res.affectedRows === 1) return { code: 2001, info: '取消点赞成功' };
        return { code: 4004, info: '取消点赞失败' };
      }// 增加点赞
    } else if (!result[0].thumb || result[0].thumb.indexOf(params.phone) === -1) {
      if (JSON.parse(params.dianzanIcon)) {
        const thumb = result[0].thumb ? result[0].thumb : '';
        const dianzanSql = `update food_detail set thumb='${thumb + params.phone + ','}',thumbCount=${result[0].thumbCount + 1} where foodId = ${params.foodId}`;
        const res = await this.app.mysql.query(dianzanSql);
        if (res.affectedRows === 1) return { code: 2002, info: '点赞成功' };
        return { code: 4004, info: '点赞失败' };
      }
    }
  }
  async shoucang(params) {
    const sql = `select thumb,favorite,thumbCount,favoriteCount from food_detail where foodId=${params.foodId}`;
    const result = await this.app.mysql.query(sql);
    // 删除收藏
    if (result[0].favorite && (result[0].favorite.indexOf(params.phone) !== -1)) {
      if (!JSON.parse(params.shoucangIcon)) {
        const shoucangSql = `update food_detail set favorite='${result[0].favorite.replace(params.phone + ',', '')}',favoriteCount=${result[0].favoriteCount - 1} where foodId = ${params.foodId}`;
        const res = await this.app.mysql.query(shoucangSql);
        if (res.affectedRows === 1) return { code: 2001, info: '取消收藏成功' };
        return { code: 4004, info: '取消收藏失败' };
      }// 增加收藏
    } else if (!result[0].favorite || result[0].favorite.indexOf(params.phone) === -1) {
      if (JSON.parse(params.shoucangIcon)) {
        const favorite = result[0].favorite ? result[0].favorite : '';
        const shoucangSql = `update food_detail set favorite='${favorite + params.phone + ','}',favoriteCount=${result[0].favoriteCount + 1} where foodId = ${params.foodId}`;
        const res = await this.app.mysql.query(shoucangSql);
        if (res.affectedRows === 1) return { code: 2002, info: '收藏成功' };
        return { code: 4004, info: '收藏失败' };
      }
    }
  }
  async fabucaipu(data, filePath) {
    const foodSql = `insert into food (title,userId,image) values ('${data.name}',${data.userId},'${filePath[0]}')`;
    const foodRes = await this.app.mysql.query(foodSql);
    // 处理存入数据库的数据
    const step = data.stepText.map((item, index) => filePath[index + 1] + '&&' + item).join('||');
    const ingredient = data.ingredient.filter(item => item.content).map(item => item.name + ':' + item.content).join('。');
    const carful = data.careful.split('\n').join('||');
    const foodDetailSql = `insert into food_detail (description,step,Ingredient,careful) values('${data.description}','${step}','${ingredient}','${carful}')`;
    const foodDetailRes = await this.app.mysql.query(foodDetailSql);
    if (foodRes.affectedRows && foodDetailRes.affectedRows) {
      return { code: 2002, info: '发布菜谱成功' };
    }
    return { coode: 4004, info: '出现错误，请重新上传菜谱' };
  }
  // 个人发布的菜单
  async menu(params) {
    const sql = `select * from food,food_detail where userId=${params.userId} and food.id = food_detail.foodId`;
    const res = await this.app.mysql.query(sql);
    res.forEach(item => {
      item.thumb = item.thumb ? item.thumb.split(',') : [];
      item.favorite = item.favorite ? item.favorite.split(',') : [];
    });
    return res;
  }
  // 查看收藏的菜谱
  async favorite(data) {
    const sql = `select * from food,food_detail where favorite like '%${data.phone}%' and food.id = food_detail.foodId`;
    const res = await this.app.mysql.query(sql);
    res.forEach(item => {
      item.favorite = item.favorite ? item.favorite.substr(0, item.favorite.length - 1).split(',') : [];
      item.thumb = item.thumb ? item.thumb.substr(0, item.thumb.length - 1).split(',') : [];
    });
    return res;
  }
  async userinfo(data) {
    const sql = `select * from myuser where userId=${data.userId}`;
    const res = await this.app.mysql.query(sql);
    return res;
  }
  async revise(data) {
    const sql = `update myuser set userName='${data.userName}',userPic='${data.userPic}',userSex='${data.userSex}',says='${data.says}' where phone=${data.phone}`;
    const res = await this.app.mysql.query(sql);
    if (res.affectedRows === 1) {
      return { code: 2002, info: '信息修改成功' };
    }
    return { code: 4004, info: '信息修改失败' };
  }
  async bookdetail(params) {
    console.log(params);
    const bookSql = `select * from book where id=${params.id}`;
    const bookRes = await this.app.mysql.query(bookSql);
    const foodSql = `select myuser.userId,myuser.userName,food.id,food.image,food.title,food_detail.Ingredient from food,food_detail,myuser where food.title like '%${bookRes[0].name}%' and food.id=food_detail.foodId and food.userId=myuser.userId`;
    const foodRes = await this.app.mysql.query(foodSql);
    foodRes.forEach((item, index) => {
      const a = item.Ingredient.split('。').filter((_, index) => index < 2);
      foodRes[index].ingredient = a.map(item => item.split('：')[1].split('，')).toString().split(',');
    });
    console.log(foodRes);
    const data = {};
    data.book = bookRes;
    data.food = foodRes;
    return data;
  }
  async userfood(params) {
    const userSql = `select * from myuser where userId=${params.userId}`;
    const userRes = await this.app.mysql.query(userSql);
    const foodSql = `select * from food where userId=${params.userId}`;
    const foodRes = await this.app.mysql.query(foodSql);
    const countSql = `select food_detail.thumbCount,food_detail.favoriteCount from food_detail,food where food.userId=${params.userId} and food_detail.foodId=food.id`;
    const countRes = await this.app.mysql.query(countSql);
    // 计算出用户获得的所有点赞数量和收藏数量
    const count = countRes.reduce((pre, next) => {
      return { thumbCount: pre.thumbCount + next.thumbCount, favoriteCount: pre.favoriteCount + next.favoriteCount };
    });
    const resultList = {};
    resultList.userInfo = userRes[0];
    resultList.userInfo.thumbCount = count.thumbCount;
    resultList.userInfo.favoriteCount = count.favoriteCount;
    resultList.userInfo.flag = userRes[0].aeeente ? userRes[0].aeeente.indexOf(params.phone) !== -1 : false;
    resultList.foodDetail = foodRes;
    return resultList;
  }
  async unfavorite(params) {
    console.log(params);
    const foodSql = `select thumb,favorite,thumbCount,favoriteCount from food_detail where foodId=${params.foodId}`;
    const foodRes = await this.app.mysql.query(foodSql);
    const updateSql = `update food_detail set favorite='${foodRes[0].favorite.replace(params.phone + ',', '')}',favoriteCount=${foodRes[0].favoriteCount - 1} where foodId = ${params.foodId}`;
    const updateRes = await this.app.mysql.query(updateSql);
    if (updateRes.affectedRows) {
      return { code: 2001, info: '取消收藏成功' };
    }
  }
  async deletefood(params) {
    const sql1 = `delete from food where id=${params.id}`;
    const sql2 = `delete from food_detail where foodId=${params.id}`;
    const sqlRes1 = await this.app.mysql.query(sql1);
    const sqlRes2 = await this.app.mysql.query(sql2);
    if (sqlRes1.affectedRows === 1 && sqlRes2.affectedRows === 1) {
      return { code: 2001, info: '删除菜谱成功' };
    }
  }
  async aeeente(params) {
    console.log(params);
    // 为true表示添加关注，反之删除关注
    const userSql = `select * from myuser where userId=${params.userId}`;
    const result = await this.app.mysql.query(userSql);

    if (JSON.parse(params.flag)) {
      const aeeente = result[0].aeeente ? result[0].aeeente : '';
      const sql = `update myuser set aeeente='${aeeente + params.phone + ','}',aeeenteCount=${result[0].aeeenteCount + 1} where userId = ${params.userId}`;
      const res = await this.app.mysql.query(sql);
      if (res.affectedRows === 1) {
        return { code: 2001, info: '添加关注成功' };
      } return { code: 4004, info: '添加关注失败' };
    }
    const deleteSql = `update myuser set aeeente='${result[0].aeeente.replace(params.phone + ',', '')}',aeeenteCount=${result[0].aeeenteCount - 1} where userId = ${params.userId}`;
    const deleteRes = await this.app.mysql.query(deleteSql);
    if (deleteRes.affectedRows === 1) {
      return { code: 2002, info: '取消关注成功' };
    } return { code: 4004, info: '取消关注失败' };
  }
  async modifyPwd(params) {
    console.log(params);
    const sql = `select * from myuser where phone=${params.phone}`;
    const res = await this.app.mysql.query(sql);
    if (res[0].userPwd === params.nowPwd) {
      const updateSql = `update myuser set userPwd='${params.rePwd}' where phone=${params.phone}`;
      const updateRes = await this.app.mysql.query(updateSql);
      if (updateRes.affectedRows === 1) {
        return { code: 2001, info: '修改密码成功，请重新登录' };
      } return { code: 4002, info: '修改密码失败' };
    } return { code: 4001, info: '请正确输入当前密码！' };
  }
}
module.exports = HomeService;
