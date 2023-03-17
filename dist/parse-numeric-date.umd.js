!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e||self).parseNumericDate=n()}(this,function(){var e=(new Intl.NumberFormat).resolvedOptions().locale,n=(new Date).setHours(0,0,0,0),t=new Date(n).getFullYear(),r=function(){var n=new Date(2e3,11,13).toLocaleDateString(e);return[{name:"d",index:n.indexOf("13")},{name:"m",index:n.indexOf("12")},{name:"y",index:n.indexOf("2000")}].sort(function(e,n){return e.index-n.index}).map(function(e){return e.name}).join("-")},a=r(),o=function(e){if(2===e.length){var n=1e3*Math.floor(t/1e3)+parseInt(e,10),r=Math.abs(n-(t+50));return n<t+50||r>100?n:n-100}return e},i=function(e,n,t){return e.substring(n.indexOf(t),n.indexOf(t)+(n.match(new RegExp(t,"g"))||[]).length)},l=function(e,n){return n.map(function(n){return function(e,n){var t=[{name:"d",index:n.indexOf("D")},{name:"m",index:n.indexOf("M")},{name:"y",index:n.indexOf("Y")}].sort(function(e,n){return e.index-n.index});return{y:i(e,n,"Y"),m:i(e,n,"M"),d:i(e,n,"D"),order:t.map(function(e){return e.name}).join("-")}}(e,n)})},u=function(e,n,t){e=o(e),e=parseInt(e,10),n=parseInt(n,10),t=(t=parseInt(t,10))>function(e,n){return new Date(n,e,0).getDate()}(n=n>12?null:n,e)?null:t,n=n<10?"0"+n:n,t=t<10?"0"+t:t;var r=new Date(e+"-"+n+"-"+t+"T00:00:00.000+00:00");return r instanceof Date&&!isNaN(r)?r:null},Y=function(e,t){var r=(e=e.map(function(e){return e.d=u(e.y,e.m,e.d),e.y=parseInt(o(e.y),10),e.diff=Math.abs(n-e.d),e.score=a===e.order?2:1,e.diff>315576e7&&e.score--,e.diff<631152e5&&e.score++,e}).filter(function(e){return null!==e.d}).sort(function(e,n){return n.score-e.score})).length?e[0].score:0;return(e=e.filter(function(e){return e.score===r}).sort(function(e,n){return e.diff-n.diff}).map(function(e){return e.d})).length?e[0]:null};return function(n,t){null!=t&&t.locale&&(e=t.locale,a=r());var o=n;n=n.replace(/[۰-۹]/g,function(e){return"۰۱۲۳۴۵۶۷۸۹".indexOf(e)}).replace(/[٠-٩]/g,function(e){return"٠١٢٣٤٥٦٧٨٩".indexOf(e)}).trim();var i=[],c=[].concat(n.matchAll(/([0-9]{4})[^0-9]{1,}([0-9]{1,2})[^0-9]{1,}([0-9]{1,2})/g));return c.length>0?o.match(/[۰-۹]/g)?function(e,n,t){e=parseInt(e,10),n=parseInt(n,10),t=parseInt(t,10);var r=new Intl.DateTimeFormat("en-u-ca-persian",{dateStyle:"short",timeZone:"UTC"}),a=new Date(Date.UTC(2e3,n,t)),o=(a=new Date(a.setUTCDate(a.getUTCDate()+226867))).getUTCFullYear()-2e3+e;a=new Date((o<0?"-":"+")+("00000"+Math.abs(o)).slice(-6)+"-"+("0"+(a.getUTCMonth()+1)).slice(-2)+"-"+("0"+a.getUTCDate()).slice(-2));var i=[].concat(r.format(a).split("/")),l=i[0],u=i[1],Y=i[2],c=0;for(a=new Date(a.setUTCDate(a.getUTCDate()+Math.floor(365.25*e+30.44*n+t-(365.25*Y.split(" ")[0]+30.44*l+1*u))-2));c<4;){var f=[].concat(r.format(a).split("/"));if(l=f[0],u=f[1],Y=f[2],parseInt(u,10)===t&&parseInt(l,10)===n&&parseInt(Y.split(" ")[0],10)===e)return a;a=new Date(a.setUTCDate(a.getUTCDate()+1)),c++}throw console.log("Invalid Persian date"),new Error("Invalid Persian date")}(c[0][1],c[0][2],c[0][3]):u(c[0][1],c[0][2],c[0][3]):(c=[].concat(n.matchAll(/([0-9]{1,2})[^0-9]{1,}([0-9]{2})[^0-9]{1,}([0-9]{4})/g))).length>0?(i.push({y:c[0][3],m:c[0][2],d:c[0][1],order:"d-m-y"}),i.push({y:c[0][3],m:c[0][1],d:c[0][2],order:"m-d-y"}),Y(i)):(c=[].concat(n.matchAll(/([0-9]{1,2})[^0-9]{1,}([0-9]{1,2})[^0-9]{1,}([0-9]{1,2})/g))).length>0?(i.push({y:c[0][3],m:c[0][2],d:c[0][1],order:"d-m-y"}),i.push({y:c[0][3],m:c[0][1],d:c[0][2],order:"m-d-y"}),i.push({y:c[0][1],m:c[0][2],d:c[0][3],order:"y-m-d"}),Y(i)):(c=[].concat(n.matchAll(/[0-9]{1,}/g))).length>0?(8===n.length&&(i=l(n,["YYYYMMDD","DDMMYYYY","MMDDYYYY"])),7===n.length&&(i=l(n,["YYYYMMD","YYYYMDD","DDMYYYY","MDDYYYY","DMMYYYY","MMDYYYY"])),6===n.length&&(i=l(n,["YYMMDD","DDMMYY","MMDDYY","YYYYMD","DMYYYY","MDYYYY"])),5===n.length&&(i=l(n,["YYMMD","YYMDD","DDMYY","MDDYY","DMMYY","MMDYY"])),4===n.length&&(i=l(n,["YYMD","DMYY","MDYY"])),Y(i)):(console.log("parseNumericDate - unknown format:",n),null)}});
//# sourceMappingURL=parse-numeric-date.umd.js.map
