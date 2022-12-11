/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2022-12-11 21:15:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for xm06_complain_file
-- ----------------------------
DROP TABLE IF EXISTS `xm06_complain_file`;
CREATE TABLE `xm06_complain_file` (
  `complain_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `question` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `answer` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `question_time` datetime DEFAULT NULL,
  `answer_time` datetime DEFAULT NULL,
  PRIMARY KEY (`complain_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of xm06_complain_file
-- ----------------------------
INSERT INTO `xm06_complain_file` VALUES ('1', 'aaaaa', '好菜啊aaa', '您说的对', '2022-12-04 17:41:10', '2022-12-04 17:41:14');
INSERT INTO `xm06_complain_file` VALUES ('2', '', 'sdasdasdas', 'sdasdsad', null, null);
INSERT INTO `xm06_complain_file` VALUES ('8', '', '实打实大苏打撒', null, null, null);
INSERT INTO `xm06_complain_file` VALUES ('10', 'BBB', '踩踩踩', null, null, null);
INSERT INTO `xm06_complain_file` VALUES ('11', 'BBB', '哇达娃强大强大', null, null, null);
