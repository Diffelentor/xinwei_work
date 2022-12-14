/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2022-12-11 20:14:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for xm06_exchanges
-- ----------------------------
DROP TABLE IF EXISTS `xm06_exchanges`;
CREATE TABLE `xm06_exchanges` (
  `exchanges_id` varchar(255) NOT NULL,
  `exchanges_name` varchar(255) DEFAULT NULL,
  `price_yesterday` varchar(255) DEFAULT NULL,
  `price_today_begin` varchar(255) DEFAULT NULL,
  `price_right_now` varchar(255) DEFAULT NULL,
  `price_high` varchar(255) DEFAULT NULL,
  `price_low` varchar(255) DEFAULT NULL,
  `select_time` datetime DEFAULT NULL,
  `date` varchar(255) NOT NULL,
  PRIMARY KEY (`exchanges_id`,`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xm06_exchanges
-- ----------------------------
INSERT INTO `xm06_exchanges` VALUES ('CNYJPY', '人民币日元', '19.78', '19.76', '19.76', '19.72', '19.76', '2022-11-23 19:29:37', '2022-11-23');
INSERT INTO `xm06_exchanges` VALUES ('CNYJPY', '人民币日元', '19.47', '19.47', '19.41', '19.38', '19.41', '2022-11-24 15:44:32', '2022-11-24');
INSERT INTO `xm06_exchanges` VALUES ('CNYJPY', '人民币日元', '19.44', '19.35', '19.43', '19.31', '19.43', '2022-11-26 05:57:23', '2022-11-26');
INSERT INTO `xm06_exchanges` VALUES ('CNYJPY', '人民币日元', '19.43', '19.4', '19.22', '19.06', '19.22', '2022-11-28 21:55:26', '2022-11-28');
INSERT INTO `xm06_exchanges` VALUES ('CNYJPY', '人民币日元', '19.35', '19.25', '19.32', '19.21', '19.32', '2022-11-29 22:03:46', '2022-11-29');
INSERT INTO `xm06_exchanges` VALUES ('CNYJPY', '人民币日元', '19.72', '19.35', '19.72', '19.35', '19.72', '2022-11-30 23:06:11', '2022-11-30');
INSERT INTO `xm06_exchanges` VALUES ('CNYJPY', '人民币日元', '19.46', '19.46', '19.28', '19.19', '19.28', '2022-12-01 22:02:02', '2022-12-01');
INSERT INTO `xm06_exchanges` VALUES ('CNYJPY', '人民币日元', '19.2', '19.2', '19.09', '19.01', '19.09', '2022-12-02 21:25:01', '2022-12-02');
INSERT INTO `xm06_exchanges` VALUES ('CNYJPY', '人民币日元', '19.32', '19.2', '19.04', '19.01', '19.04', '2022-12-03 05:57:49', '2022-12-03');
INSERT INTO `xm06_exchanges` VALUES ('CNYJPY', '人民币日元', '19.47', '19.13', '19.47', '19.08', '19.47', '2022-12-05 20:34:00', '2022-12-05');
INSERT INTO `xm06_exchanges` VALUES ('CNYJPY', '人民币日元', '19.63', '19.62', '19.63', '19.57', '19.63', '2022-12-06 15:16:10', '2022-12-06');
INSERT INTO `xm06_exchanges` VALUES ('CNYJPY', '人民币日元', '19.72', '19.57', '19.6', '19.54', '19.6', '2022-12-07 22:39:58', '2022-12-07');
INSERT INTO `xm06_exchanges` VALUES ('CNYJPY', '人民币日元', '19.63', '19.6', '19.55', '19.49', '19.55', '2022-12-09 14:44:13', '2022-12-09');
INSERT INTO `xm06_exchanges` VALUES ('CNYJPY', '人民币日元', '19.65', '19.6', '19.63', '19.48', '19.63', '2022-12-10 05:57:55', '2022-12-10');
INSERT INTO `xm06_exchanges` VALUES ('DINIW', '美元指数', '107.2331', '107.1592', '107.0598', '106.8125', '107.0598', '2022-11-23 19:29:38', '2022-11-23');
INSERT INTO `xm06_exchanges` VALUES ('DINIW', '美元指数', '106.1682', '106.1258', '105.79', '105.6301', '105.79', '2022-11-24 15:44:33', '2022-11-24');
INSERT INTO `xm06_exchanges` VALUES ('DINIW', '美元指数', '106.4337', '105.8443', '106.0724', '105.6821', '106.0724', '2022-11-26 05:58:56', '2022-11-26');
INSERT INTO `xm06_exchanges` VALUES ('DINIW', '美元指数', '106.5269', '106.2293', '105.6629', '105.3134', '105.6629', '2022-11-28 21:55:26', '2022-11-28');
INSERT INTO `xm06_exchanges` VALUES ('DINIW', '美元指数', '106.7625', '106.6788', '106.6564', '106.0531', '106.6564', '2022-11-29 22:03:46', '2022-11-29');
INSERT INTO `xm06_exchanges` VALUES ('DINIW', '美元指数', '106.911', '106.8187', '106.5717', '106.2404', '106.5717', '2022-11-30 23:06:10', '2022-11-30');
INSERT INTO `xm06_exchanges` VALUES ('DINIW', '美元指数', '106.0362', '105.9998', '105.0468', '104.8437', '105.0468', '2022-12-01 22:02:02', '2022-12-01');
INSERT INTO `xm06_exchanges` VALUES ('DINIW', '美元指数', '104.8861', '104.7049', '104.518', '104.3662', '104.518', '2022-12-02 21:25:02', '2022-12-02');
INSERT INTO `xm06_exchanges` VALUES ('DINIW', '美元指数', '105.6051', '104.7049', '104.5098', '104.3662', '104.5098', '2022-12-03 05:58:59', '2022-12-03');
INSERT INTO `xm06_exchanges` VALUES ('DINIW', '美元指数', '104.7844', '104.6217', '104.4361', '104.1097', '104.4361', '2022-12-05 20:34:05', '2022-12-05');
INSERT INTO `xm06_exchanges` VALUES ('DINIW', '美元指数', '105.5051', '105.3054', '105.4226', '105.0191', '105.4226', '2022-12-06 15:16:10', '2022-12-06');
INSERT INTO `xm06_exchanges` VALUES ('DINIW', '美元指数', '105.8289', '105.5684', '105.0028', '104.8686', '105.0028', '2022-12-07 22:39:58', '2022-12-07');
INSERT INTO `xm06_exchanges` VALUES ('DINIW', '美元指数', '104.8714', '104.8196', '104.5928', '104.4795', '104.5928', '2022-12-09 14:44:14', '2022-12-09');
INSERT INTO `xm06_exchanges` VALUES ('DINIW', '美元指数', '105.1932', '104.8196', '104.9257', '104.4745', '104.9257', '2022-12-10 05:58:57', '2022-12-10');
INSERT INTO `xm06_exchanges` VALUES ('EURCNY', '欧元人民币', '7.3944', '7.355', '7.3865', '7.3541', '7.3865', '2022-11-23 19:29:33', '2022-11-23');
INSERT INTO `xm06_exchanges` VALUES ('EURCNY', '欧元人民币', '7.4617', '7.4424', '7.4528', '7.4382', '7.4528', '2022-11-24 15:44:29', '2022-11-24');
INSERT INTO `xm06_exchanges` VALUES ('EURCNY', '欧元人民币', '7.4696', '7.4391', '7.4492', '7.4338', '7.4492', '2022-11-26 05:57:55', '2022-11-26');
INSERT INTO `xm06_exchanges` VALUES ('EURCNY', '欧元人民币', '7.5673', '7.4458', '7.5328', '7.4112', '7.5328', '2022-11-28 21:55:26', '2022-11-28');
INSERT INTO `xm06_exchanges` VALUES ('EURCNY', '欧元人民币', '7.4583', '7.4513', '7.4112', '7.4031', '7.4112', '2022-11-29 22:03:46', '2022-11-29');
INSERT INTO `xm06_exchanges` VALUES ('EURCNY', '欧元人民币', '7.4023', '7.3924', '7.342', '7.3249', '7.342', '2022-11-30 23:06:11', '2022-11-30');
INSERT INTO `xm06_exchanges` VALUES ('EURCNY', '欧元人民币', '7.4221', '7.3788', '7.4152', '7.3537', '7.4152', '2022-12-01 22:02:02', '2022-12-01');
INSERT INTO `xm06_exchanges` VALUES ('EURCNY', '欧元人民币', '7.428', '7.4048', '7.3988', '7.3845', '7.3988', '2022-12-02 21:24:56', '2022-12-02');
INSERT INTO `xm06_exchanges` VALUES ('EURCNY', '欧元人民币', '7.4375', '7.4048', '7.4361', '7.3366', '7.4361', '2022-12-03 05:57:29', '2022-12-03');
INSERT INTO `xm06_exchanges` VALUES ('EURCNY', '欧元人民币', '7.425', '7.4029', '7.34', '7.3231', '7.34', '2022-12-05 20:34:05', '2022-12-05');
INSERT INTO `xm06_exchanges` VALUES ('EURCNY', '欧元人民币', '7.334', '7.3037', '7.331', '7.3008', '7.331', '2022-12-06 15:16:08', '2022-12-06');
INSERT INTO `xm06_exchanges` VALUES ('EURCNY', '欧元人民币', '7.3568', '7.3189', '7.3303', '7.2937', '7.3303', '2022-12-07 22:39:57', '2022-12-07');
INSERT INTO `xm06_exchanges` VALUES ('EURCNY', '欧元人民币', '7.367', '7.3516', '7.3593', '7.3463', '7.3593', '2022-12-09 14:44:13', '2022-12-09');
INSERT INTO `xm06_exchanges` VALUES ('EURCNY', '欧元人民币', '7.367', '7.3516', '7.3297', '7.3182', '7.3297', '2022-12-10 05:57:54', '2022-12-10');
INSERT INTO `xm06_exchanges` VALUES ('GBPCNY', '英镑人民币', '8.5443', '8.4831', '8.5425', '8.4812', '8.5425', '2022-11-23 19:29:33', '2022-11-23');
INSERT INTO `xm06_exchanges` VALUES ('GBPCNY', '英镑人民币', '8.6508', '8.6348', '8.6397', '8.6254', '8.6397', '2022-11-24 15:44:31', '2022-11-24');
INSERT INTO `xm06_exchanges` VALUES ('GBPCNY', '英镑人民币', '8.6819', '8.6601', '8.6645', '8.6493', '8.6645', '2022-11-26 05:57:13', '2022-11-26');
INSERT INTO `xm06_exchanges` VALUES ('GBPCNY', '英镑人民币', '8.7365', '8.6555', '8.6952', '8.6207', '8.6952', '2022-11-28 21:55:26', '2022-11-28');
INSERT INTO `xm06_exchanges` VALUES ('GBPCNY', '英镑人民币', '8.6384', '8.6188', '8.6008', '8.5882', '8.6008', '2022-11-29 22:03:46', '2022-11-29');
INSERT INTO `xm06_exchanges` VALUES ('GBPCNY', '英镑人民币', '8.5697', '8.5525', '8.4811', '8.4804', '8.4811', '2022-11-30 23:06:11', '2022-11-30');
INSERT INTO `xm06_exchanges` VALUES ('GBPCNY', '英镑人民币', '8.6479', '8.5512', '8.6357', '8.5193', '8.6357', '2022-12-01 22:02:02', '2022-12-01');
INSERT INTO `xm06_exchanges` VALUES ('GBPCNY', '英镑人民币', '8.646', '8.6216', '8.6154', '8.606', '8.6154', '2022-12-02 21:25:01', '2022-12-02');
INSERT INTO `xm06_exchanges` VALUES ('GBPCNY', '英镑人民币', '8.6743', '8.6216', '8.6711', '8.5377', '8.6711', '2022-12-03 05:57:50', '2022-12-03');
INSERT INTO `xm06_exchanges` VALUES ('GBPCNY', '英镑人民币', '8.6593', '8.6286', '8.5328', '8.5096', '8.5328', '2022-12-05 20:34:04', '2022-12-05');
INSERT INTO `xm06_exchanges` VALUES ('GBPCNY', '英镑人民币', '8.5211', '8.4888', '8.517', '8.484', '8.517', '2022-12-06 15:16:08', '2022-12-06');
INSERT INTO `xm06_exchanges` VALUES ('GBPCNY', '英镑人民币', '8.5267', '8.4822', '8.509', '8.4539', '8.509', '2022-12-07 22:39:57', '2022-12-07');
INSERT INTO `xm06_exchanges` VALUES ('GBPCNY', '英镑人民币', '8.5429', '8.5239', '8.5335', '8.5181', '8.5335', '2022-12-09 14:44:15', '2022-12-09');
INSERT INTO `xm06_exchanges` VALUES ('GBPCNY', '英镑人民币', '8.5703', '8.5239', '8.5304', '8.5005', '8.5304', '2022-12-10 05:57:53', '2022-12-10');
INSERT INTO `xm06_exchanges` VALUES ('HKDCNY', '港元人民币', '0.9156', '0.9129', '0.9156', '0.9124', '0.9156', '2022-11-23 19:26:57', '2022-11-23');
INSERT INTO `xm06_exchanges` VALUES ('HKDCNY', '港元人民币', '0.9168', '0.9152', '0.915', '0.913', '0.915', '2022-11-24 15:44:05', '2022-11-24');
INSERT INTO `xm06_exchanges` VALUES ('HKDCNY', '港元人民币', '0.9182', '0.9154', '0.917', '0.9149', '0.917', '2022-11-26 05:55:00', '2022-11-26');
INSERT INTO `xm06_exchanges` VALUES ('HKDCNY', '港元人民币', '0.9258', '0.9179', '0.9208', '0.9164', '0.9208', '2022-11-28 21:55:24', '2022-11-28');
INSERT INTO `xm06_exchanges` VALUES ('HKDCNY', '港元人民币', '0.9221', '0.9221', '0.9176', '0.9157', '0.9176', '2022-11-29 21:59:54', '2022-11-29');
INSERT INTO `xm06_exchanges` VALUES ('HKDCNY', '港元人民币', '0.9163', '0.9162', '0.9077', '0.906', '0.9077', '2022-11-30 23:02:25', '2022-11-30');
INSERT INTO `xm06_exchanges` VALUES ('HKDCNY', '港元人民币', '0.9106', '0.9078', '0.9079', '0.9038', '0.9079', '2022-12-01 22:01:05', '2022-12-01');
INSERT INTO `xm06_exchanges` VALUES ('HKDCNY', '港元人民币', '0.9077', '0.9048', '0.9018', '0.9017', '0.9018', '2022-12-02 21:25:01', '2022-12-02');
INSERT INTO `xm06_exchanges` VALUES ('HKDCNY', '港元人民币', '0.9077', '0.9048', '0.9054', '0.9013', '0.9054', '2022-12-03 05:57:14', '2022-12-03');
INSERT INTO `xm06_exchanges` VALUES ('HKDCNY', '港元人民币', '0.9026', '0.9015', '0.8941', '0.8941', '0.8941', '2022-12-05 20:32:47', '2022-12-05');
INSERT INTO `xm06_exchanges` VALUES ('HKDCNY', '港元人民币', '0.8995', '0.8958', '0.8993', '0.8949', '0.8993', '2022-12-06 15:16:07', '2022-12-06');
INSERT INTO `xm06_exchanges` VALUES ('HKDCNY', '港元人民币', '0.8995', '0.899', '0.8946', '0.8945', '0.8946', '2022-12-07 22:39:14', '2022-12-07');
INSERT INTO `xm06_exchanges` VALUES ('HKDCNY', '港元人民币', '0.8945', '0.8941', '0.8933', '0.8913', '0.8933', '2022-12-09 14:44:10', '2022-12-09');
INSERT INTO `xm06_exchanges` VALUES ('HKDCNY', '港元人民币', '0.8945', '0.8941', '0.8933', '0.8912', '0.8933', '2022-12-10 05:54:12', '2022-12-10');
INSERT INTO `xm06_exchanges` VALUES ('USDCNY', '美元人民币', '7.1591', '7.1402', '7.1576', '7.1392', '7.1576', '2022-11-23 19:26:14', '2022-11-23');
INSERT INTO `xm06_exchanges` VALUES ('USDCNY', '美元人民币', '7.1485', '7.1478', '7.1476', '7.1336', '7.1476', '2022-11-24 15:43:15', '2022-11-24');
INSERT INTO `xm06_exchanges` VALUES ('USDCNY', '美元人民币', '7.18', '7.1615', '7.1642', '7.1467', '7.1642', '2022-11-25 23:30:15', '2022-11-25');
INSERT INTO `xm06_exchanges` VALUES ('USDCNY', '美元人民币', '7.2365', '7.1642', '7.2074', '7.1642', '7.2079', '2022-11-28 23:14:02', '2022-11-28');
INSERT INTO `xm06_exchanges` VALUES ('USDCNY', '美元人民币', '7.2079', '7.2074', '7.1568', '7.1534', '7.1573', '2022-11-29 23:29:17', '2022-11-29');
INSERT INTO `xm06_exchanges` VALUES ('USDCNY', '美元人民币', '7.1568', '7.1568', '7.0775', '7.0666', '7.078', '2022-11-30 22:43:17', '2022-11-30');
INSERT INTO `xm06_exchanges` VALUES ('USDCNY', '美元人民币', '7.0879', '7.046', '7.0424', '7.0422', '7.0429', '2022-12-01 23:08:03', '2022-12-01');
INSERT INTO `xm06_exchanges` VALUES ('USDCNY', '美元人民币', '7.065', '7.0424', '7.019', '7.0188', '7.0195', '2022-12-02 20:41:03', '2022-12-02');
INSERT INTO `xm06_exchanges` VALUES ('USDCNY', '美元人民币', '6.9843', '6.974', '6.9478', '6.9451', '6.9478', '2022-12-05 19:51:06', '2022-12-05');
INSERT INTO `xm06_exchanges` VALUES ('USDCNY', '美元人民币', '6.994', '6.961', '6.9915', '6.9548', '6.992', '2022-12-06 15:15:27', '2022-12-06');
INSERT INTO `xm06_exchanges` VALUES ('USDCNY', '美元人民币', '6.994', '6.9935', '6.9702', '6.9702', '6.9707', '2022-12-07 22:24:03', '2022-12-07');
INSERT INTO `xm06_exchanges` VALUES ('USDCNY', '美元人民币', '6.9649', '6.9649', '6.9559', '6.942', '6.9564', '2022-12-09 23:28:17', '2022-12-09');
