<?php
//********************************************************************************************
//Author: Sergey Stoyan, CliverSoft.com
//        http://cliversoft.com
//        stoyan@cliversoft.com
//        sergey.stoyan@gmail.com
//        27 February 2007
//Copyright: (C) 2007, Sergey Stoyan
//********************************************************************************************

include_once("constants.php");
include_once("common/logger.php");
Logger::Set(Constants::LogDirectory);
include_once("common/db.php");
  	  	
include_once("api_misc.php");
include_once("common/misc.php");

Logger::Write2("STARTED");

////////////////////////////////////////////////////////////////////////////////////////////
//test servers
////////////////////////////////////////////////////////////////////////////////////////////
foreach(Db::GetFirstColumnArray("SELECT id FROM servers WHERE status='testing'") as $k=>$server_id)
{
	ApiMisc::TestServer($server_id, true);
}

////////////////////////////////////////////////////////////////////////////////////////////
//run campaigns
////////////////////////////////////////////////////////////////////////////////////////////


//ftp thows uncatchable errors, so it will suppress it 		
//Logger::Hook(0);

$server_error_count = 0;
const MAX_ERROR_RUNNING_COUNT = 2;

$cs = Db::GetArray("SELECT campaigns.id, campaigns.name, email_lists.id AS email_list_id, email_lists.list AS email_list, servers.id AS server_id, servers.sender_email AS sender, templates.id AS template_id, templates.from_name, templates.subject, templates.template FROM campaigns INNER JOIN templates ON campaigns.template_id=templates.id INNER JOIN servers ON campaigns.server_id=servers.id INNER JOIN email_lists ON campaigns.email_list_id=email_lists.id WHERE campaigns.status IN ('new', 'started') AND campaigns.start_time<from_unixtime(UNIX_TIMESTAMP())");
foreach($cs as $i=>$c)
{	
	Logger::Write2("Starting campaign '".$c['name']."', id:".$c['id']);
	$email_count = 0;
	/*$ftp = get_ftp($c['server_id']);
	if(!ftp)
	{
		Logger::Error("Campaigns id failed: "$c['id']);
		Db::Query("UPDATE campaigns SET status='error' WHERE id=".$c['id']);
		continue;
	}*/
	$server = Db::GetRowArray("SELECT * FROM servers WHERE id=".$c['server_id']);
	Db::Query("UPDATE campaigns SET status='started' WHERE id=".$c['id']);
	$emails = preg_split('/[\s,;]+/i', $c['email_list']);
	foreach($emails as $to)
	{		
		$file = preg_replace('/[^\w].*/i', "", $c['subject'])."_".microtime(true);
		$uri = "ftp://".$server['login'].":".$server['password']."@".$server['host'].":".$server['port']."//$file";
		$f = fopen($uri, "w");
		if(!$f)
		{
			Logger::Error_("Could not open: $uri");
			$server_error_count++;
			continue;			
		}		
		$eml = get_eml($c['sender'], $c['from_name'], $to, $c['subject'], $c['template']);
		//Logger::Write2($uri);
		//Logger::Write2($eml);
		$bc = fwrite($f, $eml);
		//Logger::Write2($bc);
		if(!$bc)
		{
			Logger::Error_("Could not write to: $uri");
			if(++$server_error_count > MAX_ERROR_RUNNING_COUNT)
				break;			
		}
		$server_error_count = 0;
		$email_count++;
		
		if($email_count > 3)
		{			
			Logger::Write("Test limit reached. Break sending.");
			break;
		}
	}
		
	if($server_error_count > MAX_ERROR_RUNNING_COUNT)
	{
		$m = "Campaign '".$c['name']."' failed: uploading file failed $server_error_count errors running";
		Logger::Error_($m);
		Db::Query("UPDATE campaigns SET status='error', log=CONCAT(log,'\r\n',NOW(),' ','$m') WHERE id=".$c['id']);
		Db::Query("UPDATE servers SET status='dead', status_time=NOW() WHERE id=".$c['server_id']);
		continue;
	}
	$m = "Emls uploaded : $email_count, failed $server_error_count";
	Logger::Write2($m);
	Db::Query("UPDATE campaigns SET status='completed', log=CONCAT(log,'\r\n',NOW(),' ','$m') WHERE id=".$c['id']);
}
//set error handler back	
//Logger::Hook();
Logger::Write2("COMPLETED");
	
/*function get_ftp($server_id)
{			  	
	$server = Db::GetRowArray("SELECT * FROM servers WHERE id=$server_id");
	if(!$server)
	{
		Logger::Error("Server id does not exist: $server_id");
		return null;
	}
	$ftp = @ftp_connect($server['host'], $server['port']);
	if(!$ftp)
	{
		Logger::Error("No connection to ".Misc::GetArrayAsString($server));
		Db::Query("UPDATE servers SET status='dead', status_time=NOW() WHERE id=$server_id");		
		return null;
	}
	if(!@ftp_login($ftp, $server['login'], $server['password']))
	{
		Logger::Error("No login to ".Misc::GetArrayAsString($server));
		Db::Query("UPDATE servers SET status='dead', status_time=NOW() WHERE id=$server_id");	
		return null;	
	}
	Logger::Write("Opened connection to: ".Misc::GetArrayAsString($server));
	return $ftp;
}*/	

function get_eml($from, $from_name, $to, $subject, $template)
{
	$body = preg_replace('/\%\%email\%\%/i', $to, $template);
	
	//Logger::Write2($body);
	if(preg_match('/^\s*\</i', $body))
	{
		$content_type = "text/html; charset=UTF-8";
		//$content_type = "text/html";
		$body = "<html><head></head><body>$body</body></html>";
	}
	else
		$content_type = "text/plain";
	//Logger::Write2($content_type);
	return <<<__END_OF_EML__
x-sender: $from
x-receiver: $to
Return-Path: $from
To: $to
Subject: $subject
From: $from_name <$from>
Reply-To: $from_name <$from>
Sender: $from
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="180107000800000609090108"

--180107000800000609090108
Content-Type: $content_type

$body
--180107000800000609090108--
__END_OF_EML__;
}
?>