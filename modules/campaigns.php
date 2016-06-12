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
	  			['Name'=>'id', 'Searchable' => false, 'Order' => null, 'Expression'=>'campaignes.id'],
	  			['Name'=>'name', 'Searchable' => true, 'Order' => null, 'Expression'=>'campaignes.name'],
	  			['Name'=>'template', 'Searchable' => true, 'Order' => null, 'Expression'=>'templates.name'],
	  			['Name'=>'email_list', 'Searchable' => true, 'Order' => null, 'Expression'=>'email_lists.name'],
	  			['Name'=>'server', 'Searchable' => true, 'Order' => null, 'Expression'=>'servers.name'],
	  			['Name'=>'start_time', 'Searchable' => true, 'Order' => null, 'Expression'=>null],
	  			['Name'=>'status', 'Searchable' => true, 'Order' => null, 'Expression'=>'campaignes.status'],
	  		],
	  		'FROM campaignes INNER JOIN servers ON campaignes.server_id=servers.id INNER JOIN templates ON campaignes.template_id=templates.id INNER JOIN email_lists ON campaignes.email_list_id=email_lists.id WHERE campaignes.user_id='.$User['id']
	  		)
	  	);
    return;
  	case 'Add':
  		Respond(DataTable::Insert('campaignes', $_POST));
    return;
  	case 'GetByKeys':
  		Respond(DataTable::GetByKeys('campaignes', $_POST));
    return;
  	case 'Save':
  		Respond(DataTable::Save('campaignes', $_POST));
    return;
  	case 'Delete':
  		Respond(DataTable::Delete('campaignes', $_POST));
    return;
  	case 'GetOptions':
		$templates = Db::GetRowArray("SELECT id, name FROM templates WHERE user_id=".$User['id']);
		$servers = Db::GetRowArray("SELECT id, name FROM servers WHERE user_id=".$User['id']);
		$email_lists = Db::GetRowArray("SELECT id, name FROM email_lists WHERE user_id=".$User['id']);
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