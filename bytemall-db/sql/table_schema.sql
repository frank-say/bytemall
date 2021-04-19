DROP TABLE IF EXISTS `bytemall_user`;
CREATE TABLE `bytemall_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `openid` varchar(63) NOT NULL DEFAULT '' COMMENT '微信openid',
  `unionid` varchar(63) NOT NULL DEFAULT '' COMMENT '微信unionid',
  `gender` tinyint(3) NOT NULL DEFAULT '0' COMMENT '性别：0 未知， 1男， 2 女',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `nickname` varchar(63) NOT NULL DEFAULT '' COMMENT '用户昵称',
  `mobile` varchar(20) NOT NULL DEFAULT '' COMMENT '用户手机号码',
  `avatar` varchar(255) NOT NULL DEFAULT '' COMMENT '用户头像图片',
  `city` varchar(255) NOT NULL DEFAULT '' COMMENT '城市',
  `province` varchar(255) NOT NULL DEFAULT '' COMMENT '省份',
  `country` varchar(255) NOT NULL DEFAULT '' COMMENT '国家',
  `add_time` datetime DEFAULT NULL COMMENT '创建时间',
  `session_key` varchar(24) NOT NULL DEFAULT '' COMMENT '小程序sessionKey',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted` tinyint(1) DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`),
  KEY `mobile` (`mobile`),
  KEY `unionid` (`unionid`),
  KEY `ct` (`add_time`),
  KEY `ut` (`update_time`),
  UNIQUE KEY `openid` (`openid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='小程序用户表';

DROP TABLE IF EXISTS `bytemall_admin`;
CREATE TABLE `bytemall_admin` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(63) NOT NULL DEFAULT '' COMMENT '登录名',
  `password` varchar(63) NOT NULL DEFAULT '' COMMENT '密码',
  `add_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted` tinyint(1) DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COMMENT='后台管理员表';