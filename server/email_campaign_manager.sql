-- Adminer 3.6.1 MySQL dump

SET NAMES utf8;
SET foreign_key_checks = 0;
SET time_zone = 'SYSTEM';
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE DATABASE IF NOT EXISTS `email_campaign_manager` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_bin */;
USE `email_campaign_manager`;

SET @adminer_alter = '';

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
  `emails_file` varchar(256) COLLATE latin1_bin NOT NULL,
  `emails` text COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `email_lists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

INSERT INTO `email_lists` (`id`, `name`, `user_id`, `emails_file`, `emails`) VALUES
(1,	'test',	1,	'',	'test@dgds.com,gfds@fghsf.go\nfdgsfd\ndfgdfsg\ndfgdfg\ndfgsdfg\ndfgfds\nfdsfasdf\ndsfadsf\ndsfadsf\n@@@@@@@@@@@@');

DROP TABLE IF EXISTS `servers`;
CREATE TABLE `servers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE latin1_bin NOT NULL,
  `status` enum('active','suspended','dead') COLLATE latin1_bin NOT NULL,
  `host` varchar(256) COLLATE latin1_bin NOT NULL,
  `port` int(11) NOT NULL,
  `login` varchar(256) COLLATE latin1_bin NOT NULL,
  `password` varchar(256) COLLATE latin1_bin NOT NULL,
  `sender_email` varchar(256) COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `host_port` (`host`,`port`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

INSERT INTO `servers` (`id`, `name`, `status`, `host`, `port`, `login`, `password`, `sender_email`) VALUES
(1,	'test',	'active',	'ftp://t.com',	23,	't',	't',	'test@test.com');

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
  `_session_id` varchar(256) COLLATE latin1_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

INSERT INTO `users` (`id`, `name`, `password`, `type`, `_session_id`) VALUES
(1,	'sergey.stoyan@gmail.com',	'123',	'admin',	'44qa0c1bng6d99mb7so7f71225'),
(2,	'root@q',	'123',	'admin',	''),
(3,	'1@1',	'123',	'user',	'1na1j8327cg0c4bd9bs6digge2'),
(7,	'q@q',	'fsdfsd',	'user',	NULL);

DELIMITER ;;
CREATE PROCEDURE adminer_alter (INOUT alter_command text) BEGIN
	DECLARE _table_name, _engine, _table_collation varchar(64);
	DECLARE _table_comment varchar(64);
	DECLARE done bool DEFAULT 0;
	DECLARE tables CURSOR FOR SELECT TABLE_NAME, ENGINE, TABLE_COLLATION, TABLE_COMMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE();
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
	OPEN tables;
	REPEAT
		FETCH tables INTO _table_name, _engine, _table_collation, _table_comment;
		IF NOT done THEN
			CASE _table_name
				WHEN 'campaigns' THEN
					IF _engine != 'InnoDB' OR _table_collation != 'latin1_bin' OR _table_comment != '' THEN
						ALTER TABLE `campaigns` ENGINE=InnoDB COLLATE=latin1_bin COMMENT='';
					END IF;
				WHEN 'email_lists' THEN
					IF _engine != 'InnoDB' OR _table_collation != 'latin1_bin' OR _table_comment != '' THEN
						ALTER TABLE `email_lists` ENGINE=InnoDB COLLATE=latin1_bin COMMENT='';
					END IF;
				WHEN 'servers' THEN
					IF _engine != 'InnoDB' OR _table_collation != 'latin1_bin' OR _table_comment != '' THEN
						ALTER TABLE `servers` ENGINE=InnoDB COLLATE=latin1_bin COMMENT='';
					END IF;
				WHEN 'templates' THEN
					IF _engine != 'InnoDB' OR _table_collation != 'latin1_bin' OR _table_comment != '' THEN
						ALTER TABLE `templates` ENGINE=InnoDB COLLATE=latin1_bin COMMENT='';
					END IF;
				WHEN 'users' THEN
					IF _engine != 'InnoDB' OR _table_collation != 'latin1_bin' OR _table_comment != '' THEN
						ALTER TABLE `users` ENGINE=InnoDB COLLATE=latin1_bin COMMENT='';
					END IF;
				ELSE
					SET alter_command = CONCAT(alter_command, 'DROP TABLE `', REPLACE(_table_name, '`', '``'), '`;\n');
			END CASE;
		END IF;
	UNTIL done END REPEAT;
	CLOSE tables;
END;;
DELIMITER ;
CALL adminer_alter(@adminer_alter);
DROP PROCEDURE adminer_alter;
SELECT @adminer_alter;
-- 2016-06-13 16:37:33
