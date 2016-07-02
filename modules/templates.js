'use strict';

//angular.module('Templates')

app.controller('TemplatesController',
    ['$scope', '$rootScope', '$route',
    function ($scope, $rootScope, $route) {
    	
    	$scope.FillTable = function(){				
			Cliver.InitTable({
			 	table_id: 'table_Templates',
			 	server: {
                	request_path: $rootScope.ApiUrl($route),
            	},	
		        show_row_editor: function (content_div_e, title, get_data_url, get_data_parameters, ok_button_text, put_data_url, on_ok_success){		        	
		            var e;
					
		            var buttons = {};
		            if (put_data_url) {
		                buttons[ok_button_text] = function () {
							$scope.Data.template = tinyMCE.activeEditor.getContent({format : 'raw'});
							var data = $scope.Data;
							
							if(content_div_e.find('form').scope().Form.$invalid)
								return;

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
			                   
			                    $scope.$apply(function() {
		    						$scope.Data = data.Data;
		    						tinyMCE.activeEditor.setContent($scope.Data.template, {format : 'raw'});
		  						});
		  					
			                    e.show_processing(false);
			                },
			                error: function (xhr, error) {
			                    e.show_processing(false);
			                    Cliver.ShowError(xhr.responseText);
			                }
			            });
		            }
					
					var a = content_div_e.find('textarea:first');
					a.uniqueId();
					init_textarea('#' + a.attr('id'));
		            return e;
		        }
        	});
		};
			
		//required for tinymce to accept focus
		$(document).on('focusin', function(e) {
    		if ($(e.target).closest(".mce-window, .moxman-window").length) {
				e.stopImmediatePropagation();
			}
		});   		  
	    $.widget("ui.dialog", $.ui.dialog, {
	    	_allowInteraction: function(event) {
	        	return !!$(event.target).closest(".mce-container").length || this._super( event );
	        }
	    });
								
		function init_textarea(selector){
			//console.log(selector);
			var t = tinyMCE.init({
			  selector: selector,
			  valid_elements: '*[*]',
			  width: '100%',
			  height: 400,
			  resize: true,
			  autoresize_min_height: 400,
			  //autoresize_max_height: 800,
			  //inline: true,
			  visual: false,
			  plugins: [
			    'advlist autolink lists link image charmap print preview anchor',
			    'searchreplace visualblocks code fullscreen',
			    'insertdatetime media table contextmenu paste code',
			    'autoresize',
			  ],
			  toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
			  content_css: [
			    '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
			    '//www.tinymce.com/css/codepen.min.css'
			  ],
			});
		}
    }
]);
/*    
app
    .value('uiTinymceConfig', {})
    .directive('uiTinymce', ['uiTinymceConfig', function(uiTinymceConfig) {
    uiTinymceConfig = uiTinymceConfig || {};
    var generatedIds = 0;
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ngModel) {
            var expression, options, tinyInstance;
            // generate an ID if not present
            if (!attrs.id) {
                attrs.$set('id', 'uiTinymce' + generatedIds++);
                        //console.log(attrs);
            }
            options = {
            	plugins:[
				    'advlist autolink lists link image charmap print preview anchor',
				    'searchreplace visualblocks code fullscreen',
				    'insertdatetime media table contextmenu paste code'
				],
				toolbar:'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
				content_css:[
				    '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
				    '//www.tinymce.com/css/codepen.min.css'
				],
                // Update model when calling setContent (such as from the source editor popup)
                setup: function(ed) {
                    ed.on('init', function(args) {
                        ngModel.$render();
                        //console.log(ed);
                    });
                    // Update model on button click
                    ed.on('ExecCommand', function(e) {
                        ed.save();
                        ngModel.$setViewValue(elm.val());
                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                        //console.log(ed);
                       // alert(2);
                    });
                    // Update model on keypress
                    ed.on('KeyUp', function(e) {
                        //console.log(ed.isDirty());
                        ed.save();
                        ngModel.$setViewValue(elm.val());
                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                    });
                },
                mode: 'exact',
                elements: attrs.id
            };
            if (attrs.uiTinymce) {
                expression = scope.$eval(attrs.uiTinymce);
            } else {
                expression = {};
            }
            
            angular.extend(options, uiTinymceConfig, expression);
            setTimeout(function() {                  
				$.widget("ui.dialog", $.ui.dialog, {
			        _allowInteraction: function(e) {
			            return !!$(e.target).closest(".mce-container").length || this._super( event );
			        }
			    });        
	        
				$(document).on('focusin', function(e) {
	    			if ($(e.target).closest(".mce-window, .moxman-window").length) {
						e.stopImmediatePropagation();
					}
				}); 			              
                tinymce.init(options);	
            });

            ngModel.$render = function() {
                if (!tinyInstance) {
                    tinyInstance = tinymce.get(attrs.id);
                }
                if (tinyInstance) {
                    tinyInstance.setContent(ngModel.$viewValue || '');
                }
                console.log(tinyInstance);
                //console.log(ngModel.$viewValue);
                //alert(3);
            };
        }
    };
}]); */