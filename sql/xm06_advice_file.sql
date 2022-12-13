/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 13/12/2022 11:34:10
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for xm06_advice_file
-- ----------------------------
DROP TABLE IF EXISTS `xm06_advice_file`;
CREATE TABLE `xm06_advice_file`  (
  `advice_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `reply` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `release_time` datetime NULL DEFAULT NULL,
  `reply_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`advice_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of xm06_advice_file
-- ----------------------------
INSERT INTO `xm06_advice_file` VALUES (1, 'aaaaa', '好菜啊aaa', '您说的对', '2022-12-04 17:41:10', '2022-12-04 17:41:14');
INSERT INTO `xm06_advice_file` VALUES (2, '', 'sdasdasdas', 'sdasdsad', NULL, NULL);
INSERT INTO `xm06_advice_file` VALUES (8, '', '实打实大苏打撒', NULL, NULL, NULL);
INSERT INTO `xm06_advice_file` VALUES (10, 'BBB', '踩踩踩', '踩踩踩', NULL, '2022-12-13 11:23:02');
INSERT INTO `xm06_advice_file` VALUES (11, 'BBB', '哇达娃强大强大', NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
