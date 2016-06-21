var Cliver = {	
	
	Ajax: {			
		Request: function (url, data, on_success=null) {
            $.ajax({
	            type: 'POST',
	            url: url,
	            data: data,
	            success: function (data) {
					if (Cliver.Ajax.GetError(data)) 
			            return;
			        if(on_success)
			        	on_success(data.Data);
	            },
	            error: function (xhr, error) {
	                console.log(error, xhr);
                	Cliver.ShowError(xhr.responseText + "<br>" + error);
	            }
	        });
		},
		
		GetError: function (data) {
		    if (typeof(data) == 'string') {//exception catched by Logger	    
				Cliver.ShowError(data);
		        return data;
		    }
		    if (data.Error) {
		        Cliver.ShowError(data.Error);
		        return data.Error;
		    }
		    return null;
		},
		
		GetData: function (data) {
		    return data.Data;
		},		
	},	
		
	UpdateQueryStringParameter: function (uri, key, value) {		
		var r = new RegExp('([?&])' + key + '(=[^&#]*)?', 'ig');
    	var u = uri.replace(r, '$1' + key + "=" + value);
    	if(r.test(u))
    		return u;
		var s = uri.indexOf('?') < 0 ? '?' : '&';
		var r = /(.*?)(#.*)?$/i;
    	return uri.replace(r, '$1' + s + key + "=" + value + '$2');
	},

	ProcessingImageSrc: 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==',
	
	ShowMessage: function(content, title) {
	    if (!title)
	        title = '&nbsp;';
	    var html = '<div title="' + title + '"><p>' + content + '</p></div>';
	    var e = $(html);
	    $("body").append(e);

	    e.on('dialogclose', function (event) {
	        e.remove();
	    });

	    e.dialog({
	        resizable: true,
	        height: 'auto',
	        width: 'auto',
	        modal: true,
	        buttons: {
	            "OK": function () {
	                $(this).dialog("close");
	            }
	        },
	        show: {
	            effect: "clip",
	            duration: 400
	        },
	        hide: {
	            effect: "fade",
	            duration: 400
	        }
	    });
	    e.dialog().dialog("widget").draggable("option", "containment", false);
	    
	    Cliver.ArrangeDialogWindow(e);
	    return e;
	},

	ShowError: function(content, title) {
	    if (!title)
	        title = "ERROR";
	    var html = '<div title="' + title + '" style="color:#f00;"><p><span class="ui-icon-alert" style="float:left; margin:0 7px 20px 0;""></span>' + content + '</p></div>';
	    var e = $(html);
	    $("body").append(e);

	    e.on('dialogclose', function (event) {
	        e.remove();
	    });

	    e.dialog({
	        resizable: true,
	        height: 'auto',
	        width: 'auto',
	        modal: true,
	        buttons: {
	            "OK": function () {
	                $(this).dialog("close");
	            }
	        },
	        show: {
	            effect: "highlight",
	            duration: 400
	        },
	        hide: {
	            //effect: "blind",
	            effect: "fade",
	            duration: 400
	        }
	    });
	    e.dialog().dialog("widget").draggable("option", "containment", false);

	    Cliver.ArrangeDialogWindow(e);
	    return e;
	},

	ArrangeDialogWindow: function(e) {
	    if (!$(e).dialog("isOpen"))
	        return;
	    var h = $(e).parent().height() - $(window).height();
	    if (h > 0)
	        $(e).height($(e).height() - h - 10);
	    var w = $(e).parent().width() - $(window).width();
	    if (w > 0)
	        $(e).width($(e).width() - w - 10);

	    e.dialog({ "position": { my: "center", at: "center", of: window, collision: 'fit' } });
	        
	    //fixing a bug when the box is stuck with the right edge of the window
	    var s = $(e).parent().offset().left + $(e).parent().outerWidth() - $(window).width();
	    if (s + 2 > 0) {
	        var w = $(e).outerWidth() - $(e).parent().offset().left;
	        $(e).width(w);
	        e.dialog({ "position": { my: "center", at: "center", of: window, collision: 'fit' } });
	    }
	},
		
	AskYesNo: function(content, title, on_answer) {
	    if (!title)
	        title = '&nbsp;';
	    var html = '<div title="' + title + '"><p>' + content + '</p></div>';
	    var e = $(html);
	    $("body").append(e);
	    e.uniqueId();
	    
	    return Cliver.ShowDialog({
	    	content_div_id: e.attr('id'),
	    	dialog: {
		        resizable: true,
		        height: 'auto',
		        width: 'auto',
		        modal: true,
		        buttons: {
		            "Yes": function () {
		                on_answer(true);
		            },
		            "No": function () {
		                on_answer(false);
		            }
		        },
		        show: {
		            effect: "clip",
		            duration: 400
		        },
		        hide: {
		            effect: "fade",
		            duration: 400
		        }
	    	}
	    });
	},

	ShowDialog: function(definition) {
	    var definition_ = {
	        content_div_id: null,
	        duplicate_content_div: false,
	        adjust: true,
	        background: null,
	        dialog:{
	            //close: definition_.on_close,
	            //open: function (event, ui) {
	            //},
	            create: function (event, ui) {
	                var e = definition_._e;
	                Cliver.ArrangeDialogWindow(e);
	            },
	            resizeStop: function (event, ui) {
	                var e = definition_._e;
	                //e.dialog({ "position": { my: "center", at: "center", of: window, collision: 'fit' } });
	            },
	            title: '',
	            maxHeight: $(window).height() - 10,
	            maxWidth: $(window).width() - 10,
	            closeOnEscape: true,
	            draggable: true,
	            resizable: true,
	            height: 'auto',
	            width: 'auto',
	            modal: true,
	            buttons: null,
	            show: {
	                effect: "fade",
	                duration: 400
	            },
	            hide: {
	                effect: "fade",
	                duration: 400
	            },
	            closeOnEscape: true,
	        },
	        on_close: function (event, ui) {
	            var e = definition_._e;
	            if (e.definition.content_div_id && !e.definition.duplicate_content_div)
	                e.dialog("close");
	                //e.dialog("destroy");
	            else
	                e.remove();
	        },
	        _e:"!!!",
	    };
	    if (!definition)
	        return definition_;
	        
	    function merge(f, s, overwrite) {
	        for (var i in s) {
	            if ($.type(s[i]) != 'object' && $.type(s[i]) != 'array') {
	                if (overwrite || f[i] == undefined)
	                    f[i] = s[i];
	            }
	            else {
	                if (f[i] == undefined) {
	                    if ($.type(s[i]) == 'object')
	                        f[i] = {};
	                    else
	                        f[i] = [];
	                }
	                merge(f[i], s[i], overwrite);
	            }
	        }
	        return f;
	    }
	    //be sure that the output definition has come as InitTable parameter! 
	    //If using an internal object as definition, it will bring to buggy confusing when several dialogs are on the same page
	    definition = merge(definition, definition_);
	    
	    if (!definition.dialog.close)
	        definition.dialog.close = definition.on_close;
	    
	    var e;
        if (definition.content_div_id && !definition.duplicate_content_div){
	        content_e = $("#" + definition.content_div_id);
	        var old_e = content_e.parent();
	        if (old_e.hasClass('ui-dialog-content')){
	        	//console.log(old_e);
	        	e = old_e;
	            e.dialog('open');
	        }
	    }
	    
	    if(!e){
		    var html = '<div><div class="_loading" style="height:100%;width:100%;position:absolute;z-index:10;display:none;background-color:white;"><img src="' + Cliver.ProcessingImageSrc + '" style="display:block;margin:auto;position:relative;top:50%;transform:translateY(-50%);"/></div></div>';
		    var e = $(html);
		    e.definition = definition;
		    //actually defintion's functions are using the object where they are defined, so dialog is to be passed there!
		    definition_._e = e;
		    	    
		    var content_e;
		    if (definition.content_div_id) {
			    var parent_e = $("#" + definition.content_div_id).parent();
			    parent_e.append(e);
			    
		    	if(definition.duplicate_content_div){
			        content_e = $($("#" + definition.content_div_id)[0].outerHTML);
			    	e.append(content_e);
			    	var angular_controller_e = e.closest('[ng-controller]');
			    	if(angular_controller_e.length){				
			    		angular.element(angular_controller_e).injector().invoke(function($compile) {
		  					var scope = angular.element(e).scope();
		  					$compile(e)(scope);
						});	
					}				
				}
				else{
			        content_e = $("#" + definition.content_div_id);
			    	e.append(content_e);
			    	var angular_controller_e = e.closest('[ng-controller]');
			    	if(angular_controller_e.length){				
			    		angular.element(angular_controller_e).injector().invoke(function($compile) {
		  					var scope = angular.element(e).scope();
		  					$compile(e)(scope);
		  					console.log(1);
						});	
					}
				}
				
			    content_e.uniqueId();
			    parent_e.uniqueId();	        
			    content_e.addClass("_content");
			    definition.dialog.appendTo = '#' + parent_e.attr('id');
			    content_e.show();	
		    }
		    else {
		        content_e = $('<div class="_content"></div>');
		    	e.append(content_e);	    	
		    	$("body").append(e);
		    }
		            
		    e.dialog(definition.dialog);
		    e.dialog().dialog("widget").draggable("option", "containment", [-2000, 0, 2000, 1000]);

		    if (definition.background) {
		        e.parent().find('*[class^="ui-resizable-handle"]').css('background-color', definition.background);
		        e.parent().find('.ui-widget-content').css('background-color', definition.background);
		        e.parent().css('background', definition.background);
		    }			
		}

	    e.show_processing = function (show) {
	        if (show || show === undefined)
	            e.find("._loading").show();
	        else 
	            e.find("._loading").hide();
	    }
	    
	    e.title = function (html) {
	        if (html == undefined)
	            return e.parent().find(".ui-dialog-title").html();
	        e.parent().find(".ui-dialog-title").html(html);
	    }

	    e.content = function (html) {
	        if (html == undefined)
	            return e.find("._content").html();
	        e.find("._content").html(html);
	    }

	    e.getContentByAjax = function (ajax_config, on_success) {
	        if (ajax_config["type"] == undefined)
	            ajax_config["type"] = "POST";
	        ajax_config["success"] = function (response) {
	            e.show_processing(false);
	            on_success(response);
	            if (e.definition.adjust)
	                Cliver.ArrangeDialogWindow(e);
	        };
	        ajax_config["error"] = function (xhr, error) {
	            e.show_processing(false);
	            Cliver.ShowError(xhr.responseText, error);
	        };
	        e.show_processing();
	        $.ajax(ajax_config);
	    }

	    e.is_open = function(){
	        return $(e).dialog("isOpen");
	    }

	    e.show = function(){
	        return $(e).dialog("open");
	    }
	    
	    e.hide = function(){
	        return $(e).dialog("close");
	    }

	    e.destroy = function(){
	        return e.remove();
	    }	                
	    
	    e.close = definition.on_close;
	    e.definition = definition;

	    return e;
	},

	InitTable: function(definition) {
	    var definition_ = {
	        on_row_clicked: function (event) {
	            var row = $($(event.target).parents('tr'));
	            var table = definition_._table;
	            if (row.hasClass('selected')) {
	                row.removeClass('selected');
	            }
	            else {
	                table.$('tr.selected').removeClass('selected');
	                row.addClass('selected');
	            }
	            if (row.hasClass('selected')) {
	                var t = row.offset().top;
	                var r = table.parents(".dataTables_wrapper");
	                if (table.menu.left) {
	                    table.menu.left.css('visibility', 'visible');
	                    if (table.menu.left.hasClass('outside'))
	                        table.menu.left.offset({ 'top': t, 'left': r.offset().left - table.menu.left.outerWidth() });
	                    else
	                        table.menu.left.offset({ 'top': t, 'left': r.offset().left });
	                    table.menu.left.css("padding-top", row.find('td:first').css("padding-top"));
	                    table.menu.left.css("padding-bottom", row.find('td:first').css("padding-bottom"));
	                    table.menu.left.innerHeight(row.innerHeight());
	                }
	                if (table.menu.right) {
	                    table.menu.right.css('visibility', 'visible');
	                    if (table.menu.right.hasClass('outside'))
	                        table.menu.right.offset({ 'top': t, 'left': r.offset().left + r.outerWidth(true) });
	                    else
	                        table.menu.right.offset({ 'top': t, 'left': r.offset().left + r.outerWidth(true) - table.menu.right.outerWidth() });
	                    table.menu.right.css("padding-top", row.find('td:first').css("padding-top"));
	                    table.menu.right.css("padding-bottom", row.find('td:first').css("padding-bottom"));
	                    table.menu.right.innerHeight(row.innerHeight());
	                }
	            }
	            else {
	                if (table.menu.left)
	                    table.menu.left.css('visibility', 'hidden');
	                if (table.menu.right)
	                    table.menu.right.css('visibility', 'hidden');
	            }
	        },
	        on_row_filling: function (row, cs, index) {
	            for (i in cs) {
	                if ($.type(cs[i]) == 'string') {
	                    var h = cs[i].replace(/(\d{4}\-\d{2}\-\d{2})T(\d{2}\:\d{2}:\d{2})(\.\d+)?/ig, "$1 $2");
	                    h = h.replace(/(<a\s.*?<\/a\s*>|<img\s.*?>|https?\:\/\/[^\s<>\'\"]*)/ig, function (m) {
	                        if (m[0] == "<")
	                            return m;
	                        return "<a href=\"" + m + "\">" + m + "</a>";
	                    });
	                    cs[i] = h;
	                }
	            }
	            var table = definition_._table;
	            if (!table.api)//when filling table by html, this function is called before _table is set. 
	                table = $(row).parents('table').dataTable();
	            table.api().row(index).data(cs);
	        },
	        show_row_editor: function (content_div_e, title, get_data_url, get_data_parameters, ok_button_text, put_data_url, on_ok_success) {
	        	return Cliver.ShowDialog({content_div_id: content_div_e.attr('id'), dialog: { title: title } });
	        	
	            var e;
				
	            var buttons = {};
	            if (put_data_url) {
	                buttons[ok_button_text] = function () {
						var angular_controller_scope = content_div_e.closest('[ng-controller]').scope();
						var data = angular_controller_scope.Data;
						
						if(content_div_e.find('form').scope().Form.$invalid)
							return;
						//var data = form.serialize();
						
						//console.log(angular_controller_scope);
						//console.log(data);
	                    //if (!form.valid()){
						//	console.log(data);
	                    //    return;
						//}

	                    e.show_processing();

	                    $.ajax({
	                        type: 'POST',
	                        url: put_data_url,
	                        data: data,
	                        success: function (data) {
	                            e.show_processing(false);
								if (Cliver.Ajax.GetError(data)) 
				                    return;
	                            e.close();	                                
	                            if(on_ok_success)
	                              	on_ok_success();
	                        },
	                        error: function (xhr, error) {
	                            e.show_processing(false);
	                            Cliver.ShowError(xhr.responseText);
	                        }
	                    });
	                };
	                buttons["Cancel"] = function () {
	                    e.close();
	                }
	            }
	            else {
	                buttons[ok_button_text] = function () {
	                    e.close();
	                }
	            }
	            
				content_div_e.uniqueId();
	            e = Cliver.ShowDialog({content_div_id: content_div_e.attr('id'), dialog: { buttons: buttons, title: title } });
	            if(get_data_url)
	            {
			        e.show_processing();
		            $.ajax({
		                type: 'POST',
		                url: get_data_url,
		                data: get_data_parameters,
		                success: function (data) {
							if (Cliver.Ajax.GetError(data)) 
			                    return;
		                   
		                    var angular_controller_e = content_div_e.closest('[ng-controller]');  
							var angular_controller_scope = angular.element(angular_controller_e).scope();
		                    angular_controller_scope.$apply(function() {
	    						angular_controller_scope.Data = data.Data;
	  						});
	  						
		                    e.show_processing(false);
		                },
		                error: function (xhr, error) {
		                    e.show_processing(false);
		                    Cliver.ShowError(xhr.responseText);
		                }
		            });
	            }

	            return e;
	        },
	        table_id: null,
	        server: {
	            request_path: "!!!",
	            actions_prefix: '',
	        },
	        key_column_ids2name: {
	            0: "id",
	        },
	        menu: {
	            top: {
	                new: true,
	            },
	            left: {
	                delete: true,
	            },
	            right: {
	                details: true,
	                edit: true,
	            },
	            _templates: {
	                new: {
	                    text: "New",
	                    onclick: function () {
	                        var table = definition_._table;
	                        table.closest('[ng-controller]').scope().Data = null;
	                        table.closest('[ng-controller]').scope().$apply();
	                        table.modalBox = table.definition.show_row_editor(	                        
	                        	table.closest('[ng-controller]').find('[edit-form]'),
	                        	'New',
	                        	null,
	                        	null,
	                        	"Add",
	                        	Cliver.UpdateQueryStringParameter(table.definition.server.request_path, 'action', 'Add'), 
	                        	function () {
	                            	if (table.definition.server)
	                                	table.api().draw(false);
	                        	}
	                        );
	                        return false;
	                    },
	                    response_data: null,
	                    style: null,
	                    class: null,
	                },
	                details: {
	                    text: "Details",
	                    onclick: function () {
	                        var table = definition_._table;
	                        if (!table.$('tr.selected').is("tr")) {
	                            Cliver.ShowMessage("No row selected!", "Warning");
	                            return false;
	                        }
	                        var parameters = {};
	                        for (i in table.definition.key_column_ids2name)
	                            parameters[table.definition.key_column_ids2name[i]] = table.fnGetData(table.$('tr.selected'))[i];
	                        
	                        table.modalBox = table.definition.show_row_editor(	                        
	                        	table.closest('[ng-controller]').find('[details-form]'),
	                        	'Details',
	                        	Cliver.UpdateQueryStringParameter(table.definition.server.request_path, 'action', 'GetByKeys'), 
	                        	parameters,
	                        	'OK',
	                        	null,
	                        	null
	                        );
	                        return false;
	                    },
	                    style: null,
	                },
	                edit: {
	                    text: "Edit",
	                    onclick: function () {
	                        var table = definition_._table;
	                        if (!table.$('tr.selected').is("tr")) {
	                            ShowMessage("No row selected!", "Warning");
	                            return false;
	                        }
	                        var parameters = {};
	                        for (i in table.definition.key_column_ids2name)
	                            parameters[table.definition.key_column_ids2name[i]] = table.fnGetData(table.$('tr.selected'))[i];
	                        
	                        table.modalBox = table.definition.show_row_editor(	                        
	                        	table.closest('[ng-controller]').find('[edit-form]'),
	                        	'Edit',
	                        	Cliver.UpdateQueryStringParameter(table.definition.server.request_path, 'action', 'GetByKeys'), 
	                        	parameters,
	                        	"Save",
	                        	Cliver.UpdateQueryStringParameter(table.definition.server.request_path, 'action', 'Save'), 
	                        	function () {
	                            	if (table.definition.server)
	                                	table.api().draw(false);
	                        	}
	                        );
	                        return false;
	                    },
	                    style: null,
	                },
	                delete: {
	                    text: "Delete",
	                    onclick: function () {
	                        var table = definition_._table;
	                        if (!table.$('tr.selected').is("tr")) {
	                            ShowMessage("No row selected!", "Warning");
	                            return false;
	                        }
	                        var parameters = {};
	                        for (i in table.definition.key_column_ids2name)
	                            parameters[table.definition.key_column_ids2name[i]] = table.fnGetData(table.$('tr.selected'))[i];

   //$( "#dialog" ).dialog({ buttons: [ { id:"test","data-test":"data test", text: "Ok", click:    function() {alert($('#test').data('test')); $( this ).dialog( "close" ); } } ] });

	                        var e = Cliver.AskYesNo("Are you sure deleting the selected record?", "Warning", function(result){
	                        	if(!result){
	                				e.close();
	                				return;
								}
	                        	
				                e.show_processing();							
				                $.ajax({
				                    type: 'POST',
				                    url: Cliver.UpdateQueryStringParameter(table.definition.server.request_path, 'action', 'Delete'), 
				                    data: parameters,
				                    success: function (data) {
										if (Cliver.Ajax.GetError(data))
						                    return;						                
				                        e.close();
				                        if (table.definition.server)
	                            			table.api().draw(false);
				                    },
				                    error: function (xhr, error) {
				                        e.show_processing(false);
				                        Cliver.ShowError(xhr.responseText);
				                    }
				                });
	                        });
	                        return false;
	                    },
	                    style: "color:#f00;",
	                },
	            },
	        },
	        datatable: {
	            serverSide: true,
	            //ajax: {
	            //    url: null,
	            //    type: 'POST',
	            //},
	            columnDefs: [
	                {
	                    visible: false,
	                    targets: 0
	                },
	            ],
	            scrollX: true,
	            processing: true,
	            language: {
	                processing: '<img src="' + Cliver.ProcessingImageSrc + '" style="z-index:1;position:relative"/>'
	            },
	            createdRow: null,
	            //rowCallback: definition.on_row_filling,
	            paging: true,
	            //ordering: false,
	            //info: false 
	            //"columnDefs": [
	            //    { "visible": false, "targets": 0 },
	            //],
	            //"columns": [
	            //  { "visible": false },
	            //  null,
	            //  null,
	            //],
	            //"stateSave": true,
	            //initComplete: function (settings, json) { alert(json);}
	        },
	        _table: "!!!",
	        _merge: function merge(f, s, overwrite) {
	            for (var i in s) {
	                if ($.type(s[i]) != 'object' && $.type(s[i]) != 'array') {
	                    if (overwrite || f[i] == undefined)
	                        f[i] = s[i];
	                }
	                else {
	                    if (f[i] == undefined) {
	                        if ($.type(s[i]) == 'object')
	                            f[i] = {};
	                        else
	                            f[i] = [];
	                    }
	                    merge(f[i], s[i], overwrite);
	                }
	            }
	            return f;
	        },
	    };
	    if (!definition)
	        return definition_;

	    //be sure that the output definition has come as InitTable parameter! 
	    //If using an internal object as definition, it will bring to buggy confusing when several datatables on the same page
	    var definition = definition_._merge(definition, definition_);

	    if (!definition.server.actions_prefix)
	        definition.server.actions_prefix = '';
	    //if (!definition.datatable.ajax.url)
	    //    definition.datatable.ajax.url = definition.server.request_path + "/TableJson" + definition.server.actions_prefix;    
	    if (!definition.datatable.ajax){
	        definition.datatable.ajax = function (data, callback, settings) {
	            $.ajax({
	                type: 'POST',
	                url: Cliver.UpdateQueryStringParameter(definition.server.request_path, 'action', 'GetTableData'),// + definition.server.actions_prefix,
	                data: data,
	                success: function (data) {
						if (Cliver.Ajax.GetError(data)) {
	                        if(data.Data)
	                        	data = data.Data;
	                        else
	                        	data = { draw: 0, recordsTotal: 0, recordsFiltered: 0, data: [] };
	                    }
	                    callback(data.Data);
	                },
	                error: function (xhr, error) {
	                    console.log(error, xhr);
	                    Cliver.ShowError(xhr.responseText + '<br>' + error);
	                }
	            });
	        }
	    }
	    if (!definition.datatable.createdRow)
	        definition.datatable.createdRow = definition.on_row_filling;

	    for (var i in definition.menu)
	        for (var j in definition.menu[i])
	            if (definition.menu[i][j] === true)
	                definition.menu[i][j] = definition.menu._templates[j];
	            else if (definition.menu[i][j] === false)
	                delete definition.menu[i][j];

	    if (!definition.datatable.serverSide)
	        definition.datatable.ajax = false;

	    var t;
	    if (definition.table_id)
	        t = $("#" + definition.table_id);
	    else
	        t = $("table:last");
	    t.css('width', '100%');
	    var table = t.dataTable(definition.datatable);
	    //actually defintion's functions are using the object where they are defined, so table is to be passed there!
	    definition_._table = table;
	    //also some redefined functions may come from the customer's defintion, so table is to be passed there as well.
	    definition._table = table;

	    if (definition.datatable.serverSide) {
	        var search_box = table.parent().find(".dataTables_filter").find("input");
	        //search_box.keyup(function () {
	        search_box.on('keyup', function (event) {
	            if (event.keyCode == 13) {
	                table.api().search(search_box.val()).draw();
	            }
	        });
	    }

	    var menu = {};
	    var fill_menu = function (me, md) {
	        for (var i in md) {
	            var b = $('<a href="#" name=' + i + ' class="' + (md[i].class ? md[i].class : 'button') + '" style="' + (md[i].style ? md[i].style : '') + '">' + md[i].text + '</a>');
	            me.append(b);
	            b.click(md[i].onclick);
	        }
	    }
	    if (!$.isEmptyObject(definition.menu.top)) {
	        menu.top = $('<p class="table_fixed_menu"></p>');
	        table.parents(".dataTables_wrapper").before(menu.top);
	        fill_menu(menu.top, definition.menu.top);
	    }
	    if (!$.isEmptyObject(definition.menu.right)) {
	        menu.right = $('<div class="table_floating_menu" style="visibility: hidden; position: absolute;"></div>');
	        table.parents(".dataTables_wrapper").after(menu.right);
	        fill_menu(menu.right, definition.menu.right);
	    }
	    if (!$.isEmptyObject(definition.menu.left)) {
	        menu.left = $('<div class="table_floating_menu" style="visibility: hidden; position: absolute;"></div>');
	        table.parents(".dataTables_wrapper").after(menu.left);
	        fill_menu(menu.left, definition.menu.left);
	    }

	    if (definition.on_row_clicked)
	        table.find('tbody').on('click', 'tr', definition.on_row_clicked);

	    table.on('draw.dt', function () {
	        if (menu.left)
	            menu.left.css('visibility', 'hidden');
	        if (menu.right)
	            menu.right.css('visibility', 'hidden');
	    });

	    table.show_processing = function (show) {
	        var e = $('.dataTables_processing', table.closest('.dataTables_wrapper'));
	        if (show || show === undefined)
	            e.show();
	        else
	            e.hide();
	    }

	    table.menu = menu;
	    table.definition = definition;
	    
	    return table;
	}
}
