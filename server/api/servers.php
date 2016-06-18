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
include_once("../api_misc.php");

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
  		ApiMisc::TestServer($_POST['id']);
    return;
  	case 'GetByKeys':
  		Respond(DataTable::GetByKeys('servers', $_POST));
    return;
  	case 'Save':
  		Respond(DataTable::Save('servers', $_POST));
  		ApiMisc::TestServer($_POST['id']);
    return;
  	case 'Delete':
  		Respond(DataTable::Delete('servers', $_POST));
    return;
  	case 'TestServer': 
  		ApiMisc::TestServer($_POST['id'], true);
  		Respond(Db::GetRowArray("SELECT status, status_time FROM servers WHERE id=".$_POST['id']));
    return;
	default:
		throw new Exception("Unhandled action: $action");
}

?>