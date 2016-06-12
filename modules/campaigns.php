<?php
//********************************************************************************************
//Author: Sergey Stoyan, CliverSoft.com
//        http://cliversoft.com
//        stoyan@cliversoft.com
//        sergey.stoyan@gmail.com
//        27 February 2007
//Copyright: (C) 2007, Sergey Stoyan
//********************************************************************************************
include_once("../server/api.php");

//Logger::Write($_GET);
//Logger::Write($_POST);

$_POST['user_id'] = $User['id'];
$action = isset($_GET['action']) ? $_GET['action'] : null;
switch ($action) 
{
	case 'GetTableData':
	  	Respond(DataTable::FetchData(
	  		[
	  			['Name'=>'id', 'Searchable' => false, 'Order' => null, 'Expression'=>'campaigns.id'],
	  			['Name'=>'name', 'Searchable' => true, 'Order' => null, 'Expression'=>'campaigns.name'],
	  			['Name'=>'template', 'Searchable' => true, 'Order' => null, 'Expression'=>'templates.name'],
	  			['Name'=>'email_list', 'Searchable' => true, 'Order' => null, 'Expression'=>'email_lists.name'],
	  			['Name'=>'server', 'Searchable' => true, 'Order' => null, 'Expression'=>'servers.name'],
	  			['Name'=>'start_time', 'Searchable' => true, 'Order' => null, 'Expression'=>null],
	  			['Name'=>'status', 'Searchable' => true, 'Order' => null, 'Expression'=>'campaigns.status'],
	  		],
	  		'FROM campaigns INNER JOIN servers ON campaigns.server_id=servers.id INNER JOIN templates ON campaigns.template_id=templates.id INNER JOIN email_lists ON campaigns.email_list_id=email_lists.id WHERE campaigns.user_id='.$User['id']
	  		)
	  	);
    return;
  	case 'Add':
  		//$_POST[]
  		Respond(DataTable::Insert('campaigns', $_POST));
    return;
  	case 'GetByKeys':
  		Respond(DataTable::GetByKeys('campaigns', $_POST));
    return;
  	case 'Save':
  		Respond(DataTable::Save('campaigns', $_POST));
    return;
  	case 'Delete':
  		Respond(DataTable::Delete('campaigns', $_POST));
    return;
  	case 'GetOptions':
		$templates = Db::GetArray("SELECT id, name FROM templates WHERE user_id=".$User['id']);
		$servers = Db::GetArray("SELECT id, name FROM servers");
		$email_lists = Db::GetArray("SELECT id, name FROM email_lists WHERE user_id=".$User['id']);
		$data = [
			'templates'=>$templates,
			'servers'=>$servers,
			'email_lists'=>$email_lists,
		];
  		Respond($data);
    return;
	default:
		throw new Exception("Unhandled action: $action");
}

?>