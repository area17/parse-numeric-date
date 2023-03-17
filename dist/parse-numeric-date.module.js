var e=(new Intl.NumberFormat).resolvedOptions().locale,n=(new Date).setHours(0,0,0,0),t=new Date(n).getFullYear(),r=function(){var n=new Date(2e3,11,13).toLocaleDateString(e);return[{name:"d",index:n.indexOf("13")},{name:"m",index:n.indexOf("12")},{name:"y",index:n.indexOf("2000")}].sort(function(e,n){return e.index-n.index}).map(function(e){return e.name}).join("-")},a=r(),o=function(e){if(2===e.length){var n=1e3*Math.floor(t/1e3)+parseInt(e,10),r=Math.abs(n-(t+50));return n<t+50||r>100?n:n-100}return e},Y=function(e,n,t){return e.substring(n.indexOf(t),n.indexOf(t)+(n.match(new RegExp(t,"g"))||[]).length)},i=function(e,n){return n.map(function(n){return function(e,n){var t=[{name:"d",index:n.indexOf("D")},{name:"m",index:n.indexOf("M")},{name:"y",index:n.indexOf("Y")}].sort(function(e,n){return e.index-n.index});return{y:Y(e,n,"Y"),m:Y(e,n,"M"),d:Y(e,n,"D"),order:t.map(function(e){return e.name}).join("-")}}(e,n)})},l=function(e,n,t){e=o(e),e=parseInt(e,10),n=parseInt(n,10),t=(t=parseInt(t,10))>function(e,n){return new Date(n,e,0).getDate()}(n=n>12?null:n,e)?null:t,n=n<10?"0"+n:n,t=t<10?"0"+t:t;var r=new Date(e+"-"+n+"-"+t+"T00:00:00.000+00:00");return r instanceof Date&&!isNaN(r)?r:null},u=function(e,t){var r=(e=e.map(function(e){return e.d=l(e.y,e.m,e.d),e.y=parseInt(o(e.y),10),e.diff=Math.abs(n-e.d),e.score=a===e.order?2:1,e.diff>315576e7&&e.score--,e.diff<631152e5&&e.score++,e}).filter(function(e){return null!==e.d}).sort(function(e,n){return n.score-e.score})).length?e[0].score:0;return(e=e.filter(function(e){return e.score===r}).sort(function(e,n){return e.diff-n.diff}).map(function(e){return e.d})).length?e[0]:null},c=function(n,t){null!=t&&t.locale&&(e=t.locale,a=r());var o=n;n=n.replace(/[۰-۹]/g,function(e){return"۰۱۲۳۴۵۶۷۸۹".indexOf(e)}).replace(/[٠-٩]/g,function(e){return"٠١٢٣٤٥٦٧٨٩".indexOf(e)}).trim();var Y=[],c=[].concat(n.matchAll(/([0-9]{4})[^0-9]{1,}([0-9]{1,2})[^0-9]{1,}([0-9]{1,2})/g));return c.length>0?o.match(/[۰-۹]/g)?function(e,n,t){e=parseInt(e,10),n=parseInt(n,10),t=parseInt(t,10);var r=new Intl.DateTimeFormat("en-u-ca-persian",{dateStyle:"short",timeZone:"UTC"}),a=new Date(Date.UTC(2e3,n,t)),o=(a=new Date(a.setUTCDate(a.getUTCDate()+226867))).getUTCFullYear()-2e3+e;a=new Date((o<0?"-":"+")+("00000"+Math.abs(o)).slice(-6)+"-"+("0"+(a.getUTCMonth()+1)).slice(-2)+"-"+("0"+a.getUTCDate()).slice(-2));var Y=[].concat(r.format(a).split("/")),i=Y[0],l=Y[1],u=Y[2],c=0;for(a=new Date(a.setUTCDate(a.getUTCDate()+Math.floor(365.25*e+30.44*n+t-(365.25*u.split(" ")[0]+30.44*i+1*l))-2));c<4;){var D=[].concat(r.format(a).split("/"));if(i=D[0],l=D[1],u=D[2],parseInt(l,10)===t&&parseInt(i,10)===n&&parseInt(u.split(" ")[0],10)===e)return a;a=new Date(a.setUTCDate(a.getUTCDate()+1)),c++}throw console.log("Invalid Persian date"),new Error("Invalid Persian date")}(c[0][1],c[0][2],c[0][3]):l(c[0][1],c[0][2],c[0][3]):(c=[].concat(n.matchAll(/([0-9]{1,2})[^0-9]{1,}([0-9]{2})[^0-9]{1,}([0-9]{4})/g))).length>0?(Y.push({y:c[0][3],m:c[0][2],d:c[0][1],order:"d-m-y"}),Y.push({y:c[0][3],m:c[0][1],d:c[0][2],order:"m-d-y"}),u(Y)):(c=[].concat(n.matchAll(/([0-9]{1,2})[^0-9]{1,}([0-9]{1,2})[^0-9]{1,}([0-9]{1,2})/g))).length>0?(Y.push({y:c[0][3],m:c[0][2],d:c[0][1],order:"d-m-y"}),Y.push({y:c[0][3],m:c[0][1],d:c[0][2],order:"m-d-y"}),Y.push({y:c[0][1],m:c[0][2],d:c[0][3],order:"y-m-d"}),u(Y)):(c=[].concat(n.matchAll(/[0-9]{1,}/g))).length>0?(8===n.length&&(Y=i(n,["YYYYMMDD","DDMMYYYY","MMDDYYYY"])),7===n.length&&(Y=i(n,["YYYYMMD","YYYYMDD","DDMYYYY","MDDYYYY","DMMYYYY","MMDYYYY"])),6===n.length&&(Y=i(n,["YYMMDD","DDMMYY","MMDDYY","YYYYMD","DMYYYY","MDYYYY"])),5===n.length&&(Y=i(n,["YYMMD","YYMDD","DDMYY","MDDYY","DMMYY","MMDYY"])),4===n.length&&(Y=i(n,["YYMD","DMYY","MDYY"])),u(Y)):(console.log("parseNumericDate - unknown format:",n),null)};export{c as default};
//# sourceMappingURL=parse-numeric-date.module.js.map
