/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Curve.Mod Package
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2009-2014 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/* Module Meta Data
	type: Package
	importance: 4
	codeCompleteness: 90
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Curve.Mod= module defines various curve function modifiers, to enable creation of new curve functions by combining existing curve functions.

		*DEVELOPERS:* `Chris van Rensburg`

		In A Nutshell
			Curve function modifiers are curve function generators that accept curve functions as their primary inputs.

			The =Uize.Curve.Mod= module provides a good selection of these curve function modifiers. Curve function modifiers operate on the curve functions they are provided in order to produce new, modified curve functions. You can consider them as operators that operate on curve functions to produce new curve functions. They could also be thought of as specialized parameterized curve function generators, where some - or all - of the parameters just happen to be curve functions. As an example, the =Uize.Curve.Mod.blend= static method blends the two specified curve functions to produce a new curve function, with blend parameters that let you specify the blend between the two curve functions.

			"What does it mean to blend two functions?" you may ask. No, JavaScript doesn't support some crazy new math that allows us to add or multiply functions. Blending two curve functions is carried out by returning a new curve function that takes an input value, uses each of the two curve functions that are to be blended and obtains a remapped value from each, then blends between those two values to produce a new output value. This has the effect of blending the curves that would be produced by the two curve functions that are being blended - across their entire input value range. So, effectively, you are blending two curve functions to produce a new curve function.

			EXAMPLE
			..............................................
			// quickly to middle, hesitate, quickly to end

			Uize.Curve.Mod.blend (
				Uize.Curve.easeInSweetPow (1/6),
				Uize.Curve.easeOutSweetPow (1/12),
				Uize.Curve.line (0,1)
			)
			..............................................

			In the above example, the curve function generated by the statement =Uize.Curve.easeInSweetPow (1/6)= is being blended with the curve function generated by the statement =Uize.Curve.easeOutSweetPow (1/12)=, with the blend biased towards the first curve function at the lower input values, and biased towards the second curve function at the higher input values.

			VISUALIZE IT

			To better visualize how curve function modifiers work and how they affect motion, visit the interactive [[../examples/curve-explorer.html][Curve Explorer]] tool.

			BACKGROUND READING

			For an in-depth discussion on animation in the UIZE JavaScript Framework, and for a discussion on how this module fits into the larger picture, consult the guide [[../guides/javascript-animation-and-effects.html][JavaScript Animation and Effects]] and read through the section `Curves`.
*/

