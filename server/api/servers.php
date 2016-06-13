<?php
//********************************************************************************************
//Author: Sergey Stoyan, CliverSoft.com
//        http://cliversoft.com
//        stoyan@cliversoft.com
//        sergey.stoyan@gmail.com
//        27 February 2007
//Copyright: (C) 2007, Sergey Stoyan
//********************************************************************************************
include_once("../api.php");

//Logger::Write($_GET);
//Logger::Write($_POST);

$action = isset($_GET['action']) ? $_GET['action'] : null;
switch ($action) 
{
	case 'GetTableData':
	  	Respond(DataTable::FetchData(
	  		[
	  			['Name'=>'id', 'Searchable' => false, 'Order' => null, 'Expression'=>null],
	  			['Name'=>'name', 'Searchable' => true, 'Order' => null, 'Expression'=>null],
	  			['Name'=>'status', 'Searchable' => true, 'Order' => null, 'Expression'=>null],
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
	default:
		throw new Exception("Unhandled action: $action");
}

?>