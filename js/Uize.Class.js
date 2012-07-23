/*
	UIZE JAVASCRIPT FRAMEWORK 2012-07-22

	http://www.uize.com/reference/Uize.Class.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Class',builder:function(a_a){var a_b,a_c='string',a_d='object',a_e=Uize,a_f=a_e.clone,a_g=a_e.copyInto,a_h=a_e.forEach,a_i=a_e.getClass,a_j=a_e.getGuid,a_k=a_e.globalEval,a_l=a_e.isArray,a_m=a_e.isFunction,a_n=a_e.isInstance,a_o=a_e.isObject,a_p=a_e.noNew,a_q=a_e.pairUp;var a_r=[],a_s={};var a_t=a_u(function(){},function(){this.instanceId=a_j();},function(a_v){a_v||(a_v=a_s);var a_w={},a_x=this.Class.a_x,a_y,a_z;for(a_y in a_x){if(a_y in a_v)a_w[a_y]=a_v[a_y];else if((a_z=a_x[a_y])!==a_b)a_w[a_y]=a_z;}for(a_y in a_v)a_y in a_w||(a_w[a_y]=a_v[a_y]);this.set(a_w);}),a_A=a_t.prototype,a_B=a_t.nonInheritableStatics;function a_C(a_D,a_E){var a_t=a_i(a_D);return(a_t.a_F[a_E]||a_t.a_G[a_E]);}function a_H(a_D,a_E){var a_I=a_C(a_D,a_E);return a_I?a_I.a_J:a_E;}a_t.a_K=a_A.a_K=function(a_L,a_M){if(a_L.charCodeAt(0)==67&& !a_L.indexOf('Changed.')){var a_D=this,a_N=a_L.slice(8),a_I=a_C(a_D,a_N);if(a_I&&a_N!=a_I.a_O)a_L='Changed.'+(a_N=a_I.a_O);a_M(a_L);(a_D.a_P||(a_D.a_P={}))[a_N]=
a_D.a_Q&&a_D.a_Q[a_L];}else{a_M(a_L);}};a_t.wire=a_A.wire=function(a_R,a_S){var a_D=this;if(arguments.length==2){a_D.a_K(a_R,function(a_L){var a_Q=a_D.a_Q||(a_D.a_Q={});(a_Q[a_L]||(a_Q[a_L]=[])).push({a_L:a_L,a_S:a_m(a_S)?a_S:typeof a_S==a_c?new Function(a_S):function(a_T){a_S.fire(a_T)},a_U:a_S});});}else if(a_o(a_R)){for(var a_L in a_R)this.wire(a_L,a_R[a_L]);}};a_t.fire=a_A.fire=function(a_T){if(typeof a_T!=a_d)a_T={name:a_T};var a_D=this,a_Q=a_D.a_Q;if(a_Q){var a_V=a_Q[a_T.name],a_W=a_Q['*'];if(a_V||a_W){a_T.source||(a_T.source=a_D);var a_X=a_W&&a_V?a_W.concat(a_V):a_W||a_V,a_Y=a_X.length;if(a_Y==1){a_X[0].a_S(a_T);}else if(a_Y==2){var a_Z=a_X[0].a_S,a_0=a_X[1].a_S;a_Z(a_T);a_0(a_T);}else{if(!a_W|| !a_V)a_X=a_X.concat();for(var a_1= -1;++a_1<a_Y;)a_X[a_1].a_S(a_T);}}}if(a_T.bubble&&a_D.parent&&a_n(a_D)){a_T.source||(a_T.source=a_D);a_D.parent.fire(a_T);}return a_T;};a_t.unwire=a_A.unwire=function(a_R,a_S){var a_D=this,a_Q=a_D.a_Q;if(a_Q){if(a_o(a_R)){for(var a_L in a_R)a_D.unwire(a_L,a_R[a_L]);}else{
a_D.a_K(a_R,function(a_L){var a_2=a_Q[a_L];if(a_2){if(a_S){for(var a_1=a_2.length;--a_1>=0;)a_2[a_1].a_U==a_S&&a_2.splice(a_1,1);}(a_S&&a_2.length)||delete a_Q[a_L];}});}}};a_A.once=function(a_y,a_S){var a_D=this,a_3=a_D.get(a_y),a_4={};if(a_3){a_S(a_3);}else{a_4['Changed.'+a_y]=function(){if(a_3=a_D.get(a_y)){a_D.unwire(a_4);a_S(a_3);}};a_D.wire(a_4);}return a_4;};a_t.get=a_A.get=function(a_y){if(typeof a_y==a_c){return this[a_H(this,a_y)];}else{var a_D=this,a_5={};if(!a_y){var a_t=a_i(a_D),a_G=a_t.a_G;for(var a_6 in a_G)a_5[a_G[a_6].a_O]=a_D[a_6];}else if(a_l(a_y)){for(var a_7= -1,a_8=a_y.length;++a_7<a_8;){var a_9=a_y[a_7];a_5[a_9]=a_D[a_H(a_D,a_9)];}}else{for(var a_9 in a_y)a_5[a_9]=a_D[a_H(a_D,a_9)];}return a_5;}};a_t.registerProperties=function(a_ba){var a_D=this,a_G=a_D.a_G,a_F=a_D.a_F;for(var a_6 in a_ba){var a_bb=a_ba[a_6],a_bc=a_o(a_bb),a_N=(a_bc?a_bb.name:a_bb)||a_6,a_bd=a_N,a_I=a_G[a_6]={a_J:a_6};if(a_N.indexOf('|')> -1){var a_be=a_N.split('|');a_bd=a_be[0];a_e.lookup(a_be,a_I,a_F);}else{
a_F[a_N]=a_I;}a_I.a_O=a_bd;if(a_bc){if(a_bb.onChange)a_I.a_bf=a_bb.onChange;if(a_bb.conformer)a_I.a_bg=a_bb.conformer;a_D[a_6]=a_bb.value;}}a_D.a_x=this.get();};a_t.set=a_A.set=function(a_v){if(arguments.length>1)a_v=a_q.apply(0,arguments);var a_D=this,a_bh=a_n(a_D),a_t=a_bh?a_D.Class:a_D,a_F=a_t.a_F,a_G=a_t.a_G,a_I,a_bi,a_bj,a_bk,a_P=a_bh&&a_D.a_P,a_bl=a_P&&a_P['*'],a_bm,a_bn,a_6,a_N,a_bo,a_3,a_bp;for(var a_E in a_v){a_3=a_v[a_E];if(a_I=a_F[a_E]||a_G[a_E]){a_6=a_I.a_J;a_N=a_I.a_O;}else{(a_bo||(a_bo={}))[a_6=a_N=a_E]=a_I=a_bh?{}:{value:a_3};}if(a_bh)(a_bp||(a_bp={}))[a_N]=a_I.a_bg?(a_3=a_I.a_bg.call(a_D,a_3,a_D[a_6])):a_3;if(a_3!==a_D[a_6]){if(a_bh){a_bl&&((a_bm||(a_bm={}))[a_N]=a_3);a_P&&a_P[a_N]&&(a_bn||(a_bn=[])).push(a_N);function a_bq(a_bk){if(a_m(a_bk)){if(!a_bi){a_bi=[];a_bj=a_D.instanceId+'_handlerAlreadyAdded';}if(!a_bk[a_bj]){a_bk[a_bj]=1;a_bi.push(a_bk);}}else if(typeof a_bk==a_c){a_bq(a_D[a_bk]);}else if(a_l(a_bk)){a_h(a_bk,a_bq);}}a_I.a_bf&&a_bq(a_I.a_bf);}a_D[a_6]=a_3;}}
a_bo&&a_t.registerProperties(a_bo);if(a_bh){if(a_bi){for(var a_1= -1,a_br=a_bi.length;++a_1<a_br;){delete(a_bk=a_bi[a_1])[a_bj];a_bk.call(a_D,a_bp);}}a_bm&&a_D.fire({name:'Changed.*',properties:a_bm});if(a_bn){for(var a_bs= -1,a_bt=a_bn.length;++a_bs<a_bt;)a_D.fire('Changed.'+a_bn[a_bs]);}}else{a_t.a_x=this.get();}};a_t.toggle=a_A.toggle=function(a_bu){var a_bv= !this.get(a_bu);this.set(a_bu,a_bv);return a_bv;};a_A.kill=function(){var a_bw=this.instanceId;a_k('if(typeof '+a_bw+'!=\'undefined\')'+a_bw+'=null');};function a_u(a_t,a_bx,a_by){function a_bz(){var a_bA=[],a_bB=a_e.toString;a_h(this.get(),function(a_3,a_bu){a_bA.push(a_bu+' : '+(a_3&&(a_n(a_3)||a_m(a_3))?a_bB.call(a_3):a_3));});return a_bB.call(this)+'\n\n'+a_bA.sort().join('\n');}function a_bC(){return this[a_H(this,'value')];}var a_A=a_t.prototype,a_bD=a_p(function(){for(var a_bE= -1,a_bF=a_bG.length;++a_bE<a_bF;)a_bG[a_bE].apply(this,arguments);for(var a_bH= -1,a_bI=a_bJ.length;++a_bH<a_bI;)a_bJ[a_bH].apply(this,arguments);}),a_bK=a_bD.prototype;
var a_3,a_bL=a_t.nonInheritableStatics||a_s;for(var a_y in a_t)if(!a_bL[a_y]&&(a_3=a_t[a_y])!=a_A&& !(a_m(a_3)&&a_3.moduleName&&/[A-Z]/.test(a_y.charAt(0))))a_bD[a_y]=a_f(a_3);a_g(a_bK,a_A);a_bK.toString=a_bz;a_bK.valueOf=a_bC;a_bK.Class=a_bD;a_bD.nonInheritableStatics={a_bM:1,nonInheritableStatics:1,toString:0,valueOf:0};a_bD.superclass=a_t;a_bD.toString=a_bz;a_bD.valueOf=a_bC;var a_bG=a_bD.a_bG=(a_t.a_bG||a_r).concat(),a_bJ=a_bD.a_bJ=(a_t.a_bJ||a_r).concat();a_bx&&a_bG.push(a_bx);a_by&&a_bJ.push(a_by);a_bD.a_G||(a_bD.a_G={});a_bD.a_F||(a_bD.a_F={});return a_bD;};a_t.subclass=function(a_bx,a_by){return a_u(this,a_bx,a_by);};a_t.singleton=function(a_bN,a_v){var a_bM=this.a_bM||(this.a_bM={}),a_bO=a_bM[a_bN||(a_bN='')];a_bO?a_v&&a_bO.set(a_v):(a_bO=a_bM[a_bN]=this(a_v));return a_bO;};return a_t;}});