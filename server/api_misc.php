<?php
//********************************************************************************************
//Author: Sergey Stoyan, CliverSoft.com
//        http://cliversoft.com
//        stoyan@cliversoft.com
//        sergey.stoyan@gmail.com
//        27 February 2007
//Copyright: (C) 2007, Sergey Stoyan
//********************************************************************************************

include_once("common/db.php");

class ApiMisc
{
	static public function TestServer($server_id, $synchronous=false)
	{		
		Db::Query("UPDATE servers SET status='testing', status_time=NOW() WHERE id=$server_id");
	  	
	  	if(!$synchronous)
	  		return;
	  	
		$server = Db::GetRowArray("SELECT * FROM servers WHERE id=$server_id");
		if(!$server)
			return "No such server: $server_id";		  	
		//ftp thows uncatchable errors, so it will suppress it 		
		Logger::Hook(0);
	  	$status = 'dead';
	  	$error = null;
		if($ftp = @ftp_connect($server['host'], $server['port']))
		{
			if(@ftp_login($ftp, $server['login'], $server['password']))
				$status = 'active';
			else
				$error = 'no login';
			@ftp_close($ftp);
		}
		else
			$error = 'no connect';
		//set error handler back
		Logger::Hook();
		Db::Query("UPDATE servers SET status='$status', status_time=NOW() WHERE id=$server_id");		
		return $error;
	}	
}

?>