/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50739
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50739
File Encoding         : 65001

Date: 2022-12-11 19:48:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for todolist
-- ----------------------------
DROP TABLE IF EXISTS `todolist`;
CREATE TABLE `todolist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) DEFAULT NULL,
  `dead_line` varchar(50) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of todolist
-- ----------------------------
INSERT INTO `todolist` VALUES ('9', 'asdasd', null, '2022-12-03 11:09:14');
INSERT INTO `todolist` VALUES ('10', 'asdasd', null, '2022-12-03 11:09:14');
INSERT INTO `todolist` VALUES ('12', 'asdasd', 'asd', '2022-12-03 11:09:14');
INSERT INTO `todolist` VALUES ('13', 'zxzxc', '2022-12-17', '2022-12-03 11:09:14');
