/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2022-12-11 22:22:22
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for xm06_total
-- ----------------------------
DROP TABLE IF EXISTS `xm06_total`;
CREATE TABLE `xm06_total` (
  `futures_id` varchar(255) NOT NULL,
  `futures_name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `price_today_begin` varchar(255) DEFAULT NULL,
  `price_yesterday` varchar(255) DEFAULT NULL,
  `price_right_now` varchar(255) DEFAULT NULL,
  `price_high` varchar(255) DEFAULT NULL,
  `price_low` varchar(255) DEFAULT NULL,
  `deal_count` varchar(255) DEFAULT NULL,
  `deal_amount` varchar(255) DEFAULT NULL,
  `select_time` datetime DEFAULT NULL,
  PRIMARY KEY (`futures_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xm06_total
-- ----------------------------
INSERT INTO `xm06_total` VALUES ('AG0', '白银连续', '期货', '5249.0', '5255.0', '5326.0', '5355.0', '5242.0', null, null, '2022-12-11 18:27:40');
INSERT INTO `xm06_total` VALUES ('AL2301', '沪铝2301', '期货', '19200.0', '19260.0', '19130.0', '19235.0', '19115.0', null, null, '2022-12-11 18:27:48');
INSERT INTO `xm06_total` VALUES ('AU0', '黄金连续', '期货', '404.58', '403.46', '405.1', '406.56', '403.26', null, null, '2022-12-11 18:27:40');
INSERT INTO `xm06_total` VALUES ('CNYJPY', '人民币日元', '外汇', '19.6', '19.65', '19.63', '19.48', '19.63', null, null, '2022-12-10 05:57:55');
INSERT INTO `xm06_total` VALUES ('CU2301', '沪铜2301', '期货', '66590.0', '67120.0', '66640.0', '66730.0', '66310.0', null, null, '2022-12-11 18:27:40');
INSERT INTO `xm06_total` VALUES ('DINIW', '美元指数', '外汇', '104.8196', '105.1932', '104.9257', '104.4745', '104.9257', null, null, '2022-12-10 05:58:57');
INSERT INTO `xm06_total` VALUES ('EURCNY', '欧元人民币', '外汇', '7.3516', '7.367', '7.3297', '7.3182', '7.3297', null, null, '2022-12-10 05:57:54');
INSERT INTO `xm06_total` VALUES ('FU2301', '燃油2301', '期货', '2440.0', '2445.0', '2421.0', '2443.0', '2410.0', null, null, '2022-12-11 18:27:40');
INSERT INTO `xm06_total` VALUES ('GBPCNY', '英镑人民币', '外汇', '8.5239', '8.5703', '8.5304', '8.5005', '8.5304', null, null, '2022-12-10 05:57:53');
INSERT INTO `xm06_total` VALUES ('HKDCNY', '港元人民币', '外汇', '0.8941', '0.8945', '0.8933', '0.8912', '0.8933', null, null, '2022-12-10 05:54:12');
INSERT INTO `xm06_total` VALUES ('I2301', '铁矿石2301', '期货', '838.0', '840.0', '840.5', '846.5', '836.0', null, null, '2022-12-11 18:27:49');
INSERT INTO `xm06_total` VALUES ('M2301', '豆粕2301', '期货', '4450.0', '4444.0', '4427.0', '4450.0', '4396.0', null, null, '2022-12-11 18:27:39');
INSERT INTO `xm06_total` VALUES ('MA2301', '郑醇2301', '期货', '2489.0', '2494.0', '2496.0', '2511.0', '2485.0', null, null, '2022-12-11 18:27:48');
INSERT INTO `xm06_total` VALUES ('P2301', '棕榈2301', '期货', '7962.0', '7966.0', '7870.0', '8024.0', '7870.0', null, null, '2022-12-11 18:27:50');
INSERT INTO `xm06_total` VALUES ('RB2301', '螺纹钢2301', '期货', '3910.0', '3945.0', '3961.0', '3970.0', '3910.0', null, null, '2022-12-11 18:27:48');
INSERT INTO `xm06_total` VALUES ('SC2301', '原油2301', '期货', '501.8', '501.0', '496.3', '508.7', '495.0', null, null, '2022-12-11 18:27:48');
INSERT INTO `xm06_total` VALUES ('sh000001', '上证指数', '股票', '3197.1183', '3197.3499', '3206.9502', '3212.1059', '3182.9068', '3.73343209E8', '4.47750222047E11', '2022-12-09 15:30:39');
INSERT INTO `xm06_total` VALUES ('sh000300', '沪深300', '股票', '3961.9919', '3959.1798', '3998.2442', '4003.3178', '3944.4396', '1.53774954E8', '2.68166789657E11', '2022-12-09 15:30:39');
INSERT INTO `xm06_total` VALUES ('sh600000', '浦发银行', '股票', '7.37', '7.38', '7.32', '7.39', '7.3', '3.8192346E7', '2.80350287E8', '2022-12-09 15:00:01');
INSERT INTO `xm06_total` VALUES ('sh600015', '华夏银行', '股票', '5.38', '5.38', '5.3', '5.41', '5.3', '4.3243164E7', '2.3116039E8', '2022-12-09 15:00:01');
INSERT INTO `xm06_total` VALUES ('sh600028', '中国石化', '股票', '4.53', '4.53', '4.51', '4.55', '4.49', '1.14388075E8', '5.16452724E8', '2022-12-09 15:00:01');
INSERT INTO `xm06_total` VALUES ('sh600048', '保利发展', '股票', '16.09', '15.95', '16.45', '16.62', '16.02', '1.23904153E8', '2.023666441E9', '2022-12-09 15:00:00');
INSERT INTO `xm06_total` VALUES ('sh600055', '万东医疗', '股票', '21.17', '21.24', '21.06', '21.38', '21.0', '8138732.0', '1.72146894E8', '2022-12-09 15:00:01');
INSERT INTO `xm06_total` VALUES ('sh600085', '同仁堂', '股票', '49.08', '48.54', '48.91', '50.77', '48.8', '1.3133176E7', '6.50959889E8', '2022-12-09 15:00:01');
INSERT INTO `xm06_total` VALUES ('sh600129', '太极集团', '股票', '32.19', '32.32', '31.58', '32.49', '31.25', '8333053.0', '2.6459385E8', '2022-12-09 15:00:01');
INSERT INTO `xm06_total` VALUES ('sh600132', '重庆啤酒', '股票', '126.4', '126.46', '126.03', '127.57', '123.51', '5103283.0', '6.41748232E8', '2022-12-09 15:00:01');
INSERT INTO `xm06_total` VALUES ('sh600332', '白云山', '股票', '32.39', '32.53', '32.15', '32.78', '31.91', '2.3014867E7', '7.43440156E8', '2022-12-09 15:00:01');
INSERT INTO `xm06_total` VALUES ('sh600519', '贵州茅台', '股票', '1692.0', '1687.02', '1730.0', '1730.0', '1682.0', '3921526.0', '6.716944493E9', '2022-12-09 15:00:01');
INSERT INTO `xm06_total` VALUES ('sh600606', '绿地控股', '股票', '3.32', '3.3', '3.37', '3.39', '3.28', '1.48624961E8', '4.97259364E8', '2022-12-09 15:00:03');
INSERT INTO `xm06_total` VALUES ('sh601318', '中国平安', '股票', '47.07', '47.15', '47.6', '47.88', '46.7', '7.0957885E7', '3.366745982E9', '2022-12-09 15:00:01');
INSERT INTO `xm06_total` VALUES ('sh601628', '中国人寿', '股票', '36.0', '36.36', '36.2', '36.52', '35.65', '1.3159311E7', '4.74725216E8', '2022-12-09 15:00:00');
INSERT INTO `xm06_total` VALUES ('sh601857', '中国石油', '股票', '5.16', '5.15', '5.14', '5.18', '5.12', '9.543407E7', '4.909642E8', '2022-12-09 15:00:00');
INSERT INTO `xm06_total` VALUES ('sh601988', '中国银行', '股票', '3.17', '3.16', '3.16', '3.17', '3.15', '1.10735837E8', '3.50398847E8', '2022-12-09 15:00:00');
INSERT INTO `xm06_total` VALUES ('sz000002', '万 科Ａ', '股票', '19.37', '19.38', '20.46', '20.63', '19.26', '2.17733959E8', '4.3807176304E9', '2022-12-09 15:00:03');
INSERT INTO `xm06_total` VALUES ('sz000538', '云南白药', '股票', '58.9', '58.9', '58.99', '59.36', '58.5', '6224269.0', '3.664554121E8', '2022-12-09 15:00:03');
INSERT INTO `xm06_total` VALUES ('sz000858', '五 粮 液', '股票', '174.63', '174.76', '183.27', '183.47', '174.12', '4.1957765E7', '7.55007423644E9', '2022-12-09 15:00:03');
INSERT INTO `xm06_total` VALUES ('sz300015', '爱尔眼科', '股票', '28.92', '29.05', '28.93', '29.09', '28.28', '3.6795544E7', '1.05647319946E9', '2022-12-09 15:35:30');
INSERT INTO `xm06_total` VALUES ('sz300396', '迪瑞医疗', '股票', '28.21', '28.25', '26.89', '28.8', '26.89', '4936532.0', '1.3742292426E8', '2022-12-09 15:35:15');
INSERT INTO `xm06_total` VALUES ('sz399001', '深证成指', '股票', '11397.097', '11389.793', '11501.578', '11511.317', '11360.149', '4.6434589244E10', '5.61346221280006E11', '2022-12-09 15:00:03');
INSERT INTO `xm06_total` VALUES ('sz399006', '创业板指', '股票', '2412.16', '2411.812', '2420.629', '2421.655', '2391.667', '1.0281299313E10', '1.7866440272782E11', '2022-12-09 15:00:03');
INSERT INTO `xm06_total` VALUES ('sz399415', 'I100', '股票', '7127.712', '7141.08', '7101.94', '7165.449', '7056.256', '1.116054025E9', '3.68051567805E10', '2022-12-09 15:00:12');
INSERT INTO `xm06_total` VALUES ('TA2301', 'PTA2301', '期货', '5074.0', '5082.0', '5152.0', '5154.0', '5074.0', null, null, '2022-12-11 18:27:48');
INSERT INTO `xm06_total` VALUES ('USDCNY', '美元人民币', '外汇', '6.9649', '6.9649', '6.9559', '6.942', '6.9564', null, null, '2022-12-09 23:28:17');
INSERT INTO `xm06_total` VALUES ('V2301', 'PVC2301', '期货', '6200.0', '6217.0', '6288.0', '6308.0', '6196.0', null, null, '2022-12-11 18:27:49');
INSERT INTO `xm06_total` VALUES ('Y2301', '豆油2301', '期货', '9256.0', '9252.0', '9210.0', '9306.0', '9196.0', null, null, '2022-12-11 18:27:39');
