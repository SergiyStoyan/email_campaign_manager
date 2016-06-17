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
  		if(Login::UserType() != 'admin')
  			Respond(null, "User of type '".Login::UserType()."' cannot do this operation.");
	  	Respond(DataTable::FetchData(
	  		[
	  			['Name'=>'id', 'Searchable' => false, 'Order' => null, 'Expression'=>null],
	  			['Name'=>'name', 'Searchable' => true, 'Order' => null, 'Expression'=>null],
	  			['Name'=>'email', 'Searchable' => true, 'Order' => null, 'Expression'=>null],
	  			['Name'=>'type', 'Searchable' => true, 'Order' => null, 'Expression'=>null],
	  		],
	  		'FROM users'
	  		)
	  	);
    return;
  	case 'Add':
  		if(Login::UserType() != 'admin')
  			Respond(null, "User of type '".Login::UserType()."' cannot do this operation.");
  		Respond(DataTable::Insert('users', $_POST));
    return;
  	case 'GetByKeys':
  		if(Login::UserType() != 'admin' and Login::UserId() != $_POST['id'])
  			Respond(null, "User of type '".Login::UserType()."' cannot do this operation for another user.");
  		Respond(DataTable::GetByKeys('users', $_POST));
    return;
  	case 'Save':
  		if(Login::UserType() != 'admin' and Login::UserId() != $_POST['id'])
  			Respond(null, "User of type '".Login::UserType()."' cannot do this operation for another user.");
  		if(Login::UserId() == $_POST['id'] and Login::UserType() != $_POST['type'])
  			Respond(null, "You cannot change user type to yourself.");
  		Respond(DataTable::Save('users', $_POST));
    return;
  	case 'Delete':
  		if(Login::UserType() != 'admin' and Login::UserId() != $_POST['id'])
  			Respond(null, "User of type '".Login::UserType()."' cannot do this operation for another user.");
  		if(Login::UserId() == $_POST['id'])
  			Respond(null, "You cannot delete own account.");
  		Respond(DataTable::Delete('users', $_POST));
    return;
	default:
		throw new Exception("Unhandled action: $action");
}

?>