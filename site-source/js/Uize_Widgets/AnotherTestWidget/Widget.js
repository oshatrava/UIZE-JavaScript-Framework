/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Widgets.AnotherTestWidget.Widget Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2013 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/* Module Meta Data
	type: Class
	importance: 1
	codeCompleteness: 5
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Widgets.AnotherTestWidget.Widget= class implements a test widget being used during development of the new =Uize.WidgetV2= widget base class to test this class' functionality.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'Uize.Widgets.AnotherTestWidget.Widget',
	superclass:'Uize.WidgetV2',
	required:[
		'Uize.Widgets.AnotherTestWidget.Html',
		'Uize.Widgets.AnotherTestWidget.Css'
	],
	builder:function (_superclass) {
		'use strict';

		var _class = _superclass.subclass ({
			set:{
				html:Uize.Widgets.AnotherTestWidget.Html
			},

			staticProperties:{
				cssModule:Uize.Widgets.AnotherTestWidget.Css
			}
		});

		return _class;
	}
});
