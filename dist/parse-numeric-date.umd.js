!function(s,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):(s||self).parseNumericDate=r()}(this,function(){var s=(new Intl.NumberFormat).resolvedOptions().locale,r=(new Date).setHours(0,0,0,0);new Date(r).getFullYear();var n=function(){var r=new Date(2e3,11,13).toLocaleDateString(s);return[{name:"d",index:r.indexOf("13")},{name:"m",index:r.indexOf("12")},{name:"y",index:r.indexOf("2000")}].sort(function(s,r){return s.index-r.index}).map(function(s){return s.name}).join("-")},t=n(),u=function(s){return 2===s.length?parseInt(s)>60?"19"+s:"20"+s:s},e=function(s,r,n){s=u(s),s=parseInt(s,10),r=parseInt(r,10),n=(n=parseInt(n,10))>function(s,r){return new Date(r,s,0).getDate()}(r=r>12?null:r,s)?null:n,r=r<10?"0"+r:r,n=n<10?"0"+n:n;var t=new Date(s+"-"+r+"-"+n+"T00:00:00.000+00:00");return t instanceof Date&&!isNaN(t)?t:null},i=function(s){var n=(s=s.map(function(s){return s.d=e(s.y,s.m,s.d),s.y=parseInt(u(s.y),10),s.diff=Math.abs(r-s.d),s.score=t===s.order?2:1,s.diff>315576e7&&s.score--,s.diff<631152e5&&s.score++,s}).filter(function(s){return null!==s.d}).sort(function(s,r){return r.score-s.score}))[0].score;return(s=s.filter(function(s){return s.score===n}).sort(function(s,r){return s.diff-r.diff}).map(function(s){return s.d})).length?s[0]:null};return function(r,u){null!=u&&u.locale&&(s=u.locale,t=n()),r=r.trim();var d=[],g=[].concat(r.matchAll(/([0-9]{4})[^0-9]{1}([0-9]{1,2})[^0-9]{1}([0-9]{1,2})/g));return g.length>0?e(g[0][1],g[0][2],g[0][3]):(g=[].concat(r.matchAll(/([0-9]{1,2})[^0-9]{1}([0-9]{2})[^0-9]{1}([0-9]{4})/g))).length>0?(d.push({y:g[0][3],m:g[0][2],d:g[0][1],order:"d-m-y"}),d.push({y:g[0][3],m:g[0][1],d:g[0][2],order:"m-d-y"}),i(d)):(g=[].concat(r.matchAll(/([0-9]{1,2})[^0-9]{1}([0-9]{1,2})[^0-9]{1}([0-9]{1,2})/g))).length>0?(d.push({y:g[0][3],m:g[0][2],d:g[0][1],order:"d-m-y"}),d.push({y:g[0][3],m:g[0][1],d:g[0][2],order:"m-d-y"}),d.push({y:g[0][1],m:g[0][2],d:g[0][3],order:"y-m-d"}),i(d)):(8===r.length&&(d.push({y:r.substring(4,8),m:r.substring(2,4),d:r.substring(0,2),order:"d-m-y"}),d.push({y:r.substring(4,8),m:r.substring(0,2),d:r.substring(2,4),order:"m-d-y"}),d.push({y:r.substring(0,4),m:r.substring(4,6),d:r.substring(6,8),order:"y-m-d"})),7===r.length&&(d.push({y:r.substring(0,4),m:r.substring(4,6),d:r.substring(6,7),order:"y-m-d"}),d.push({y:r.substring(0,4),m:r.substring(4,5),d:r.substring(5,7),order:"y-m-d"}),d.push({y:r.substring(3,7),m:r.substring(2,3),d:r.substring(0,2),order:"d-m-y"}),d.push({y:r.substring(3,7),m:r.substring(1,3),d:r.substring(0,1),order:"d-m-y"}),d.push({y:r.substring(3,7),m:r.substring(0,2),d:r.substring(2,3),order:"d-m-y"}),d.push({y:r.substring(3,7),m:r.substring(0,1),d:r.substring(2,3),order:"d-m-y"})),6===r.length&&(d.push({y:r.substring(4,6),m:r.substring(2,4),d:r.substring(0,2),order:"d-m-y"}),d.push({y:r.substring(4,6),m:r.substring(0,2),d:r.substring(2,4),order:"m-d-y"}),d.push({y:r.substring(0,2),m:r.substring(2,4),d:r.substring(4,6),order:"y-m-d"}),d.push({y:r.substring(2,6),m:r.substring(1,2),d:r.substring(0,1),order:"d-m-y"}),d.push({y:r.substring(2,6),m:r.substring(0,1),d:r.substring(1,2),order:"m-d-y"}),d.push({y:r.substring(0,4),m:r.substring(4,5),d:r.substring(5,6),order:"y-m-d"})),5===r.length&&(d.push({y:r.substring(0,2),m:r.substring(2,4),d:r.substring(4,5),order:"y-m-d"}),d.push({y:r.substring(0,2),m:r.substring(2,3),d:r.substring(3,5),order:"y-m-d"}),d.push({y:r.substring(3,5),m:r.substring(2,3),d:r.substring(0,2),order:"d-m-y"}),d.push({y:r.substring(3,5),m:r.substring(1,3),d:r.substring(0,1),order:"d-m-y"}),d.push({y:r.substring(3,5),m:r.substring(0,2),d:r.substring(2,3),order:"d-m-y"}),d.push({y:r.substring(3,5),m:r.substring(0,1),d:r.substring(2,3),order:"d-m-y"})),4===r.length&&(d.push({y:r.substring(2,4),m:r.substring(1,2),d:r.substring(0,1),order:"d-m-y"}),d.push({y:r.substring(2,4),m:r.substring(0,1),d:r.substring(1,2),order:"m-d-y"}),d.push({y:r.substring(0,2),m:r.substring(2,3),d:r.substring(3,4),order:"y-m-d"})),i(d))}});
//# sourceMappingURL=parse-numeric-date.umd.js.map
