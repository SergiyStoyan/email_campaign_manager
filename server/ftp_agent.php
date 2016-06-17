<?php
//********************************************************************************************
//Author: Sergey Stoyan, CliverSoft.com
//        http://cliversoft.com
//        stoyan@cliversoft.com
//        sergey.stoyan@gmail.com
//        27 February 2007
//Copyright: (C) 2007, Sergey Stoyan
//********************************************************************************************

include_once("../core.php");
  	
if(!Login::UserType())
	Respond(null, "User of type '".Login::UserType()."' cannot do this operation.");
	
$action = isset($_GET['action']) ? $_GET['action'] : null;
switch ($action) 
{ 	
		$server = Db::GetRowArray("SELECT * FROM servers WHERE id=".$_POST['id']);
		if(!$server)
			Respond(null, "No such server: ".$_POST['id']);
	  	
	  	try
	  	{
		  	if($ftp = @ftp_connect($server['host'], $server['port']))
		  	{
		    	if(!@ftp_login($ftp, $server['login'], $server['password']))
		    	{
					@ftp_close($ftp);
					Db::Query("UPDATE servers SET status='dead', status_time=NOW() WHERE id=".$_POST['id']);
		    		Respond("No login");
				}
			
				@ftp_close($ftp);
				Db::Query("UPDATE servers SET status='active', status_time=NOW() WHERE id=".$_POST['id']);
	  			Respond("ok");	
			}			
		}
		catch(Exception $e)
		{
			Logger::Write2("fdsafdsf");
			Db::Query("UPDATE servers SET status='dead', status_time=NOW() WHERE id=".$_POST['id']);
			Respond($e->getMessage());
		}
		
		Db::Query("UPDATE servers SET status='dead', status_time=NOW() WHERE id=".$_POST['id']);
	    Respond("No connect");
	default:
		throw new Exception("Unhandled action: $action");
}
?>