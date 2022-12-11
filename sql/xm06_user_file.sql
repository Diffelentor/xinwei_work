/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2022-12-11 21:15:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for xm06_user_file
-- ----------------------------
DROP TABLE IF EXISTS `xm06_user_file`;
CREATE TABLE `xm06_user_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `identity` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '普通用户',
  `balance` float(11,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of xm06_user_file
-- ----------------------------
INSERT INTO `xm06_user_file` VALUES ('1', 'AAAAA', '12345', '232@qq.com', '管理员', '1000081.00');
INSERT INTO `xm06_user_file` VALUES ('2', 'BBB', '1234', '231232@qq.com', '普通用户', '0.00');
INSERT INTO `xm06_user_file` VALUES ('3', 'AAABBB', '12345', '231232@qq.com', '管理员', '0.00');
INSERT INTO `xm06_user_file` VALUES ('4', 'asdasd', 'dad32', '231232@qq.com', '管理员', '0.00');
INSERT INTO `xm06_user_file` VALUES ('5', 'ccccc', '12345', '123@gmail.com', '普通用户', '0.00');
