/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Test.Uize.Loc.FileFormats.AndroidStrings Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2014 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/* Module Meta Data
	type: Test
	importance: 1
	codeCompleteness: 5
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Test.Uize.Loc.FileFormats.AndroidStrings= module defines a suite of unit tests for the =Uize.Loc.FileFormats.AndroidStrings= module.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'Uize.Test.Uize.Loc.FileFormats.AndroidStrings',
	builder:function () {
		'use strict';

		var
			/*** no strings ***/
				_stringsNoStrings = {},
				_fileNoStrings =
					'<?xml version="1.0" encoding="utf-8"?>\n' +
					'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
					'</resources>\n',

			/*** one string ***/
				_stringsOneString = {
					foo:'bar'
				},
				_fileOneString =
					'<?xml version="1.0" encoding="utf-8"?>\n' +
					'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
					'	<string name="foo">bar</string>\n' +
					'</resources>\n',

			/*** multiple strings ***/
				_stringsMultipleStrings = {
					foo:'bar',
					baz:'qux',
					hello:'world'
				},
				_fileMultipleStrings =
					'<?xml version="1.0" encoding="utf-8"?>\n' +
					'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
					'	<string name="foo">bar</string>\n' +
					'	<string name="baz">qux</string>\n' +
					'	<string name="hello">world</string>\n' +
					'</resources>\n',

			/*** special characters ***/
				_stringsSpecialCharacters = {
					foo:'This string contains a \' (single quote), a " (double quote), and a \\ (backslash).'
				},
				_fileSpecialCharacters =
					'<?xml version="1.0" encoding="utf-8"?>\n' +
					'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
					'	<string name="foo">This string contains a \\\' (single quote), a \\" (double quote), and a \\\\ (backslash).</string>\n' +
					'</resources>\n'
		;

		return Uize.Test.resolve ({
			title:'Uize.Loc.FileFormats.AndroidStrings Module Test',
			test:[
				Uize.Test.requiredModulesTest ('Uize.Loc.FileFormats.AndroidStrings'),
				Uize.Test.staticMethodsTest ([
					['Uize.Loc.FileFormats.AndroidStrings.from',[
						['Parsing an empty resource strings file produces an empty strings object',
							_fileNoStrings,
							Uize.copy (_stringsNoStrings)
						],
						['Parsing a resource strings file containing just a single string tag produces a strings object with a single string entry',
							_fileOneString,
							Uize.clone (_stringsOneString)
						],
						['Parsing a resource strings file containing multiple string tags produces a strings object with entries for all the strings',
							_fileMultipleStrings,
							Uize.clone (_stringsMultipleStrings)
						],
						['Backslash-escaped double quote, single quote, and backslash characters inside strings are unescaped',
							_fileSpecialCharacters,
							Uize.clone (_stringsSpecialCharacters)
						],

						/*** test support for enclosing values in quotes ***/
							['String values inside string tags can be enclosed in single or double quotes, and these quotes are not considered to be part of the value',
								'<?xml version="1.0" encoding="utf-8"?>\n' +
								'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
								'	<string name="foo">\'This string is enclosed in single quotes.\'</string>\n' +
								'	<string name="bar">"This string is enclosed in double quotes."</string>\n' +
								'</resources>\n',
								{
									foo:'This string is enclosed in single quotes.',
									bar:'This string is enclosed in double quotes.'
								}
							],

						/*** test special handling of limited HTML formatting tags and xliff:g tags ***/
							['A string tag may contain bold, underline, and italics HTML tags for inline formatting.',
								'<?xml version="1.0" encoding="utf-8"?>\n' +
								'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
								'	<string name="foo">This string contains a <b>bolded</b> word, an <u>underlined</u> word, and an <i>italicized</i> sord.</string>\n' +
								'</resources>\n',
								{
									foo:'This string contains a <b>bolded</b> word, an <u>underlined</u> word, and an <i>italicized</i> sord.'
								}
							],
							['Bold, underline, and italics HTML tags inside a string tag may be nested inside one another.',
								'<?xml version="1.0" encoding="utf-8"?>\n' +
								'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
								'	<string name="foo">This string contains a section that is <i><u><b>bolded, underlined, and italicized</b></u></i>.</string>\n' +
								'</resources>\n',
								{
									foo:'This string contains a section that is <i><u><b>bolded, underlined, and italicized</b></u></i>.'
								}
							],
							['A string tag may contain xliff:g tags to denote native code sequences, and the contents of these tags are treated as literal text.',
								'<?xml version="1.0" encoding="utf-8"?>\n' +
								'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
								'	<string name="foo">This string contains an xliff:g tag for a <xliff:g id="someId1">{{nativeCodeSequence}}</xliff:g>.</string>\n' +
								'	<string name="bar">This string two xliff:g tags: <xliff:g id="someId2">{{nativeCodeSequence1}}</xliff:g> and <xliff:g id="someId3">[#nativeCodeSequence2#]</xliff:g>.</string>\n' +
								'</resources>\n',
								{
									foo:'This string contains an xliff:g tag for a {{nativeCodeSequence}}.',
									bar:'This string two xliff:g tags: {{nativeCodeSequence1}} and [#nativeCodeSequence2#].'
								}
							],
							['A string tag may contain xliff:g tags that are wrapped in bold, underline, and italics HTML tags',
								'<?xml version="1.0" encoding="utf-8"?>\n' +
								'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
								'	<string name="foo">This string contains an xliff:g tag for a <i><u><b><xliff:g id="someId">{{nativeCodeSequence}}</xliff:g></b></u></i> that is wrapped in the supported HTML formatting tags.</string>\n' +
								'</resources>\n',
								{
									foo:'This string contains an xliff:g tag for a <i><u><b>{{nativeCodeSequence}}</b></u></i> that is wrapped in the supported HTML formatting tags.'
								}
							]
					]],
					['Uize.Loc.FileFormats.AndroidStrings.to',[
						['Serializing an empty strings object produces a valid resource strings file containing no string nodes',
							Uize.copy (_stringsNoStrings),
							_fileNoStrings
						],
						['Serializing a strings object with a single string entry produces a resource strings file containing just a single string tag',
							Uize.clone (_stringsOneString),
							_fileOneString
						],
						['Serializing a strings object with multiple string entries produces a resource strings file containing string tags for all the strings',
							Uize.clone (_stringsMultipleStrings),
							_fileMultipleStrings
						],
						['Double quote, single quote, and backslash characters inside strings are escaped with backslashes, to satisfy the idiosyncratic requirements of the Android resource file format',
							Uize.clone (_stringsSpecialCharacters),
							_fileSpecialCharacters
						]
					]]
				])
			]
		});
	}
});

