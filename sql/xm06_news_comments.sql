/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2022-12-11 19:48:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for xm06_news_comments
-- ----------------------------
DROP TABLE IF EXISTS `xm06_news_comments`;
CREATE TABLE `xm06_news_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `news_id` int(11) DEFAULT NULL,
  `submit_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xm06_news_comments
-- ----------------------------
INSERT INTO `xm06_news_comments` VALUES ('1', '游客', '学到了哈哈哈', '1', '2022-11-22 16:03:16');
INSERT INTO `xm06_news_comments` VALUES ('3', '111115556', '66666666666', '1', '2022-11-22 22:49:13');
INSERT INTO `xm06_news_comments` VALUES ('6', 'hfututvty', 'ftvtjex6', '12', '2022-11-23 20:17:39');
INSERT INTO `xm06_news_comments` VALUES ('7', 'dhggcgc', '今天特别烦丰富的', '4', '2022-11-23 20:18:53');
INSERT INTO `xm06_news_comments` VALUES ('9', 'scuer', '很好！！！', '82', '2022-11-27 15:34:50');
INSERT INTO `xm06_news_comments` VALUES ('10', 'WJY', '评论测试！！！', '88', '2022-11-28 21:30:46');
INSERT INTO `xm06_news_comments` VALUES ('11', 'Secret', 'a great day', '116', '2022-11-30 22:17:39');
INSERT INTO `xm06_news_comments` VALUES ('12', 'Me', '已阅', '116', '2022-11-30 22:19:15');
INSERT INTO `xm06_news_comments` VALUES ('13', 'username', 'content~', '118', '2022-11-30 22:34:28');
INSERT INTO `xm06_news_comments` VALUES ('14', 'Opera', '当当当', '115', '2022-11-30 22:35:53');
INSERT INTO `xm06_news_comments` VALUES ('15', 'SEE', 'you', '168', '2022-11-30 22:37:28');
INSERT INTO `xm06_news_comments` VALUES ('16', '游客', '和哈哈哈哈哈哈哈哈哈哈哈哈', '168', '2022-12-02 13:20:37');
INSERT INTO `xm06_news_comments` VALUES ('17', '游客', 'ohhhh', '167', '2022-12-02 13:21:36');
INSERT INTO `xm06_news_comments` VALUES ('19', '游客', '000000000000000000', '167', '2022-12-02 13:23:22');
INSERT INTO `xm06_news_comments` VALUES ('20', '游客', '1111111111111', '168', '2022-12-02 13:58:41');
INSERT INTO `xm06_news_comments` VALUES ('21', '游客', '怎么回事啊', '168', '2022-12-02 14:01:37');
INSERT INTO `xm06_news_comments` VALUES ('22', '游客', '到底出什么事了', '166', '2022-12-02 14:02:05');
INSERT INTO `xm06_news_comments` VALUES ('23', '游客', '没问题啊又', '137', '2022-12-02 14:03:21');
INSERT INTO `xm06_news_comments` VALUES ('24', '游客', '又出问题了', '137', '2022-12-02 14:04:03');
INSERT INTO `xm06_news_comments` VALUES ('25', '游客', '时不时地出问题？？？？', '138', '2022-12-02 14:06:19');
INSERT INTO `xm06_news_comments` VALUES ('26', '游客', '嘻嘻嘻嘻嘻', '167', '2022-12-02 20:21:04');
INSERT INTO `xm06_news_comments` VALUES ('27', '游客', '我呵呵哈哈哈', '154', '2022-12-02 20:56:58');
INSERT INTO `xm06_news_comments` VALUES ('29', '游客', '没问题啊', '154', '2022-12-02 20:57:39');
INSERT INTO `xm06_news_comments` VALUES ('30', '游客', '出什么问题了？', '153', '2022-12-02 20:57:56');
INSERT INTO `xm06_news_comments` VALUES ('31', '游客', '好耶', '164', '2022-12-02 21:02:54');
INSERT INTO `xm06_news_comments` VALUES ('32', '游客', 'I see！', '160', '2022-12-02 21:30:45');
INSERT INTO `xm06_news_comments` VALUES ('33', 'BBB', '测试一下呢', '167', '2022-12-03 09:41:52');
INSERT INTO `xm06_news_comments` VALUES ('34', 'BBB', '活下去', '151', '2022-12-03 09:46:56');
INSERT INTO `xm06_news_comments` VALUES ('35', 'BBB', '芜湖沪', '155', '2022-12-03 09:49:15');
INSERT INTO `xm06_news_comments` VALUES ('36', 'BBB', '还有问题吗', '160', '2022-12-03 09:49:38');
INSERT INTO `xm06_news_comments` VALUES ('37', 'BBB', '再试一下呢', '152', '2022-12-03 09:49:54');
INSERT INTO `xm06_news_comments` VALUES ('40', 'AAABBB', '我哈哈哈哈', '83', '2022-12-04 23:45:32');
INSERT INTO `xm06_news_comments` VALUES ('41', 'AAABBB', '今日运势++', '162', '2022-12-11 13:36:36');
INSERT INTO `xm06_news_comments` VALUES ('42', 'AAABBB', '试一下~~', '222', '2022-12-11 19:46:35');
