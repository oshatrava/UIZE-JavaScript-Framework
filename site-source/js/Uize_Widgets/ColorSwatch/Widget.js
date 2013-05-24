/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Widgets.ColorSwatch.Widget Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2010-2013 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/* Module Meta Data
	type: Class
	importance: 3
	codeCompleteness: 100
	docCompleteness: 30
*/

/*?
	Introduction
		The =Uize.Widgets.ColorSwatch.Widget= class implements a basic widget for previewing a color value...

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'Uize.Widgets.ColorSwatch.Widget',
	superclass:'Uize.Widget.V2',
	required:[
		'Uize.Color',
		'Uize.Widgets.ColorSwatch.Html',
		'Uize.Widgets.ColorSwatch.Css'
	],
	builder:function (_superclass) {
		'use strict';

		function _updateUiValue () {
			var _this = this;
			if (_this.isWired) {
				_this.setNodeStyle ('',{backgroundColor:Uize.Color.to (_this._value,'#hex')});
			}
		}

		return _superclass.subclass ({
			instanceMethods:{
				updateUi:_updateUiValue
			},

			stateProperties:{
				_size:{
					name:'size',
					value:'medium'
				},
				_value:{
					name:'value',
					onChange:_updateUiValue,
					value:'#000000'
					/*?
						State Properties
							value
								A value of any type and format supported by the =Uize.Color= module, specifying the current color for which the widget should display information.

								Basically, color values can be specified for this property in any way that a color can be specified when using the single parameter variations of the =Uize.Color= constructor.

								NOTES
								- the initial value is ='#000000'=
					*/
				}
			},

			set:{
				html:Uize.Widgets.ColorSwatch.Html
			},

			staticProperties:{
				cssModule:Uize.Widgets.ColorSwatch.Css
			},

			stateToCssBindings:{
				size:'value'
			}
		});
	}
});
