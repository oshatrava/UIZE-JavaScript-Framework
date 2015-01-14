/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Loc.Plurals.Langs.gv Package
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2015 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/* Module Meta Data
	type: Package
	importance: 1
	codeCompleteness: 100
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Loc.Plurals.Langs.gv= module implements a .

		*DEVELOPERS:* `Chris van Rensburg`

		Plural Categories
			........................................................
			<< table >>

			title: Plural Categories
			data:
			:| Category | Rule |
			:| one | v = 0 and i % 10 = 1 @integer 1, 11, 21, 31, 41, 51, 61, 71, 101, 1001, … |
			:| two | v = 0 and i % 10 = 2 @integer 2, 12, 22, 32, 42, 52, 62, 72, 102, 1002, … |
			:| few | v = 0 and i % 100 = 0,20,40,60,80 @integer 0, 20, 40, 60, 80, 100, 120, 140, 1000, 10000, 100000, 1000000, … |
			:| many | v != 0   @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, … |
			:| other |  @integer 3~10, 13~19, 23, 103, 1003, … |
			........................................................
*/

Uize.module ({
	name:'Uize.Loc.Plurals.Langs.gv',
	required:'Uize.Loc.Plurals.Util',
	builder:function () {
		'use strict';

		return Uize.package ({
			getPluralCategory:function (_value) {
				return Uize.Loc.Plurals.Util.getPluralCategory (
					_value,
					function (n,i,f,t,v,w,within) {
						return v == 0 && i % 10 == 1 ? 'one' : v == 0 && i % 10 == 2 ? 'two' : v == 0 && within (i % 100,[0,20,40,60,80]) ? 'few' : v != 0 ? 'many' : 'other';
					}
				);
			}
		});
	}
});

