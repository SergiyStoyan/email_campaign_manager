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
	case 'GetTableData':
	  	Respond(DataTable::FetchData(
	  		[
	  			['Name'=>'id', 'Searchable' => false, 'Order' => null, 'Expression'=>null],
	  			['Name'=>'name', 'Searchable' => true, 'Order' => null, 'Expression'=>null],
	  			['Name'=>'status', 'Searchable' => true, 'Order' => null, 'Expression'=>null],
	  			['Name'=>'status_time', 'Searchable' => true, 'Order' => null, 'Expression'=>null],
	  			['Name'=>'host', 'Searchable' => true, 'Order' => null, 'Expression'=>null],
	  			['Name'=>'sender_email', 'Searchable' => true, 'Order' => null, 'Expression'=>null],
	  		],
	  		'FROM servers'
	  		)
	  	);
    return;
  	case 'Add':
  		Respond(DataTable::Insert('servers', $_POST));
    return;
  	case 'GetByKeys':
  		Respond(DataTable::GetByKeys('servers', $_POST));
    return;
  	case 'Save':
  		Respond(DataTable::Save('servers', $_POST));
    return;
  	case 'Delete':
  		Respond(DataTable::Delete('servers', $_POST));
    return;
  	case 'TestServer':    
  	
		$server = Db::GetRowArray("SELECT * FROM servers WHERE id=".$_POST['id']);
		if(!$server)
			Respond(null, "No such server: ".$_POST['id']);
	  	
	  	try
	  	{
		  	if($ftp = ftp_connect($server['host'], $server['port']))
		  	{
		    	if(!ftp_login($ftp, $server['login'], $server['password']))
		    	{
					ftp_close($ftp);
					Db::Query("UPDATE servers SET status='dead', status_time=NOW() WHERE id=".$_POST['id']);
		    		Respond("No login");
				}
			
				ftp_close($ftp);
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
    return;
	default:
		throw new Exception("Unhandled action: $action");
}

?>