Uize.module ({
	name:'Uize.Curve.Mod',
	builder:function (_host) {
		'use strict';

		/*** Variables for Scruncher Optimization ***/
			var
				_package,
				_undefined,
				_blendFloats = _host.blendFloats,
				_resolve = _host.resolve,
				_linear = _host.linear
			;

		return _package = Uize.package ({
			band:function (_curveFunction,_sizeX,_alignX,_sizeY,_alignY) {
				_curveFunction = _resolve (_curveFunction);
				if (_sizeY == _undefined) _sizeY = 1;
				var
					_startX = (1 - _sizeX) * (_alignX || 0),
					_endX = _startX + _sizeX,
					_startY = (1 - _sizeY) * (_alignY || 0),
					_endY = _startY + _sizeY
				;
				return (
					_sizeX == 1 && _sizeY == 1
						? _curveFunction
						: !_sizeY
							? function () {return _startY}
							: !_sizeX
								? function (_value) {return _value < _startX ? _startY : _endY}
								: function (_value) {
									return _startY + _sizeY * (
										_value < _startX ? 0 : _value > _endX ? 1 : _curveFunction ((_value - _startX) / _sizeX)
									)
								}
				);
				/*?
					Static Methods
						Uize.Curve.Mod.band
							Returns a curve function, that is the specified source curve function compressed into the specified horizontal and vertical band.

							SYNTAX
							.................................................................................
							curveFUNC = Uize.Curve.Mod.band (
								curveFUNCorFLOAT,sizeX0to1FLOAT,alignX0to1FLOAT,sizeY0to1FLOAT,alignY0to1FLOAT
							);
							.................................................................................

							Parameters
								curveFUNCorFLOAT
									A function reference for a curve function, or a numerical value that will be resolved to a power curve function using the =Uize.Curve.resolve= method, specifying the source curve function that should be compressed into the specified band.

									For a linear curve, the value =1= can be specified for this parameter.

								sizeX0to1FLOAT
									A floating point number in the range of =0= to =1=, specifying the width of the horizontal band.

								alignX0to1FLOAT
									A floating point number in the range of =0= to =1=, specifying the horizontal alignment of the band.

									The value =0= represents left aligned, the value =.5= represents center aligned, and the value =1= represents right aligned. Other values between =0= and =1= represent continuous horizontal alignment between left and right. When the value =1= is specified for the =sizeX0to1FLOAT= parameter, then the =alignX0to1FLOAT= parameter has no effect.

								sizeY0to1FLOAT
									A floating point number in the range of =0= to =1=, specifying the height of the vertical band.

								alignY0to1FLOAT
									A floating point number in the range of =0= to =1=, specifying the vertical alignment of the band.

									The value =0= represents bottom aligned, the value =.5= represents center aligned, and the value =1= represents top aligned. Other values between =0= and =1= represent continuous vertical alignment between bottom and top. When the value =1= is specified for the =sizeY0to1FLOAT= parameter, then the =alignY0to1FLOAT= parameter has no effect.

							VARIATION
							..................................................................................
							curveFUNC = Uize.Curve.Mod.band (curveFUNCorFLOAT,sizeX0to1FLOAT,alignX0to1FLOAT);
							..................................................................................

							When the =sizeY0to1FLOAT= and =alignY0to1FLOAT= parameters are not specified, then no vertical banding will be performed. This is equivalent to specifying the value =1= for the =sizeY0to1FLOAT= parameter. In order to only perform vertical banding and no horizontal banding, you can specify the value =1= for the =sizeX0to1FLOAT= parameter.

							NOTES
							- numerical values for the =curveFUNCorFLOAT= parameter are resolved to curve functions using the =Uize.Curve.resolve= static method
				*/
			},

			bend:function (_curveFunction,_horizontalBend,_verticalBend) {
				_curveFunction = _resolve (_curveFunction);
				var
					_horizontalBendIsLinear = (_horizontalBend = _resolve (_horizontalBend,0,false,-1)) == _linear,
					_verticalBendIsLinear = (_verticalBend = _resolve (_verticalBend,0)) == _linear
				;
				return (
					_horizontalBendIsLinear && _verticalBendIsLinear
						? _curveFunction
						: !_horizontalBendIsLinear && !_verticalBendIsLinear
							? function (_value) {return _verticalBend (_curveFunction (_horizontalBend (_value)))}
							: _horizontalBendIsLinear
								? function (_value) {return _verticalBend (_curveFunction (_value))}
								: function (_value) {return _curveFunction (_horizontalBend (_value))}
				);
				/*?
					Static Methods
						Uize.Curve.Mod.bend
							Returns a curve function, that is the specified source curve function bent in the specified manner in the x- and y-axes.

							SYNTAX
							.....................................................................................
							curveFUNC = Uize.Curve.Mod.bend (curveFUNCorFLOAT,bendXFUNCorFLOAT,bendYFUNCorFLOAT);
							.....................................................................................

							Parameters
								curveFUNCorFLOAT
									A function reference for a curve function, or a numerical value that will be resolved to a power curve function using the =Uize.Curve.resolve= method.

									For a linear curve, the value =1= can be specified for this parameter.

								bendXFUNCorFLOAT
									A function reference for a curve function, or a numerical value that will be resolved to a power curve function using the =Uize.Curve.resolve= method.

									Values less than -1 will bend the curve towards the left. Values greater than =1= will bend the curve towards the right. When the value =null=, =undefined=, =1=, =0=, =-1=, or =Uize.Curve.linear= is specified, then there will be no bending in the x-axis. If a curve function is specified for =bendXFUNCorFLOAT=, then the source curve function will be bent horizontally according to the nature of the specified bend curve. An ease-in-out bend curve will pinch the source curve function towards the center horizontally. An ease-in-the-middle bend curve will squash the source curve function outwards horizontally towards the left and right sides.

								bendYFUNCorFLOAT
									A function reference for a curve function, or a numerical value that will be resolved to a power curve function using the =Uize.Curve.resolve= method.

									Values less than -1 will bend the curve towards the bottom. Values greater than =1= will bend the curve towards the top. When the value =null=, =undefined=, =1=, =0=, =-1=, or =Uize.Curve.linear= is specified, then there will be no bending in the y-axis. If a curve function is specified for =bendYFUNCorFLOAT=, then the source curve function will be bent vertically according to the nature of the specified bend curve. An ease-in-out bend curve will pinch the source curve function towards the center vertically. An ease-in-the-middle bend curve will squash the source curve function outwards vertically towards the top and bottom sides.

							VARIATION
							....................................................................
							curveFUNC = Uize.Curve.Mod.bend (curveFUNCorFLOAT,bendXFUNCorFLOAT);
							....................................................................

							When no =bendYFUNCorFLOAT= parameter is specified, there will be no bending in the y-axis.

							NOTES
							- numerical values for the =curveFUNCorFLOAT=, =bendXFUNCorFLOAT=, and =bendYFUNCorFLOAT= parameters are resolved to curve functions using the =Uize.Curve.resolve= static method
				*/
			},

			blend:function (_curveFunctionA,_curveFunctionB,_blend) {
				if (_blend == _undefined) _blend = .5;

				return (
					(_curveFunctionA = _resolve (_curveFunctionA)) == (_curveFunctionB = _resolve (_curveFunctionB))
						? _curveFunctionA
						: _blend == .5
							? function (_value) {return (_curveFunctionA (_value) + _curveFunctionB (_value)) / 2}
							: Uize.isFunction (_blend)
								?
									function (_value) {
										return _blendFloats (_curveFunctionA (_value),_curveFunctionB (_value),_blend (_value));
									}
								:
									function (_value) {
										return _blendFloats (_curveFunctionA (_value),_curveFunctionB (_value),_blend);
									}
				);
				/*?
					Static Methods
						Uize.Curve.Mod.blend
							Returns a curve function, that is a blend between the two specified source curve functions.

							SYNTAX
							......................................................................................
							curveFUNC = Uize.Curve.Mod.blend (curve1FUNCorFLOAT,curve2FUNCorFLOAT,blend0to1FLOAT);
							......................................................................................

							When the value =0= is specified for the =blend0to1FLOAT= parameter, then the curve function
							specified by the =curve1FUNCorFLOAT= parameter will be returned. Similarly, when the value =1= is specified, then the curve function specified by the =curve2FUNCorFLOAT= parameter will be returned. When the value =.5= is specified, the returned curve function will be an equal blend between the two specified source curve functions.

							VARIATION 1
							.......................................................................
							curveFUNC = Uize.Curve.Mod.blend (curve1FUNCorFLOAT,curve2FUNCorFLOAT);
							.......................................................................

							When no =blend0to1FLOAT= parameter is specified, then the value =.5= will be used as the default for this parameter and the two curve functions specified by the =curve1FUNCorFLOAT= and =curve2FUNCorFLOAT= parameters will be blended equally.

							VARIATION 2
							......................................................................................
							curveFUNC = Uize.Curve.Mod.blend (curve1FUNCorFLOAT,curve2FUNCorFLOAT,blendCurveFUNC);
							......................................................................................

							When the =blendCurveFUNC= parameter is specified in place of the =blend0to1FLOAT= parameter, then the blend between the two curve functions can vary across the range of input values. Consider the following example...

							EXAMPLE
							........................................................................
							Uize.Curve.Mod.blend (
								Uize.Curve.easeOutPow (4),  // ease-out power curve function
								Uize.Curve.saw (20,.5),     // sawtooth curve function with 20 teeth
								Uize.Curve.line (.25,.75)   // line starting at .25 and ending at .75
							)
							........................................................................

							In the above example, a quartic ease-out power curve function is being blended with a sawtooth curve function with twenty teeth. The =Uize.Curve.line= method is being used to create a value range from =.25= to =.75= to control the blend between the two curve functions across the range of input values. At the input value of =0=, the blend between the curves will be =.25=. At the input value of =1=, the blend between the curves will be =.75=. At the input value of =.5=, the blend between the curves will be =.5= (the midpoint value of the line curve).

							Encapsulating a Curve
								One useful technique that can employ the =Uize.Curve.Mod.blend= method is to encapsulate one curve between two other curves.

								Basically, if you view the curve specified by the =curve1FUNCorFLOAT= parameter as being the ventral side of a "capsule", and view the curve specified by the =curve2FUNCorFLOAT= parameter as being the dorsal side of a "capsule", then a curve specified by the =blendCurveFUNC= parameter will essentially be fitted inbetween those two curves.

								EXAMPLE
								.............................................
								// bouncing down the stairs

								Uize.Curve.Mod.blend (
									Uize.Curve.easeInPow (3),
									Uize.Curve.easeOutPow (1.5),
									Uize.Curve.Rubber.easeOutBounce (10,4,1.1)
								)
								.............................................

								The above expression generates a curve function that can be used to produce a bouncing-down-the-stairs type of effect. The ease-out bounce curve is being encapsulated between the ease-in power curve and the ease-out power curve.

							NOTES
							- numerical values for the =curve1FUNCorFLOAT= and =curve2FUNCorFLOAT= parameters are resolved to curve functions using the =Uize.Curve.resolve= static method
				*/
			},

			multiply:function (_curveFunctionA,_curveFunctionB) {
				_curveFunctionA = _resolve (_curveFunctionA);
				_curveFunctionB = _resolve (_curveFunctionB);
				return function (_value) {return _curveFunctionA (_value) * _curveFunctionB (_value)}
				/*?
					Static Methods
						Uize.Curve.Mod.multiply
							Returns a curve function, that is the two specified source curve functions multiplied together.

							SYNTAX
							..........................................................................
							curveFUNC = Uize.Curve.Mod.multiply (curve1FUNCorFLOAT,curve2FUNCorFLOAT);
							..........................................................................

							Because curve functions produce values in the scale of =0= to =1=, multiplying two curve functions together will tend to produce a new curve function that bends downwards more extremely.

							NOTES
							- numerical values for the =curve1FUNCorFLOAT= and =curve2FUNCorFLOAT= parameters are resolved to curve functions using the =Uize.Curve.resolve= static method
				*/
			},

			quantize:function (_curveFunction,_steps,_stepCurveFunction) {
				_curveFunction = _resolve (_curveFunction);
				if (!_steps || _steps == Infinity) return _curveFunction;
				if (typeof _stepCurveFunction == 'number') _stepCurveFunction = _package.band (1,0,_stepCurveFunction);
				var _stepSize = 1 / _steps;
				return function (_value) {
					var _quantizedValue = Math.floor ((_value = _curveFunction (_value)) / _stepSize) * _stepSize;
					return (
						_stepCurveFunction
							? _quantizedValue + _stepCurveFunction ((_value - _quantizedValue) / _stepSize) * _stepSize
							: _quantizedValue
					);
				};
				/*?
					Static Methods
						Uize.Curve.Mod.quantize
							Returns a new curve function, that is the specified curve function that has been quantized to have the specified number of steps.

							SYNTAX
							................................................................
							curveFUNC = Uize.Curve.Mod.quantize (curveFUNCorFLOAT,stepsINT);
							................................................................

							VARIATION 1
							...................................................................................
							curveFUNC = Uize.Curve.Mod.quantize (curveFUNCorFLOAT,stepsINT,stepAlign0to1FLOAT);
							...................................................................................

							By default, quantization steps stay at the low side of their output value range throughout their input value range. When the optional =stepAlign0to1FLOAT= parameter is specified, this behavior can be controlled. When the value =0= is specified, the step up to the next step is aligned to the left side of the input value range. When the value =1= is specified, the step up to the next step is aligned to the right side of the input value range. When the value =.5= is specified, the step up to the next step is aligned in the center of the input value range. Other values between =0= and =1= represent continuous horizontal alignment of the step up point between the left and right of each step's input value range.

							VARIATION 2
							..............................................................................
							curveFUNC = Uize.Curve.Mod.quantize (curveFUNCorFLOAT,stepsINT,stepCurveFUNC);
							..............................................................................

							When the =stepCurveFUNC= parameter is specified in place of the =stepAlign0to1FLOAT= parameter, then the value distortion within the vertical quantization segment can be controlled. Ease-in-out curve functions can be used to squash the output values towards the top and bottom sides of the quantization segments, and ease-in-the-middle curve functions can be used to pinch the output values towards the center of the quantization segments. Needless to say, this is easier to visualize with a graph than describe with words.

							NOTES
							- compare to the =Uize.Curve.Mod.redraw= static method
							- numerical values for the =curveFUNCorFLOAT= parameter are resolved to curve functions using the =Uize.Curve.resolve= static method
				*/
			},

			redraw:function (_curveFunction,_segments,_segmentCurveFunction,_alternatingRotate) {
				_curveFunction = _resolve (_curveFunction);
				if (!_segments || _segments == Infinity) return _curveFunction;
				_segmentCurveFunction = _resolve (_segmentCurveFunction);
				var _segmentSize = 1 / _segments;
				return (
					_segmentSize
						? function (_value) {
							var
								_segmentNoFloat = _value / _segmentSize,
								_segmentNo = Math.floor (_segmentNoFloat)
							;
							return _blendFloats (
								_curveFunction (_segmentNo * _segmentSize),
								_curveFunction (Math.ceil (_segmentNoFloat) * _segmentSize),
								_alternatingRotate && _segmentNo % 2
									? 1 - _segmentCurveFunction (1 - _segmentNoFloat + _segmentNo)
									: _segmentCurveFunction (_segmentNoFloat - _segmentNo)
							);
						}
						: _curveFunction
				);
				/*?
					Static Methods
						Uize.Curve.Mod.redraw
							Returns a curve function, that is a redrawn version of the specified source curve function.

							SYNTAX
							.........................................................................................
							curveFUNC = Uize.Curve.Mod.redraw (curveFUNCorFLOAT,segmentsINT,segmentCurveFUNCorFLOAT);
							.........................................................................................

							The =Uize.Curve.Mod.redraw= method divides the specified curve function into a number of segments in the x-axis, as specified by the =segmentsINT= parameter. It then redraws the curve between the ends of each segment by connecting the values at each end of a segment using the segment curve specified by the =segmentCurveFUNCorFLOAT= parameter. So, redraw is a little bit like quantization, but in the x-axis.

							The =Uize.Curve.Mod.redraw= method removes detail from the original curve function and replaces it with new detail, as determined by the =segmentCurveFUNCorFLOAT= value. This method can have the effect of producing a simpler curve than the original, or producing a more complex curve. For example, a complex elastic curve function could be simplified by redrawing it using a small number of segments and replacing a lot of the complexity within those segments by redrawing using a simple linear segment curve function. On the other hand, a simple linear curve function could be made more complex by redrawing it using an elastic curve function for the segments.

							VARIATION 1
							.................................................................
							curveFUNC = Uize.Curve.Mod.redraw (curveFUNCorFLOAT,segmentsINT);
							.................................................................

							When the =segmentCurveFUNCorFLOAT= parameter is not specified, then a linear curve function will be used for redrawing the segments.

							VARIATION 2
							.............................................................................
							curveFUNC = Uize.Curve.Mod.redraw (
								curveFUNCorFLOAT,segmentsINT,segmentCurveFUNCorFLOAT,alternatingRotateBOOL
							);
							.............................................................................

							When the value =true= is specified for the optional =alternatingRotateBOOL= parameter, then each alternating segment will be redrawn with a 180 degree rotated version of the curve function specified by the =segmentCurveFUNCorFLOAT= parameter. In other words, the first segment will be normal, the second segment will be rotated, the third segment will be normal, the fourth segment will be rotated, etc.

							NOTES
							- compare to the =Uize.Curve.Mod.quantize= static method
							- numerical values for the =curveFUNCorFLOAT= and =segmentCurveFUNCorFLOAT= parameters are resolved to curve functions using the =Uize.Curve.resolve= static method
				*/
			},

			repeat:function (_curveFunction,_repeats,_stairsDegree,_alternatingFlipHorz,_alternatingFlipVert) {
				var
					_curveFunctionLength = Uize.isArray (_curveFunction = _resolve (_curveFunction))
						? _curveFunction.length
						: 0,
					_repeatHeight = _blendFloats (1,1 / _repeats,_stairsDegree || (_stairsDegree = 0))
				;
				return function (_value) {
					var
						_repeatNo = _value && Math.ceil (_value * _repeats) - 1,
						_repeatPos = _repeatNo / _repeats,
						_valueForRepeat = Uize.constrain ((_value - _repeatPos) * _repeats,0,1),
						_isAlternate = _repeatNo % 2
					;
					_valueForRepeat =
						(_curveFunctionLength ? _curveFunction [_repeatNo % _curveFunctionLength] : _curveFunction) (
							_isAlternate && _alternatingFlipHorz ? 1 - _valueForRepeat : _valueForRepeat
						)
					;
					if (_isAlternate && _alternatingFlipVert)
						_valueForRepeat = 1 - _valueForRepeat
					;
					return (
						_repeatNo == _repeats - 1 && _valueForRepeat == 1
							? 1
							: _repeatPos * _stairsDegree + _valueForRepeat * _repeatHeight
					);
				};
				/*?
					Static Methods
						Uize.Curve.Mod.repeat
							Returns a curve function, that is the specified curve function repeated the specified number of times.

							SYNTAX
							.......................................................................
							curveFUNC = Uize.Curve.Mod.repeat (curveFUNCorFLOATorARRAY,repeatsINT);
							.......................................................................

							When an array is specified for the =curveFUNCorFLOATorARRAY= parameter, then the elements of the array should be curve functions, and these curve functions specified in the array will be cycled through for every successive repitition. There can be a different number of curve functions in the array than the value of the =repeatsINT= parameter. If the value of =repeatsINT= is greater than the length of the curve functions array, then the array will be cycled through more than once. If the value of =repeatsINT= is less than the length of array, then not all the curve functions in the array will be utilized.

							VARIATION 1
							...........................................................
							curveFUNC = Uize.Curve.Mod.repeat (
								curveFUNCorFLOATorARRAY,repeatsINT,stairsDegree0to1FLOAT
							);
							...........................................................

							By default, the curve specified by the =curveFUNCorFLOATorARRAY= is repeated as thought it were a waveform, with each successive repitition occupying the full vertical range of =0= to =1=. Staircasing lets you stack the repititions along a diagonal line from left to right.

							When the value =1= is specified for the =stairsDegree0to1FLOAT= parameter, the repititions are fully staircased, so that the top right of the previous repetition connects to the bottom left of the current repitition, allowing the curve line of the previous repitition to flow into the curve line of the next repitition. When ease-in-out or ease-in-the-middle curve functions are specified for the =curveFUNCorFLOATorARRAY= parameter, then the curve can be made seamless, because these types of curve functions are by design diagonally symmetrical.

							When the value =0= is specified for the =stairsDegree0to1FLOAT= parameter, the repititions all occupy the full vertical range of =0= to =1=. This is the default behavior. Other values between =0= and =1= represent continuous degrees of staircasing, between no staircasing and complete staircasing.

							VARIATION 2
							...................................................................................
							curveFUNC = Uize.Curve.Mod.repeat (
								curveFUNCorFLOATorARRAY,repeatsINT,stairsDegree0to1FLOAT,alternatingFlipHorzBOOL
							);
							...................................................................................

							When the optional =alternatingFlipHorzBOOL= parameter is specified, horizontal flipping for alternate repititions can be controlled. When the value =true= is specified for this parameter, the first repitition will be normal, the second repitition will be flipped, the third repitition will be normal, the fourth repitition will be flipped, etc.

							VARIATION 3
							...................................
							curveFUNC = Uize.Curve.Mod.repeat (
								curveFUNCorFLOATorARRAY,
								repeatsINT,
								stairsDegree0to1FLOAT,
								alternatingFlipHorzBOOL,
								alternatingFlipVertBOOL
							);
							...................................

							When the optional =alternatingFlipVertBOOL= parameter is specified, vertical flipping for alternate repititions can be controlled. When the value =true= is specified for this parameter, the first repitition will be normal, the second repitition will be flipped, the third repitition will be normal, the fourth repitition will be flipped, etc. If you specify the value =true= for both the =alternatingFlipHorzBOOL= and =alternatingFlipVertBOOL= parameters, then alternating repititions will be rotated 180 degrees.

							IMPORTANT

							When not specifying the same value for both the =alternatingFlipHorzBOOL= and =alternatingFlipVertBOOL= parameters, you should be sure to specify an odd number for the =repeatsINT= parameter. Otherwise, you won't be able to guanrantee that the resulting curve function will end at the value =1=. By specifying an odd number of repeats you ensure that the last repitition will not be flipped horizontally or vertically, since only the alternating repititions are flipped.

							NOTES
							- numerical values for the =curveFUNCorFLOATorARRAY= parameter are resolved to curve functions using the =Uize.Curve.resolve= static method
				*/
			},

			rotate:function (_curveFunction,_blendOfRotated) {
				_curveFunction = _resolve (_curveFunction);
				return (
					_blendOfRotated == _undefined || _blendOfRotated == 1
						? _host.makeEaseOut (_curveFunction)
						: _blendOfRotated
							? function (_value) {
								return _blendFloats (_curveFunction (_value),1 - _curveFunction (1 - _value),_blendOfRotated)
							}
							: _curveFunction
				)
				/*?
					Static Methods
						Uize.Curve.Mod.rotate
							Returns a curve function, that is the 180 degree rotated version of the specified source curve function, or a blend between the specified curve function and the 180 degree rotated version of it.

							SYNTAX
							.....................................................
							curveFUNC = Uize.Curve.Mod.rotate (curveFUNCorFLOAT);
							.....................................................

							VARIATION
							.............................................................................
							curveFUNC = Uize.Curve.Mod.rotate (curveFUNCorFLOAT,blendOfRotated0to1FLOAT);
							.............................................................................

							When the optional =blendOfRotated0to1FLOAT= parameter is specified, this method will return a blend between the unrotated curve function and the rotated version.

							INSTEAD OF...
							.......................................................................
							Uize.Curve.Mod.blend (Uize.Curve.makeEaseOut (Math.sqrt),Math.sqrt,.5);
							.......................................................................

							USE...
							.....................................
							Uize.Curve.Mod.rotate (Math.sqrt,.5);
							.....................................

							Calling the =Uize.Curve.Mod.rotate= method without specifying the =blendOfRotated0to1FLOAT= parameter is equivalent to using the =Uize.Curve.makeEaseOut= static method. So, it's when you use the =blendOfRotated0to1FLOAT= parameter that this method becomes compelling.

							NOTES
							- numerical values for the =curveFUNCorFLOAT= parameter are resolved to curve functions using the =Uize.Curve.resolve= static method
				*/
			}
		});
	}
});

