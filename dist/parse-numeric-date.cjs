var r=(new Intl.NumberFormat).resolvedOptions().locale,s=(new Date).setHours(0,0,0,0);new Date(s).getFullYear();var t=function(){var s=new Date(2e3,11,13).toLocaleDateString(r);return[{name:"d",index:s.indexOf("13")},{name:"m",index:s.indexOf("12")},{name:"y",index:s.indexOf("2000")}].sort(function(r,s){return r.index-s.index}).map(function(r){return r.name}).join("-")},n=t(),e=function(r){return 2===r.length?parseInt(r)>60?"19"+r:"20"+r:r},u=function(r,s,t){r=e(r),r=parseInt(r,10),s=parseInt(s,10),t=(t=parseInt(t,10))>function(r,s){return new Date(s,r,0).getDate()}(s=s>12?null:s,r)?null:t,s=s<10?"0"+s:s,t=t<10?"0"+t:t;var n=new Date(r+"-"+s+"-"+t+"T00:00:00.000+00:00");return n instanceof Date&&!isNaN(n)?n:null},i=function(r,t){var i=(r=r.map(function(r){return r.d=u(r.y,r.m,r.d),r.y=parseInt(e(r.y),10),r.diff=Math.abs(s-r.d),r.score=n===r.order?2:1,r.diff>315576e7&&r.score--,r.diff<631152e5&&r.score++,r}).filter(function(r){return null!==r.d}).sort(function(r,s){return s.score-r.score})).length?r[0].score:0;return(r=r.filter(function(r){return r.score===i}).sort(function(r,s){return r.diff-s.diff}).map(function(r){return r.d})).length?r[0]:null};module.exports=function(s,e){null!=e&&e.locale&&(r=e.locale,n=t());var d=s;s=s.replace(/[۰-۹]/g,function(r){return"۰۱۲۳۴۵۶۷۸۹".indexOf(r)}).replace(/[٠-٩]/g,function(r){return"٠١٢٣٤٥٦٧٨٩".indexOf(r)}).trim();var g=[],o=[].concat(s.matchAll(/([0-9]{4})[^0-9]{1,}([0-9]{1,2})[^0-9]{1,}([0-9]{1,2})/g));return o.length>0?d.match(/[۰-۹]/g)?function(r,s,t){r=parseInt(r,10),s=parseInt(s,10),t=parseInt(t,10);var n=new Intl.DateTimeFormat("en-u-ca-persian",{dateStyle:"short",timeZone:"UTC"}),e=new Date(Date.UTC(2e3,s,t)),u=(e=new Date(e.setUTCDate(e.getUTCDate()+226867))).getUTCFullYear()-2e3+r;e=new Date((u<0?"-":"+")+("00000"+Math.abs(u)).slice(-6)+"-"+("0"+(e.getUTCMonth()+1)).slice(-2)+"-"+("0"+e.getUTCDate()).slice(-2));var i=[].concat(n.format(e).split("/")),d=i[0],g=i[1],o=i[2],a=0;for(e=new Date(e.setUTCDate(e.getUTCDate()+Math.floor(365.25*r+30.44*s+t-(365.25*o.split(" ")[0]+30.44*d+1*g))-2));a<4;){var m=[].concat(n.format(e).split("/"));if(d=m[0],g=m[1],o=m[2],parseInt(g,10)===t&&parseInt(d,10)===s&&parseInt(o.split(" ")[0],10)===r)return e;e=new Date(e.setUTCDate(e.getUTCDate()+1)),a++}throw console.log("Invalid Persian date"),new Error("Invalid Persian date")}(o[0][1],o[0][2],o[0][3]):u(o[0][1],o[0][2],o[0][3]):(o=[].concat(s.matchAll(/([0-9]{1,2})[^0-9]{1,}([0-9]{2})[^0-9]{1,}([0-9]{4})/g))).length>0?(g.push({y:o[0][3],m:o[0][2],d:o[0][1],order:"d-m-y"}),g.push({y:o[0][3],m:o[0][1],d:o[0][2],order:"m-d-y"}),i(g)):(o=[].concat(s.matchAll(/([0-9]{1,2})[^0-9]{1,}([0-9]{1,2})[^0-9]{1,}([0-9]{1,2})/g))).length>0?(g.push({y:o[0][3],m:o[0][2],d:o[0][1],order:"d-m-y"}),g.push({y:o[0][3],m:o[0][1],d:o[0][2],order:"m-d-y"}),g.push({y:o[0][1],m:o[0][2],d:o[0][3],order:"y-m-d"}),i(g)):(8===s.length&&(g.push({y:s.substring(4,8),m:s.substring(2,4),d:s.substring(0,2),order:"d-m-y"}),g.push({y:s.substring(4,8),m:s.substring(0,2),d:s.substring(2,4),order:"m-d-y"}),g.push({y:s.substring(0,4),m:s.substring(4,6),d:s.substring(6,8),order:"y-m-d"})),7===s.length&&(g.push({y:s.substring(0,4),m:s.substring(4,6),d:s.substring(6,7),order:"y-m-d"}),g.push({y:s.substring(0,4),m:s.substring(4,5),d:s.substring(5,7),order:"y-m-d"}),g.push({y:s.substring(3,7),m:s.substring(2,3),d:s.substring(0,2),order:"d-m-y"}),g.push({y:s.substring(3,7),m:s.substring(1,3),d:s.substring(0,1),order:"d-m-y"}),g.push({y:s.substring(3,7),m:s.substring(0,2),d:s.substring(2,3),order:"d-m-y"}),g.push({y:s.substring(3,7),m:s.substring(0,1),d:s.substring(2,3),order:"d-m-y"})),6===s.length&&(g.push({y:s.substring(4,6),m:s.substring(2,4),d:s.substring(0,2),order:"d-m-y"}),g.push({y:s.substring(4,6),m:s.substring(0,2),d:s.substring(2,4),order:"m-d-y"}),g.push({y:s.substring(0,2),m:s.substring(2,4),d:s.substring(4,6),order:"y-m-d"}),g.push({y:s.substring(2,6),m:s.substring(1,2),d:s.substring(0,1),order:"d-m-y"}),g.push({y:s.substring(2,6),m:s.substring(0,1),d:s.substring(1,2),order:"m-d-y"}),g.push({y:s.substring(0,4),m:s.substring(4,5),d:s.substring(5,6),order:"y-m-d"})),5===s.length&&(g.push({y:s.substring(0,2),m:s.substring(2,4),d:s.substring(4,5),order:"y-m-d"}),g.push({y:s.substring(0,2),m:s.substring(2,3),d:s.substring(3,5),order:"y-m-d"}),g.push({y:s.substring(3,5),m:s.substring(2,3),d:s.substring(0,2),order:"d-m-y"}),g.push({y:s.substring(3,5),m:s.substring(1,3),d:s.substring(0,1),order:"d-m-y"}),g.push({y:s.substring(3,5),m:s.substring(0,2),d:s.substring(2,3),order:"d-m-y"}),g.push({y:s.substring(3,5),m:s.substring(0,1),d:s.substring(2,3),order:"d-m-y"})),4===s.length&&(g.push({y:s.substring(2,4),m:s.substring(1,2),d:s.substring(0,1),order:"d-m-y"}),g.push({y:s.substring(2,4),m:s.substring(0,1),d:s.substring(1,2),order:"m-d-y"}),g.push({y:s.substring(0,2),m:s.substring(2,3),d:s.substring(3,4),order:"y-m-d"})),i(g))};
//# sourceMappingURL=parse-numeric-date.cjs.map
