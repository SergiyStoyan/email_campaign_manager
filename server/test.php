<?php

echo "222222222222222222222";

include_once("common/logger.php");

echo "rrrrrrrrr";

echo "eeeeeeeeeee";
	//Logger::Init("__logs");
	
	echo "tttttttttttttttt";
	echo "||||||||||||||".Logger::GetLogDir()."@@@@";
	
	echo "yyyyyyyyyyyyy";
	Logger::Write("test");
	echo Logger::CurrentLogFile();
	

include_once("common/db.php");


echo Db::SmartQuery("SELECT * FROM users");
//mysqi_connect(Constants.DataBaseHost, Constants.DataBaseHost, Constants.DataBaseHost) or die('Could not connect!: ' . mysql_error());
//mysqi_select_db('cliver_email_campaign_manager') or die('Could not select database');

echo "OK";

?>