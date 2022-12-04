/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2022-12-04 23:00:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for my_position
-- ----------------------------
DROP TABLE IF EXISTS `my_position`;
CREATE TABLE `my_position` (
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
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of my_position
-- ----------------------------
INSERT INTO `my_position` VALUES (null, 'a', null, null, '10.00', null, null, null, '39', null);
INSERT INTO `my_position` VALUES (null, 'a', null, null, '10.00', null, null, null, '40', null);
INSERT INTO `my_position` VALUES ('a', 'CNYJPY', '人民币日元', '外汇', '19.05', '2', '2022-12-04 17:33:13', '开仓', '42', null);
INSERT INTO `my_position` VALUES ('a', 'CNYJPY', '人民币日元', '外汇', '18.05', '3', '2022-12-04 17:33:20', '开仓', '43', null);
INSERT INTO `my_position` VALUES ('a', 'GBPCNY', '英镑人民币', '外汇', '9.00', '1', '2022-12-04 17:33:31', '开仓', '44', null);
INSERT INTO `my_position` VALUES ('s', 'AU0', '黄金连续', '期货', '49.72', '1', '2022-12-04 18:59:25', '开仓', '46', null);
INSERT INTO `my_position` VALUES ('s', 'AU0', '黄金连续', '期货', '479.72', '1', '2022-12-04 19:44:43', '平仓', '47', '409.72');
INSERT INTO `my_position` VALUES ('s', 'CNYJPY', '人民币日元', '外汇', '19.05', '4', '2022-12-04 19:07:14', '开仓', '49', null);
INSERT INTO `my_position` VALUES ('s', 'AU0', '黄金连续', '期货', '479.72', '1', '2022-12-04 19:44:28', '平仓', '50', '409.72');
INSERT INTO `my_position` VALUES ('s', 'CNYJPY', '人民币日元', '外汇', '19.05', '1', '2022-12-04 19:45:49', '平仓', '51', '19.05');
INSERT INTO `my_position` VALUES ('s', 'CNYJPY', '人民币日元', '外汇', '19.05', '1', '2022-12-04 19:48:02', '平仓', '52', '19.05');
INSERT INTO `my_position` VALUES ('s', 'CNYJPY', '人民币日元', '外汇', '19.05', '1', '2022-12-04 19:48:25', '平仓', '53', '19.05');
INSERT INTO `my_position` VALUES ('s', 'CNYJPY', '人民币日元', '外汇', '19.05', '1', '2022-12-04 19:49:31', '平仓', '54', '19.05');
INSERT INTO `my_position` VALUES ('s', 'CNYJPY', '人民币日元', '外汇', '19.05', '1', '2022-12-04 19:51:17', '平仓', '55', '19.05');
INSERT INTO `my_position` VALUES ('s', 'CNYJPY', '人民币日元', '外汇', '19.05', '1', '2022-12-04 19:51:44', '平仓', '56', '19.05');
INSERT INTO `my_position` VALUES ('s', 'CNYJPY', '人民币日元', '外汇', '19.05', '1', '2022-12-04 19:52:55', '平仓', '57', '19.05');
INSERT INTO `my_position` VALUES ('s', 'CNYJPY', '人民币日元', '外汇', '19.05', '1', '2022-12-04 19:53:25', '平仓', '58', '19.05');
INSERT INTO `my_position` VALUES (null, 'AU0', null, null, null, null, null, null, '59', 'null');
INSERT INTO `my_position` VALUES (null, 'AU0', null, null, null, null, null, null, '60', null);
INSERT INTO `my_position` VALUES (null, 'AU0', null, null, null, null, null, null, '61', null);
INSERT INTO `my_position` VALUES ('a', '', '', '', '3.00', '', '2022-12-04 22:19:26', '开仓', '62', 'null');
