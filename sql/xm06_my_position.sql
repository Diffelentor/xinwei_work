/*
Navicat MySQL Data Transfer

Source Server         : remote
Source Server Version : 50151
Source Host           : www.ylxteach.net:3366
Source Database       : yjykfsj2022

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2022-12-11 21:29:23
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for xm06_my_position
-- ----------------------------
DROP TABLE IF EXISTS `xm06_my_position`;
CREATE TABLE `xm06_my_position` (
  `user_name` varchar(255) DEFAULT NULL,
  `futures_id` varchar(255) NOT NULL,
  `futures_name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `price_bought` float(20,2) DEFAULT NULL,
  `amount` varchar(255) DEFAULT NULL,
  `select_time` datetime DEFAULT NULL,
  `forward` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `price_sale` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xm06_my_position
-- ----------------------------
INSERT INTO `xm06_my_position` VALUES ('a', 'CNYJPY', '人民币日元', '外汇', '9.05', '2', '2022-09-01 01:23:56', '开仓', '42', 'null');
INSERT INTO `xm06_my_position` VALUES ('a', 'CNYJPY', '人民币日元', '外汇', '18.05', '3', '2012-12-04 17:33:20', '开仓', '43', null);
INSERT INTO `xm06_my_position` VALUES ('a', 'GBPCNY', '英镑人民币', '外汇', '9.00', '1', '2022-12-04 17:33:31', '开仓', '44', null);
INSERT INTO `xm06_my_position` VALUES ('a', 'sh600048', '保利发展', '股票', '16.15', '3', '2022-12-05 13:43:08', '开仓', '63', null);
INSERT INTO `xm06_my_position` VALUES ('a', 'sh600048', '保利发展', '股票', '16.15', '1', '2022-12-05 13:43:28', '平仓', '64', '16.15');
INSERT INTO `xm06_my_position` VALUES ('a', 'SC2301', '原油2301', '期货', '558.60', '4', '2022-12-05 19:35:15', '开仓', '65', null);
INSERT INTO `xm06_my_position` VALUES ('a', 'SC2301', '原油2301', '期货', '530.30', '2', '2022-12-06 23:20:48', '开仓', '66', null);
INSERT INTO `xm06_my_position` VALUES ('s', 'SC2301', '原油2301', '期货', '511.70', '1', '2022-12-11 16:55:26', '平仓', '68', '496.3');
