/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2022-12-11 19:48:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for xm06_comment_reply
-- ----------------------------
DROP TABLE IF EXISTS `xm06_comment_reply`;
CREATE TABLE `xm06_comment_reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reply_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `reply` text,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xm06_comment_reply
-- ----------------------------
INSERT INTO `xm06_comment_reply` VALUES ('1', '1', '芜湖hu', '耶耶耶', '2022-11-28 21:29:52');
INSERT INTO `xm06_comment_reply` VALUES ('2', '10', 'why', '回复测试', '2022-11-28 21:32:17');
INSERT INTO `xm06_comment_reply` VALUES ('3', '3', 'testuser', '888888888hhh', '2022-11-29 19:30:37');
INSERT INTO `xm06_comment_reply` VALUES ('5', '1', '访客', 'end of journey', '2022-11-29 20:44:15');
INSERT INTO `xm06_comment_reply` VALUES ('6', '11', 'marlboro', 'last summer耶', '2022-11-30 22:18:45');
INSERT INTO `xm06_comment_reply` VALUES ('7', '11', 'Phantom', '哈哈哈哈哈哈嘿嘿嘿', '2022-11-30 22:23:39');
INSERT INTO `xm06_comment_reply` VALUES ('10', '21', '游客', '不知道说啥', '2022-12-02 16:01:35');
INSERT INTO `xm06_comment_reply` VALUES ('11', '26', '游客', '啦啦啦啦啦啦啦', '2022-12-02 20:21:19');
INSERT INTO `xm06_comment_reply` VALUES ('12', '21', 'BBB', '这个有问题吗', '2022-12-03 09:44:14');
INSERT INTO `xm06_comment_reply` VALUES ('13', '34', 'BBB', '耶耶耶', '2022-12-03 09:48:16');
INSERT INTO `xm06_comment_reply` VALUES ('14', '16', 'AAABBB', '回复测试', '2022-12-03 19:18:48');
INSERT INTO `xm06_comment_reply` VALUES ('15', '42', 'AAABBB', '回复试下', '2022-12-11 19:46:50');
