-- Adminer 3.6.1 MySQL dump

SET NAMES utf8;
SET foreign_key_checks = 0;
SET time_zone = 'SYSTEM';
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE DATABASE `email_campaign_manager` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_bin */;
USE `email_campaign_manager`;

DROP TABLE IF EXISTS `campaigns`;
CREATE TABLE `campaigns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE latin1_bin NOT NULL,
  `user_id` int(11) NOT NULL,
  `template_id` int(11) NOT NULL,
  `email_list_id` int(11) NOT NULL,
  `server_id` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  `status` enum('new','started','completed','stopped','error') COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `user_id` (`user_id`),
  KEY `template_id` (`template_id`),
  KEY `email_list_id` (`email_list_id`),
  KEY `server_id` (`server_id`),
  CONSTRAINT `campaigns_ibfk_4` FOREIGN KEY (`server_id`) REFERENCES `servers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `campaigns_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `campaigns_ibfk_2` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `campaigns_ibfk_3` FOREIGN KEY (`email_list_id`) REFERENCES `email_lists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

INSERT INTO `campaigns` (`id`, `name`, `user_id`, `template_id`, `email_list_id`, `server_id`, `start_time`, `status`) VALUES
(3,	'test12',	1,	1,	1,	1,	'0000-00-00 00:00:00',	'new');

DROP TABLE IF EXISTS `email_lists`;
CREATE TABLE `email_lists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE latin1_bin NOT NULL,
  `user_id` int(11) NOT NULL,
  `file` varchar(256) COLLATE latin1_bin NOT NULL,
  `list` text COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `email_lists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

INSERT INTO `email_lists` (`id`, `name`, `user_id`, `file`, `list`) VALUES
(1,	'test',	1,	'',	'test@dgds.com,gfds@fghsf.go\nfdgsfd\ndfgdfsg\ndfgdfg\ndfgsdfg\ndfgfds\nfdsfasdf\ndsfadsf\ndsfadsf\n@@@@@@@@@@@@');

DROP TABLE IF EXISTS `servers`;
CREATE TABLE `servers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE latin1_bin NOT NULL,
  `status` enum('active','suspended','dead','testing') COLLATE latin1_bin NOT NULL,
  `status_time` datetime NOT NULL,
  `host` varchar(256) COLLATE latin1_bin NOT NULL,
  `port` int(11) NOT NULL,
  `login` varchar(256) COLLATE latin1_bin NOT NULL,
  `password` varchar(256) COLLATE latin1_bin NOT NULL,
  `sender_email` varchar(256) COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `host_port` (`host`,`port`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

INSERT INTO `servers` (`id`, `name`, `status`, `status_time`, `host`, `port`, `login`, `password`, `sender_email`) VALUES
(1,	'test',	'dead',	'2016-06-17 21:36:32',	'test.com',	23,	't',	't',	'test@test.com'),
(2,	'37.59.235.166',	'active',	'2016-06-17 21:35:30',	'37.59.235.166',	21,	'FTPTest1',	'q1w2e3r4',	'sergey.stoyan@gmail.com');

DROP TABLE IF EXISTS `templates`;
CREATE TABLE `templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE latin1_bin NOT NULL,
  `subject` varchar(256) COLLATE latin1_bin NOT NULL,
  `user_id` int(11) NOT NULL,
  `template` text COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `templates_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

INSERT INTO `templates` (`id`, `name`, `subject`, `user_id`, `template`) VALUES
(1,	'teste',	'dsfdfgfdsg',	1,	'sadadffdfdsf');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE latin1_bin NOT NULL,
  `password` varchar(256) COLLATE latin1_bin NOT NULL,
  `type` enum('admin','user','disabled') COLLATE latin1_bin NOT NULL,
  `email` varchar(256) COLLATE latin1_bin NOT NULL,
  `_permanent_login_id` varchar(256) COLLATE latin1_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

INSERT INTO `users` (`id`, `name`, `password`, `type`, `email`, `_permanent_login_id`) VALUES
(1,	'cliver',	'123',	'admin',	'sergey.stoyan@gmail.com',	''),
(2,	'admin',	'123',	'admin',	'root@q',	''),
(3,	'user',	'123',	'user',	'1@1',	'1na1j8327cg0c4bd9bs6digge2'),
(7,	'user2',	'fsdfsd',	'user',	'q@q',	'');

-- 2016-06-18 11:11:21
