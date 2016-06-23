'use strict';

//angular.module('Templates')

app.controller('TemplatesController',
    ['$scope', '$rootScope', '$route',
    function ($scope, $rootScope, $route) {
    	
    	$scope.FillTable = function(){
    		
			var definition = Cliver.InitTable();
			definition.table_id = 'table_Templates';
			definition.server = {
               	request_path: $rootScope.ApiUrl($route),
            };
            var show_row_editor = definition.show_row_editor;
			definition.show_row_editor = function(content_div_e, title, get_data_url, get_data_parameters, ok_button_text, put_data_url, on_ok_success){
				console.log(1);
				var e = show_row_editor(content_div_e, title, get_data_url, get_data_parameters, ok_button_text, put_data_url, on_ok_success);
				
				var a = content_div_e.find('textarea:first');
				a.uniqueId();
				init_textarea('#' + a.attr('id'));
		        return e;				
			};				
			Cliver.InitTable(definition);
						
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
			console.log(selector);
			var t = tinymce.init({
			  selector: selector,
			  width: 500,
			  height: 100,
			  plugins: [
			    'advlist autolink lists link image charmap print preview anchor',
			    'searchreplace visualblocks code fullscreen',
			    'insertdatetime media table contextmenu paste code'
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
    
/*app
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
                tinymce.init(options);
                
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
}]);*/ 