!function(){function t(t){return"string"==typeof t&&t.length>Bn?t.slice(0,Bn):t}function e(t){return t.getAdBlock?t.getAdBlock():-1}function n(t){var e=t.getContainer().querySelector("video");return e?e.currentTime:t.getPosition()}function i(t){try{return t.getPlaylistItem()}catch(n){var e=t.getPlaylistIndex();return t.getConfig().playlist[e]||null}}function r(t){if("function"==typeof t.getProvider){var e=t.getProvider();return e?e.name:""}return""}function a(t){return"function"==typeof t.qoe?0|10*En(t.qoe().firstFrame/10):-1}function o(t){if(t.getPlugin){var e=t.getPlugin("vr");if(e)switch(e.getMode()){case"magic-window":return 0;case"cardboard":return 1;case"gear-vr":return 2;default:return null}}return null}function u(t){return t.getPlaybackRate?En(100*t.getPlaybackRate())/100:1}function c(t){var e=t.getVisualQuality();return e&&e.level?{width:e.level.width,height:e.level.height}:{width:null,height:null}}function d(t){var e=t.getContainer().querySelector("video"),n=0;if(e&&(n=e.duration,e.buffered&&e.buffered.length)){var i=e.buffered.end(e.buffered.length-1)||0;return En(10*i)/10}return n||(n=Math.abs(t.getDuration())),En(n*t.getBuffer()/10)/10}function s(){var t=window.jwplayer,e=0;if("function"==typeof t)for(e=0;1e3>e;e++)if(!t(e).uniqueId)return e;return e}function l(){try{var t=window.crypto||window.msCrypto;if(t&&t.getRandomValues)return t.getRandomValues(new Uint32Array(1))[0].toString(36)}catch(t){}return Math.random().toString(36).slice(2,9)}function f(t){for(var e="";e.length<t;)e+=l();return e.slice(0,t)}function p(t){if(t){if(/vast/.test(t))return 0;if(/googima/.test(t))return 1;if(/freewheel/.test(t))return 2;if(/dai/.test(t))return 3}return-1}function h(t){var e=/.*\/(?:manifests|videos)\/([a-zA-Z0-9]{8})[\.-].*/,n=e.exec(t);return n&&2===n.length?n[1]:null}function v(t){return t.split("+")[0]}function g(t){return/^[a-zA-Z0-9]{8}$/.test(t)}function m(t,e,n){return n.some(t.tracks,function(t){var e=t.kind;return"captions"===e||"subtitles"===e})?1:1<e.getCaptionsList().length?2:0}function k(t){return b(t,"feedid")}function w(t){return b(t,"feed_instance_id")}function y(t){return t?t.pin_set_id:null}function b(t,e){return t?(t.feedData||{})[e]||t[e]:null}function T(t,e){var n;if(!t)return null;var i=t.sources;if(i){for(var r=[],a=i.length;a--;)i[a].file&&r.push(i[a].file);r.sort(),n=r[0]}else n=t.file;return e.getAbsolutePath(n)}function C(t){if(!t)return null;var e=t.mediaid;return g(e)?e:(e=h(t.file),g(e)?e:null)}function S(t,e){var n=t.tracks;return e.some(n,function(t){return"thumbnails"===t.kind})}function I(t){return t?t.title:null}function _(t,e){var n=t.sources[0],i=n.type;if(!i){var r=n.file;i=e.extension(r)}return i}function P(t){if(!t||!t.stereomode)return null;switch(t.stereomode){case"monoscopic":return 0;case"stereoscopicTopBottom":return 1;case"stereoscopicLeftRight":return 2;default:return null}}function A(t,e,n){function i(t){return function(i){t(i,e,n)}}var r,a;if(t.getPlugin){var o=t.getPlugin("related");o&&(o.on("playlist",i(R)),o.on("open",i(x)),o.on("play",i(j)),o.on("feedShown",function(t){r=t.reason,D(t,e,n)}),o.on("feedClick",function(t){L(t,e,n,r)}),o.on("feedAutoAdvance",function(t){B(t,e,n,r)}));var u;t.on("playlistItem",function(){u=!0,r=null,a=null}),t.on("nextShown",function(t){a=t.reason,("hover"!==t.reason||u)&&(u=!1,D(t,e,n))}),t.on("nextClick",function(t){a&&L(t,e,n,a)}),t.on("nextAutoAdvance",function(t){a&&B(t,e,n,a)})}}function R(t,e,n){null===t.playlist||q(st,t,[],e,n)}function x(t,e,n){q(lt,t,[],e,n)}function j(t,e,n){var i=[];if("item"in t){var r;r="play"===t.onclick?t.item.mediaid:t.item.link,i.push(qn(De,r,17))}"autoplaytimer"in t&&i.push(qn(Be,t.autoplaytimer,18)),q(dt,t,i,e,n)}function D(t,e,n){var i=t.feedData||{},r=t.itemsShown||[],a=0,o=r.map(function(t){return y(t)&&a++,C(t)}),u=[qn(qe,t.ui,18),qn(Ee,o.join(","),19),qn(Ue,o.length,20),qn(Oe,a,21),qn(Fe,t.page,22),qn(Ve,t.reason,23),qn(Qe,i.kind,24),qn(Be,t.autoTimer,25)];q(ft,t,u,e,n)}function L(t,e,n,i){var r=[qn(Le,t.index,19),qn(Fe,t.page,22)].concat(M(t,i));q(pt,t,r,e,n)}function B(t,e,n,i){var r=M(t,i);q(ht,t,r,e,n)}function M(t,e){var n=t.feedData||{},i=t.itemsShown||[],r=t.target;return[qn(qe,t.ui,18),qn(Ne,C(r),20),qn(Ue,i.length,21),qn(Ve,e,23),qn(Qe,n.kind,24),qn(Wt,y(r),25)]}function q(t,e,n,i,r){var a=k(e);a&&r.track(t,Y,E(t,a,n,e).concat(i.getPlaylistTrackingParameters()))}function E(t,e,n,i){if("onclick"in i&&n.push(qn(Ae,"play"===i.onclick?1:0,19)),"method"in i){var r,a=Qn[i.method]||0;t===dt?r=xe:t===lt&&(r=je),r&&n.push(qn(r,a,20))}"rec_id"in i&&n.push(qn(Re,i.rec_id,22)),"position"in i&&n.push(qn(Le,i.position+1,23));var o=w(i);if(n.push(qn(Nt,e,24),qn(Ht,o,25)),t===dt){var a=y(i);n.push(qn(Wt,a,6))}return n}function U(t){return!("number"!=typeof t)||Math.random()<Hn}function O(t,e,n,i){e("setupError"===t?xn:jn,et,[qn(Dn,n.code,17)].concat(i))}function F(t,e,n){var i=function(e){return function(i){Xn<Wn&&U(i.code)&&(Xn+=1,O(e,n,i,t()))}};e.on("error",i("error")),e.on("setupError",i("setupError"))}function V(t,e,n){var i=$n[t.method]||$n.custom;n(ct,Y,[qn(rn,i,20)].concat(e))}function Q(t,e,n){if(t.getPlugin){var i=t.getPlugin("sharing");i&&i.on("click",function(t){return function(i){t(i,e(),n)}}(V))}}function N(){var t=navigator.plugins;if(t&&"object"==typeof t["Shockwave Flash"]){var e=t["Shockwave Flash"].description;if(e)return e}if(void 0!==window.ActiveXObject)try{var e=new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash");if(e){var n=e.GetVariable("$version");if(n)return n}}catch(e){}return""}function H(){var t=(window.performance||{}).timing;if(t){var e=t.loadEventEnd||(new Date).getTime(),n=e-t.navigationStart;if(0<n)return 0|50*Math.round(n/50)}return null}function W(t,e){return 1===t.nodeType&&0<=(" "+t.className+" ").replace(/[\t\r\n\f]/g," ").indexOf(" "+e+" ")}function X(){var t=ui.jwplayerLocalId;if(t)return t;try{return ui.jwplayerLocalId=f(12),ui.jwplayerLocalId}catch(t){}return null}function $(t){return t?ci[t]||999:0}function z(t){return di[t]||0}function K(t){var e=t.preload;return si[e]||0}function Z(t,e,n){return e===1/0?null:0|t/(e/n)+1}function G(t){return t===1/0?1/0:(t|=0,0>=t?0:30>t?1:60>t?4:180>t?8:300>t?16:32)}function J(t){return t|=0,0>=t||t===1/0?0:15>t?1:300>=t?2:1200>=t?3:4}var Y="jwplayer6",tt="clienta",et="error",nt="e",it="pa",rt="s",at="t",ot="ret",ut="vs",ct="vsh",dt="rc",st="bs",lt="rs",ft="fs",pt="fc",ht="aa",vt="c",gt="ed",mt="d",kt="ph",wt="mu",yt="t",bt="ti",Tt="pw",Ct="etw",St="tb",It="ps",_t="vs",Pt="wd",At="pl",Rt="l",xt="q",jt="id",Dt="fv",Lt="eb",Bt="st",Mt="ff",qt="plt",Et="pp",Ut="pgi",Ot="prc",Ft="stc",Vt="emi",Qt="pli",Nt="fed",Ht="fid",Wt="psd",Xt="vp",$t="po",zt="s",Kt="r",Zt="sn",Gt="cb",Jt="ga",Yt="pr",te="vd",ee="mk",ne="tt",ie="cct",re="drm",ae="pd",oe="at",ue="plc",ce="pid",de="dd",se="cp",le="ab",fe="pad",pe="mt",he="vb",ve="vi",ge="vl",me="rf",ke="tvs",we="set",ye="pdt",be="ccp",Te="aid",Ce="i",Se="pv",Ie="pu",_e="pt",Pe="sdk",Ae="os",Re="ri",xe="rct",je="rst",De="rn",Le="oc",Be="rat",Me="lid",qe="fin",Ee="fis",Ue="fns",Oe="fpc",Fe="fpg",Ve="fsr",Qe="ft",Ne="fct",He="abt",We="pbr",Xe="pbd",$e="pbc",ze="vh",Ke="vw",Ze="ubi",Ge="cvl",Je="tvl",Ye="vso",tn="sdt",en="pyc",nn="pii",rn="stg",an="pss",on="abc",un="v",cn="adi",dn="al",sn="p",ln="vv",fn="ct",pn="ad",hn="du",vn="pc",gn="pi",mn="vu",kn="qt",wn="awi",yn="awc",bn="ask",Tn="abk",Cn="atk",Sn="sko",In="abo",_n="uav",Pn="adc",An="vr",Rn="vrt",xn="ers",jn="err",Dn="erc",Ln=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},Bn=500,Mn=function e(n,i,r){Ln(this,e),this.value=t(i),this.key=n,this.priority=r},qn=function(t,e,n){return new Mn(t,e,n)},En=Math.round,Un=/^IAB(\d+(?:-\d+)?)$/,On={UNKNOWN:999,IAB:0},Fn=6e-5,Vn=function(t,e,n,r,a){function o(t,e){a.track(t,tt,e)}function u(e){-1===t.adClient&&e&&(t.adClient=p(e.client)),e.sequence!==C.podIndex&&(delete C.timeAdLoading,delete C.adCreativeType),c(e,"adbreakid"),c(e,"adtagid"),c(e,"offset"),c(e,"witem"),c(e,"wcount"),c(e,"skipoffset"),c(e,"linear",function(t,e){return e===t}),c(e,"adposition",function(t,e){return{pre:0,mid:1,post:2,api:3}[e]}),c(e,"creativetype",function(t,e){var n="";return n="static"===e?"image/unknown":"video"===e?"video/unknown":"vpaid"===e||"vpaid-swf"===e?"application/x-shockwave-flash":"vpaid-js"===e?"application/javascript":e||n,C.adCreativeType=n,n}),c(e,"tag",function(t,e){return C.tagdomain=f(r.utils.getAbsolutePath(e)),e}),e.timeLoading&&(C.timeAdLoading=10*Math.round(e.timeLoading/10)),e.universalAdIdRegistry&&"unknown"!==e.universalAdIdRegistry?C.universalAdId=e.universalAdIdRegistry+"."+e.universalAdIdValue:delete C.universalAdId,C.conditionalAd=e.conditionalAd,C.conditionalAdOptOut=!!e.conditionalAdOptOut,C.mediaFileCompliance=e.mediaFileCompliance,C.categories=e.categories,C.adSystem=e.adsystem||C.adSystem,C.vastVersion=e.vastversion||C.vastVersion,C.podIndex=e.sequence||C.podIndex,C.podCount=e.podcount||C.podCount,C.tagURL=e.tag||C.tagURL||e.vmap}function c(t,e,n){t.hasOwnProperty(e)&&(C[e]=(n||d)(e,t[e]))}function d(t,e){return e}function s(){return 0===t.adClient&&Math.random()<=Fn}function l(t,e){if(T.adscheduleid&&e>C.previousQuartile){u(t);var n=[qn(hn,C.duration,28),qn(kn,e,29)].concat(h()).concat(g());o(un,n),C.previousQuartile=e}}function f(t){if(t){var e=t.match(new RegExp(/^[^\/]*:\/\/\/?([^\/]*)/));if(e&&1<e.length)return e[1]}return""}function h(){var t=null;return Array.isArray(C.categories)&&(t=C.categories.map(function(t){var e=t.match(Un);return e?[On.IAB,e[1]].join("-"):On.UNKNOWN}).filter(function(t,e,n){return n.indexOf(t)===e}).slice(0,10).join(",")),[qn(pn,C.adSystem,17),qn(ln,C.vastVersion,18),qn(fn,C.adCreativeType,19),qn(dn,C.linear,21),qn(_n,C.universalAdId,26),qn(Pn,t,27),qn(vn,C.podCount,30),qn(gn,C.podIndex,31)].concat(v())}function v(){return[qn(sn,C.adposition,20),qn(mn,C.tagdomain,22),qn(cn,C.adId,25),qn(wn,C.witem,32),qn(yn,C.wcount,33)].concat(t.getCommonTrackingParameters())}function g(){return[qn(In,C.offset,21),qn(Tn,C.adbreakid,23),qn(Cn,C.adtagid,24),qn(Sn,C.skipoffset,26)]}var m={numCompanions:-1,podCount:0,podIndex:0,linear:-1,vastVersion:-1,adSystem:"",adCreativeType:"",adposition:-1,tagdomain:"",position:"",previousQuartile:0,duration:"",witem:1,wcount:1},b=r.getConfig(),T=(b||{}).advertising||{};t.adClient=p(T.client),t.adScheduleId=T.adscheduleid;var C=null;r.on("adRequest adMeta adImpression adComplete adSkipped adError adTime",function(t){C&&C.adId===t.id&&-1!==t.id||(C=this._.extend({adId:t.id},m))}).on("adRequest adMeta adImpression adComplete adSkipped adError",u).on("adRequest",function(){T.adscheduleid&&o("ar",v().concat(g()))}).on("adImpression",function(){var t=i(r);o("i",[qn(Nt,k(t),22),qn(Ht,w(t),23),qn(Wt,y(t),24),qn("tal",C.timeAdLoading,25),qn("ca",C.conditionalAd,30),qn("cao",C.conditionalAdOptOut,31),qn("mfc",C.mediaFileCompliance,32)].concat(h()).concat(g()))}).on("adStarted",function(){o("as",h().concat(g()))}).on("adComplete",function(t){l(t,4)}).on("adSkipped",function(){o("s",[qn("tw",C.position,27),qn(hn,C.duration,28),qn(kn,C.previousQuartile,29)].concat(g()).concat(h()))}).on("adError",function(t){if(T.adscheduleid){var e,n=1;"object"==typeof t&&t&&("code"in t&&(n=t.code),"adErrorCode"in t&&(e=t.adErrorCode));o("ae",[qn(pn,C.adSystem,17),qn(fn,C.adCreativeType,19),qn(vn,C.podCount,30),qn(gn,C.podIndex,31),qn("ec",n,27),qn("ca",C.conditionalAd,30),qn("cao",C.conditionalAdOptOut,31),qn("mfc",C.mediaFileCompliance,32),s()?qn("atu",C.tagURL,33):null,e?qn("aec",e,34):null].concat(v().concat(g())))}}).on("adClick",function(){o("c",[qn("tw",C.position,27),qn(hn,C.duration,28),qn(kn,C.previousQuartile,29)].concat(h().concat(g())))}).on("adTime",function(t){if(C.position=t.position,C.duration=C.duration||t.duration,C.duration&&!(C.position>C.duration)){l(t,Math.min(3,Math.floor((4*C.position+.05)/C.duration)))}})},Qn={play:1,api:2,interaction:3,complete:4,auto:5,manual:6,link:7},Nn=function(t,e,n){e.on("ready",function(){A(e,t,n)})},Hn=.02,Wn=1,Xn=0,$n={facebook:"fb",twitter:"twi",email:"em",link:"cl",embed:"ceb",pinterest:"pin",tumblr:"tbr",googleplus:"gps",reddit:"rdt",linkedin:"lkn",custom:"cus"},zn=function(t,e,n){e.on("ready",function(){Q(e,t,n)})},Kn=function(t){var e=0;if(t=decodeURIComponent(t),!t.length)return e;for(var n,i=0;i<t.length;i++)n=t.charCodeAt(i),e=(e<<5)-e+n,e&=e;return e},Zn=function(){function t(e,n,i){Ln(this,t);var r=this;"function"==typeof e.onping&&(r.onping=e.onping);var a=i.ownerDocument||window.document,o="complete"===a.readyState;r.config=e,r.pageLoaded=o,r.queue=[],r.images=[],r.debug=n,r.flushQueue=function(){r.pageLoaded=!0;for(var t=r.queue.length;t--;)r.ping(r.queue.shift());window.removeEventListener("load",r.flushQueue)},o||(window.addEventListener&&window.addEventListener("load",r.flushQueue),setTimeout(r.flushQueue,5e3))}return t.prototype.track=function(t,e,n){var i=this.buildTrackingURL(t,e,n),r=!this.pageLoaded;if(!r||"i"!==t&&"ar"!==t&&"as"!==t){if(r)return void this.queue.push(i)}else this.flushQueue();this.ping(i)},t.prototype.buildTrackingURL=function(t,e,n){var i=[qn("e",t,0),qn("tv","2.21.0",1),qn("n",Math.random().toFixed(16).substr(2,16),2)].concat(n);i=i.filter(function(t){return!!t}).sort(function(t,e){return t.priority-e.priority});for(var r,a=[],o=0;o<i.length;o++)r=i[o].value,(!0===r||!1===r)&&(r=r?1:0),null!==r&&void 0!==r&&a.push(i[o].key+"="+encodeURIComponent(r));var u="file:"===window.location.protocol?"https:":"",c=a.join("&");return u+"//jwpltx.com/v1/"+e+"/ping.gif?h="+Kn(c)+"&"+c},t.prototype.ping=function(t){var e=new Image;e.src=t;for(var n=this.images,i=n.length;i--&&(n[i].width||n[i].complete);)n.length=i;if(n.push(e),this.debug&&this.onping)try{this.onping.call(this,t)}catch(t){}},t}(),Gn={pro:1,premium:2,ads:3,invalid:4,enterprise:6,trial:7,platinum:8,starter:9,business:10},Jn=function(t,e){var n,i=0;if(t){var r=new e(t),a=r.edition();4!==(i=Gn[a]||0)&&(n=r.token())}n||(n="_");var o={};return o[Te]=n,o[gt]=i,o},Yn=function(){var t=N().replace(/\D+(\d+\.?\d*).*/,"$1");return function(){return t}}(),ti=function(t){if(t)return{};var e="",n="",i=window.top!==window.self;if(i){e=document.referrer;try{e=e||window.top.location.href,n=window.top.document.title}catch(t){}}var r={};return r[Ie]=e||window.location.href,r[_e]=n||document.title,r[Ce]=i,r[Dt]=Yn(),r},ei=function(t,e){var n={};return n[Se]=v(t.version),n[Pe]=e.sdkplatform||0,n[Vt]=f(12),n},ni=function(t){var e={},n=window.jwplayer?window.jwplayer.defaults||{}:{};e[kt]=t[kt]||n[kt]||0,e[ce]=t.pid,e[fe]=t.pad,e[Zt]=t.skin,e[le]=!!t.advertising,e[zt]=!!t.sharing,e[Gt]=!!t.cast,e[Jt]=!!t.ga,e[mt]=!!t.autostart,e[Xt]=!1!==t.visualplaylist,e[de]=!1!==t.displaydescription,e[$t]=!!t.image,e[$e]=!!t.playbackRateControls;var i=t.related;return e[Kt]=!!i,i&&(e[me]=i.recommendations||i.file),e},ii=function(){return"hidden"in document?function(){return!document.hidden}:"webkitHidden"in document?function(){return!document.webkitHidden}:function(){return!0}}(),ri=Math.round,ai=function(t){var e=t.getConfig(),n=e.containerWidth||t.getWidth(),i=e.containerHeight||t.getHeight();if(/\d+%/.test(n)){var r=t.utils.bounds(t.getContainer());n=r.width,i=r.height}return n=0|ri(n),i=0|ri(i),/\d+%/.test(e.width||n)&&e.aspectratio?{bucket:4,width:n,height:i}:W(t.getContainer(),"jw-flag-audio-player")?{bucket:5,width:n,height:i}:0===n?{bucket:0,width:n,height:i}:320>=n?{bucket:1,width:n,height:i}:640>=n?{bucket:2,width:n,height:i}:{bucket:3,width:n,height:i}},oi=function(t,e,n){var i=3<arguments.length&&void 0!==arguments[3]?arguments[3]:{};if(!e)return null;if(n&&n.levels&&n.levels.length){var r=n.levels[0];if(r&&"auto"===(""+r.label).toLowerCase())return 5}if(W(t.getContainer(),"jw-flag-audio-player"))return 6;var a=0|i.width,o=0|i.height;if(0==a&&0==o){var r=e.sources;return"rtmp"===r[0].type?6:0}return 320>=a?1:640>=a?2:1280>=a?3:4},ui={};try{ui=window.localStorage}catch(t){}var ci={aes:1,widevine:2,playready:3,fairplay:4},di={interaction:1,autostart:2,repeat:3,external:4,"related-interaction":1,"related-auto":5,playlist:6},si={none:1,metadata:2,auto:3},li=function(){function t(e){Ln(this,t),this._api=e,this.previousBufferTime=this.getTotalUnderBufferTime()}return t.prototype.getTotalUnderBufferTime=function(){try{return this._api.qoe().item.sums.stalled||0}catch(t){return 0}},t.prototype.getUnderBufferTimeDelta=function(){var t=!(0<arguments.length&&void 0!==arguments[0])||arguments[0],e=this.getTotalUnderBufferTime(),n=Math.round(e-this.previousBufferTime);return t&&(this.previousBufferTime=e),n},t}(),fi=function(){function t(e){Ln(this,t),this._generateTrackingFunc=e,this._numTrackedSeeks=0,this._setupTrackingParams()}return t.prototype._isTrackingSeek=function(){return 0<this._numTrackedSeeks},t.prototype.trackSeek=function(t){this._isTrackingSeek()||(this._trackingParams.videoStartDragTime=t.position,this._trackingParams.dragStartTime=Date.now()),this._numTrackedSeeks++,this._trackingParams.lastTargetTime=t.offset},t.prototype.trackSeekEnd=function(){var t=this;if(this._isTrackingSeek()){clearTimeout(this._trackingParams.seekDebounceTimeout);var e=Date.now()-this._trackingParams.dragStartTime;1===this._numTrackedSeeks&&(e=0);var n=this._generateTrackingFunc(this._trackingParams.videoStartDragTime,this._trackingParams.lastTargetTime,e);this._trackingParams.seekDebounceTimeout=setTimeout(function(){n(),t._resetSeekData()},1e3)}},t.prototype._setupTrackingParams=function(){this._trackingParams={videoStartDragTime:0,dragStartTime:0,seekDebounceTimeout:-1,lastTargetTime:0}},t.prototype._resetSeekData=function(){this._setupTrackingParams(),this._numTrackedSeeks=0},t}(),pi="playlistItem playAttempt time",hi="adRequest adImpression adError",vi=function(){function t(e){var n=this;Ln(this,t),this._adBreakCount=0,this._shouldTrack=!1,e.on(pi,function(){n._shouldTrack=!0}),e.on(hi,function(){n._shouldTrack&&(n._shouldTrack=!1,n._adBreakCount++)})}return t.prototype.getAdBreakCount=function(){return this._adBreakCount},t}(),gi=Math.floor,mi=Math.round,ki="play",wi="meta",yi="levels",bi="firstFrame",Ti=f(12),Ci=0,Si=function(t,l){function p(n){n=n||i(t);var a,o=r(t),c=ai(t),d=ii(),l=t.getConfig(),f=l.visibility,p=V.isUndefined(f)?f:mi(100*f)/100,h=l.defaultPlaybackRate;t.getViewable&&(a=t.getViewable());var v=[qn(Te,ct[Te],3),qn(gt,ct[gt],4),qn(Se,lt[Se],5),qn(Pe,lt[Pe],6),qn(Vt,lt[Vt],7),qn(kt,dt[kt],8),qn(ce,dt[ce],9),qn(Ut,Ti,10),qn(Ot,s(),10),qn(Ft,ft,10),qn(Me,X(),10),qn(Qt,pt.itemId,11),qn(jt,pt.mediaId||C(n),12),qn(ke,n[ke]||0,13),qn(we,n[we]||null,14),qn(vt,ht.adClient,15),qn(bn,ht.adScheduleId,16),qn(ue,t.getPlaylist().length,21),qn(mt,dt[mt],36),qn(Et,o,37),qn(It,c.bucket,38),qn(Pt,c.width,39),qn(At,c.height,40),qn(ve,p,42),qn(oe,d,43),qn(Ce,st[Ce],44),qn(ge,t.getVolume(),45),qn(pe,t.getMute(),46),qn(be,Oe,47),qn(Lt,e(t),48),qn(We,u(t),49),qn(Xe,h,50),qn(se,!t.getControls(),102),qn(en,Qe,103),qn(nn,pt.index,104),qn(an,Ne,105),qn(yt,I(n),106),qn(Ie,st[Ie],107),qn(_e,st[_e],108),Re?qn(on,Re.getAdBreakCount(),109):null];V.isUndefined(a)||v.push(qn(he,a,41));var g=l.ab;if(g&&g.tests){var m=Object.keys(g.tests).map(function(t){return g.getSelected(t).join(",")}).join(",");v.push(qn(He,m,8))}return v}function h(t){return[qn(wt,T(t,Q),100)].concat(p(t))}function v(e,n){return[qn(xt,n,29),qn(An,o(t),30)].concat(h(e))}function g(e){var n=e||i(t),r=x(),a=c(t);return[qn(Yt,z(pt.playReason),17),qn(Nt,k(n),18),qn(Ht,w(n),19),qn(Wt,y(n),20),qn(ae,K(n),21),qn(St,d(t),22),qn(te,r,23),qn(ze,a.height,24),qn(Ke,a.width,25)].concat(h(e))}function b(e){pt.playReason=e.playReason||"",pt.mediaId=C(e.item||i(t)),j()&&L()}function A(){xe={},je=!1,De=0}function R(e){return function(i){var a=xe[e];if(e===wi){var o=(i.metadata||i).TXXX;if(o){var u=o.programDateTime;if(u){var c=Date.parse(u);isNaN(c)||q(null,Be||1,null,u)}}i=i.metadata||i;var d=i.segment;if(d&&(Fe=!0,Ve=d.encryption),pt.drm=i.drm||"",a&&(i.width=i.width||a.width,i.height=i.height||a.height,i.duration=i.duration||a.duration),(100===i.duration||0===i.duration)&&0===i.width&&0===i.height)return}if(xe[e]=i,e===ki&&(!a&&(Be=0,qe=0),Ee=n(t)),xe[ki]&&xe[wi]&&xe[yi]&&xe[bi]){var o=r(t);"flash_adaptive"===o?!je&&Fe&&(je=!0,Fe=!1,M()):!je&&(je=!0,M())}}}function x(){var e=t.getDuration();if(0>=e){var n=xe[wi];n&&(e=n.duration)}return 0|e}function j(){return!!pt.mediaId}function D(){Le||(Le=new fi(E))}function L(){var e=i(t);Ae.track(it,Y,g(e))}function B(t,e){var n=-1;e&&e.setupTime&&(n=0|10*mi(e.setupTime/10)),Ae.track(nt,Y,[qn(Dt,st[Dt],17),qn(qt,H(),19),qn(Bt,n,20),qn(ae,K(t),21),qn(Xt,dt[Xt],22),qn(le,dt[le],23),qn($t,dt[$t],24),qn(zt,dt[zt],25),qn(Kt,dt[Kt],26),qn(Zt,dt[Zt],27),qn(fe,dt[fe],28),qn(Gt,dt[Gt],29),qn(Jt,dt[Jt],30),qn(de,dt[de],31),qn(me,dt[me],32),qn(Rn,P(t),33),qn($e,dt[$e],34)].concat(h(t)))}function M(){Qe++;var e=x(),n=i(t),r=oi(t,n,xe[yi],xe[wi]),o=c(t);Ae.track(rt,Y,[qn(_t,r,17),qn(Rt,J(e),18),qn(te,e,19),qn(ee,_(n,Q),20),qn(ae,K(n),21),qn(St,d(t),22),qn(Nt,k(n),22),qn(Ht,w(n),23),qn(Wt,y(n),23),qn(Yt,z(pt.playReason),23),qn(Mt,a(t),24),qn(ne,S(n,V),25),qn(re,$(pt.drm)||Ve,26),qn(ie,m(n,t,V),27),qn(Rn,P(n),28),qn(ze,o.height,57),qn(Ke,o.width,58)].concat(v(n,G(e))))}function q(e,n,r,a){if(Be=0,!!j()){var o=i(t),u=[];if(a){if(!o[ke])return;u.push(qn(ye,a,23))}var d=0|n+.5;if(0<d){var s=c(t);Ae.track(at,Y,[qn(bt,d,20),qn(Tt,0|e,21),qn(Nt,k(o),22),qn(Ht,w(o),23),qn(ze,s.height,57),qn(Ke,s.width,58),qn(Ze,Ue.getUnderBufferTimeDelta(),59)].concat(u).concat(v(o,r)))}}}function E(t,e,n){t=gi(t),e=gi(e),n=gi(n);var i=e-t;return 0==i?function(){}:Ae.track.bind(Ae,ut,Y,[qn(Ge,t,20),qn(Je,e,21),qn(Ye,i,22),qn(tn,n,23)].concat(p()))}function U(e,n,r){if(j()&&e<r&&e+n>=r){var a=i(t),o=c(t);Ae.track(ot,Y,[qn(Ct,r),qn(Nt,k(a),22),qn(Ht,w(a),23),qn(ze,o.height,57),qn(Ke,o.width,58)].concat(v(a,G(x()))))}}function O(t){var e=1<arguments.length&&void 0!==arguments[1]&&arguments[1];j()&&(D(),e?Le.trackSeekEnd(t):Le.trackSeek(t))}var V=t._,Q=t.utils,N=!0===l.debug,W=parseInt(l.sdkplatform,10),tt=t.getConfig(),ct=Jn(tt.key,Q.key),dt=ni(tt),st=ti(W),lt=ei(t,l);Ci+=1;var ft=Ci,pt={ready:null,item:null,drm:"",index:0,itemId:"",mediaId:"",playReason:""},ht=this,Ae=new Zn(l,N,t.getContainer());Vn(ht,0,0,t,Ae),Nn(ht,t,Ae);var Re;-1!==ht.adClient&&(Re=new vi(t));var xe,je,De,Le,Be=0,qe=0,Ee=null,Ue=new li(t),Oe=!1,Fe=!1,Ve=!1,Qe=0,Ne=0;ht.getCommonTrackingParameters=function(){return p(i(t))},F(p,t,Ae.track.bind(Ae)),zn(p,t,function(){j()&&Ae.track.apply(Ae,arguments)}),ht.getPlaylistTrackingParameters=function(){return h(i(t))},t.on("idle",A),t.on("ready",function(e){pt.ready=V.extend({},e),pt.item=i(t)}),t.on("playlistItem",function(e){pt.drm="",pt.itemId=f(12),Ne++,pt.index=e.index,pt.ready&&(B(pt.item||i(t),pt.ready),pt.item=null,pt.ready=null),t.off("beforePlay",b),t.once("beforePlay",b),A(),Fe=Ve=!1}),t.on("playAttemptFailed",function(e){pt.mediaId=C(e.item||i(t)),j()&&Ae.track("paf",et,[qn(Dn,e.code,17)].concat(g(e.item)))}),t.on("meta",R(wi)),t.on("levels",R(yi)),t.on("play",R(ki)),t.on("firstFrame",R(bi)),t.on("time",function(e){var i=n(t),r=e.duration;if(i){if(1<i){if(!xe[wi]){var a={duration:r},o=t.getContainer().querySelector("video");o&&(a.width=o.videoWidth,a.height=o.videoHeight),R(wi)(a)}xe[yi]||R(yi)({})}var u=G(r),c=Z(i,r,u);0===De&&(De=c),null===Ee&&(Ee=i);var d=i-Ee;if(Ee=i,d=Math.min(Math.max(0,d),4),Be+=d,U(qe,d,10),U(qe,d,30),U(qe,d,60),qe+=d,!(0>=r||r===1/0)&&c===De+1){var a=128*De/u;if(De=0,c>u)return;q(a,Be,u)}}}),t.on("seek",function(e){Ee=n(t),De=0,O(e)}),t.on("seeked",function(t){O(t,!0)}),t.on("complete",function(){var t=x();if(!(0>=t||t===1/0)){var e=G(t);q(128,Be,e),qe=0}}),t.on("cast",function(t){Oe=!!t.active});var rn=tt.defaultPlaybackRate||1;t.on("playbackRateChanged",function(t){j()&&Ae.track("pru",Y,[qn("ppr",rn,20)].concat(ht.getCommonTrackingParameters())),rn=t.playbackRate}),A()};(window.jwplayerPluginJsonp||window.jwplayer().registerPlugin)("jwpsrv","7.0",Si)}();