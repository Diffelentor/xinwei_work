/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2022-11-30 11:19:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for exchanges
-- ----------------------------
DROP TABLE IF EXISTS `exchanges`;
CREATE TABLE `exchanges` (
  `exchanges_id` varchar(255) NOT NULL,
  `exchanges_name` varchar(255) DEFAULT NULL,
  `price_yesterday` varchar(255) DEFAULT NULL,
  `price_today_begin` varchar(255) DEFAULT NULL,
  `price_right_now` varchar(255) DEFAULT NULL,
  `price_high` varchar(255) DEFAULT NULL,
  `price_low` varchar(255) NOT NULL,
  `select_time` datetime NOT NULL,
  `date` varchar(255) NOT NULL,
  PRIMARY KEY (`exchanges_id`,`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of exchanges
-- ----------------------------
INSERT INTO `exchanges` VALUES ('CNYJPY', '人民币日元', '19.78', '19.76', '19.76', '19.72', '19.76', '2022-11-23 19:29:37', '2022-11-23');
INSERT INTO `exchanges` VALUES ('CNYJPY', '人民币日元', '19.47', '19.47', '19.41', '19.38', '19.41', '2022-11-24 15:44:32', '2022-11-24');
INSERT INTO `exchanges` VALUES ('CNYJPY', '人民币日元', '19.44', '19.35', '19.43', '19.31', '19.43', '2022-11-26 05:57:23', '2022-11-26');
INSERT INTO `exchanges` VALUES ('CNYJPY', '人民币日元', '19.43', '19.4', '19.22', '19.06', '19.22', '2022-11-28 21:55:26', '2022-11-28');
INSERT INTO `exchanges` VALUES ('CNYJPY', '人民币日元', '19.35', '19.25', '19.32', '19.21', '19.32', '2022-11-29 22:03:46', '2022-11-29');
INSERT INTO `exchanges` VALUES ('CNYJPY', '人民币日元', '19.42', '19.35', '19.42', '19.35', '19.42', '2022-11-30 11:15:21', '2022-11-30');
INSERT INTO `exchanges` VALUES ('DINIW', '美元指数', '107.2331', '107.1592', '107.0598', '106.8125', '107.0598', '2022-11-23 19:29:38', '2022-11-23');
INSERT INTO `exchanges` VALUES ('DINIW', '美元指数', '106.1682', '106.1258', '105.79', '105.6301', '105.79', '2022-11-24 15:44:33', '2022-11-24');
INSERT INTO `exchanges` VALUES ('DINIW', '美元指数', '106.4337', '105.8443', '106.0724', '105.6821', '106.0724', '2022-11-26 05:58:56', '2022-11-26');
INSERT INTO `exchanges` VALUES ('DINIW', '美元指数', '106.5269', '106.2293', '105.6629', '105.3134', '105.6629', '2022-11-28 21:55:26', '2022-11-28');
INSERT INTO `exchanges` VALUES ('DINIW', '美元指数', '106.7625', '106.6788', '106.6564', '106.0531', '106.6564', '2022-11-29 22:03:46', '2022-11-29');
INSERT INTO `exchanges` VALUES ('DINIW', '美元指数', '106.911', '106.8187', '106.6829', '106.5828', '106.6829', '2022-11-30 11:15:23', '2022-11-30');
INSERT INTO `exchanges` VALUES ('EURCNY', '欧元人民币', '7.3944', '7.355', '7.3865', '7.3541', '7.3865', '2022-11-23 19:29:33', '2022-11-23');
INSERT INTO `exchanges` VALUES ('EURCNY', '欧元人民币', '7.4617', '7.4424', '7.4528', '7.4382', '7.4528', '2022-11-24 15:44:29', '2022-11-24');
INSERT INTO `exchanges` VALUES ('EURCNY', '欧元人民币', '7.4696', '7.4391', '7.4492', '7.4338', '7.4492', '2022-11-26 05:57:55', '2022-11-26');
INSERT INTO `exchanges` VALUES ('EURCNY', '欧元人民币', '7.5673', '7.4458', '7.5328', '7.4112', '7.5328', '2022-11-28 21:55:26', '2022-11-28');
INSERT INTO `exchanges` VALUES ('EURCNY', '欧元人民币', '7.4583', '7.4513', '7.4112', '7.4031', '7.4112', '2022-11-29 22:03:46', '2022-11-29');
INSERT INTO `exchanges` VALUES ('EURCNY', '欧元人民币', '7.4023', '7.3924', '7.3918', '7.3861', '7.3918', '2022-11-30 11:15:23', '2022-11-30');
INSERT INTO `exchanges` VALUES ('GBPCNY', '英镑人民币', '8.5443', '8.4831', '8.5425', '8.4812', '8.5425', '2022-11-23 19:29:33', '2022-11-23');
INSERT INTO `exchanges` VALUES ('GBPCNY', '英镑人民币', '8.6508', '8.6348', '8.6397', '8.6254', '8.6397', '2022-11-24 15:44:31', '2022-11-24');
INSERT INTO `exchanges` VALUES ('GBPCNY', '英镑人民币', '8.6819', '8.6601', '8.6645', '8.6493', '8.6645', '2022-11-26 05:57:13', '2022-11-26');
INSERT INTO `exchanges` VALUES ('GBPCNY', '英镑人民币', '8.7365', '8.6555', '8.6952', '8.6207', '8.6952', '2022-11-28 21:55:26', '2022-11-28');
INSERT INTO `exchanges` VALUES ('GBPCNY', '英镑人民币', '8.6384', '8.6188', '8.6008', '8.5882', '8.6008', '2022-11-29 22:03:46', '2022-11-29');
INSERT INTO `exchanges` VALUES ('GBPCNY', '英镑人民币', '8.5697', '8.5525', '8.5562', '8.5467', '8.5562', '2022-11-30 11:15:20', '2022-11-30');
INSERT INTO `exchanges` VALUES ('HKDCNY', '港元人民币', '0.9156', '0.9129', '0.9156', '0.9124', '0.9156', '2022-11-23 19:26:57', '2022-11-23');
INSERT INTO `exchanges` VALUES ('HKDCNY', '港元人民币', '0.9168', '0.9152', '0.915', '0.913', '0.915', '2022-11-24 15:44:05', '2022-11-24');
INSERT INTO `exchanges` VALUES ('HKDCNY', '港元人民币', '0.9182', '0.9154', '0.917', '0.9149', '0.917', '2022-11-26 05:55:00', '2022-11-26');
INSERT INTO `exchanges` VALUES ('HKDCNY', '港元人民币', '0.9258', '0.9179', '0.9208', '0.9164', '0.9208', '2022-11-28 21:55:24', '2022-11-28');
INSERT INTO `exchanges` VALUES ('HKDCNY', '港元人民币', '0.9221', '0.9221', '0.9176', '0.9157', '0.9176', '2022-11-29 21:59:54', '2022-11-29');
INSERT INTO `exchanges` VALUES ('HKDCNY', '港元人民币', '0.9163', '0.9162', '0.9147', '0.9132', '0.9147', '2022-11-30 11:13:29', '2022-11-30');
INSERT INTO `exchanges` VALUES ('USDCNY', '美元人民币', '7.1591', '7.1402', '7.1576', '7.1392', '7.1576', '2022-11-23 19:26:14', '2022-11-23');
INSERT INTO `exchanges` VALUES ('USDCNY', '美元人民币', '7.1485', '7.1478', '7.1476', '7.1336', '7.1476', '2022-11-24 15:43:15', '2022-11-24');
INSERT INTO `exchanges` VALUES ('USDCNY', '美元人民币', '7.18', '7.1615', '7.1642', '7.1467', '7.1642', '2022-11-25 23:30:15', '2022-11-25');
INSERT INTO `exchanges` VALUES ('USDCNY', '美元人民币', '7.2365', '7.1642', '7.2074', '7.1642', '7.2079', '2022-11-28 23:14:02', '2022-11-28');
INSERT INTO `exchanges` VALUES ('USDCNY', '美元人民币', '7.2079', '7.2074', '7.1568', '7.1534', '7.1573', '2022-11-29 23:29:17', '2022-11-29');
INSERT INTO `exchanges` VALUES ('USDCNY', '美元人民币', '7.1568', '7.1568', '7.1445', '7.1342', '7.145', '2022-11-30 11:14:02', '2022-11-30');
