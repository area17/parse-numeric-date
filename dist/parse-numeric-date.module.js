var r=(new Intl.NumberFormat).resolvedOptions().locale,n=(new Date).setHours(0,0,0,0);new Date(n).getFullYear();var s=function(){var n=new Date(2e3,11,13).toLocaleDateString(r);return[{name:"d",index:n.indexOf("13")},{name:"m",index:n.indexOf("12")},{name:"y",index:n.indexOf("2000")}].sort(function(r,n){return r.index-n.index}).map(function(r){return r.name}).join("-")},t=s(),e=function(r){return 2===r.length?parseInt(r)>60?"19"+r:"20"+r:r},u=function(r,n,s){r=e(r),r=parseInt(r,10),n=parseInt(n,10),s=(s=parseInt(s,10))>function(r,n){return new Date(n,r,0).getDate()}(n=n>12?null:n,r)?null:s,n=n<10?"0"+n:n,s=s<10?"0"+s:s;var t=new Date(r+"-"+n+"-"+s+"T00:00:00.000+00:00");return t instanceof Date&&!isNaN(t)?t:null},d=function(r){var s=(r=r.map(function(r){return r.d=u(r.y,r.m,r.d),r.y=parseInt(e(r.y),10),r.diff=Math.abs(n-r.d),r.score=t===r.order?2:1,r.diff>315576e7&&r.score--,r.diff<631152e5&&r.score++,r}).filter(function(r){return null!==r.d}).sort(function(r,n){return n.score-r.score}))[0].score;return(r=r.filter(function(r){return r.score===s}).sort(function(r,n){return r.diff-n.diff}).map(function(r){return r.d})).length?r[0]:null},i=function(n,e){null!=e&&e.locale&&(r=e.locale,t=s()),n=n.trim();var i=[],o=[].concat(n.matchAll(/([0-9]{4})[^0-9]{1}([0-9]{1,2})[^0-9]{1}([0-9]{1,2})/g));return o.length>0?u(o[0][1],o[0][2],o[0][3]):(o=[].concat(n.matchAll(/([0-9]{1,2})[^0-9]{1}([0-9]{2})[^0-9]{1}([0-9]{4})/g))).length>0?(i.push({y:o[0][3],m:o[0][2],d:o[0][1],order:"d-m-y"}),i.push({y:o[0][3],m:o[0][1],d:o[0][2],order:"m-d-y"}),d(i)):(o=[].concat(n.matchAll(/([0-9]{1,2})[^0-9]{1}([0-9]{1,2})[^0-9]{1}([0-9]{1,2})/g))).length>0?(i.push({y:o[0][3],m:o[0][2],d:o[0][1],order:"d-m-y"}),i.push({y:o[0][3],m:o[0][1],d:o[0][2],order:"m-d-y"}),i.push({y:o[0][1],m:o[0][2],d:o[0][3],order:"y-m-d"}),d(i)):8===n.length?(i.push({y:n.substring(4,8),m:n.substring(2,4),d:n.substring(0,2),order:"d-m-y"}),i.push({y:n.substring(4,8),m:n.substring(0,2),d:n.substring(2,4),order:"m-d-y"}),i.push({y:n.substring(0,4),m:n.substring(4,6),d:n.substring(6,8),order:"y-m-d"}),d(i)):6===n.length?(i.push({y:n.substring(4,6),m:n.substring(2,4),d:n.substring(0,2),order:"d-m-y"}),i.push({y:n.substring(4,6),m:n.substring(0,2),d:n.substring(2,4),order:"m-d-y"}),i.push({y:n.substring(0,2),m:n.substring(2,4),d:n.substring(4,6),order:"y-m-d"}),i.push({y:n.substring(2,6),m:n.substring(1,2),d:n.substring(0,1),order:"d-m-y"}),i.push({y:n.substring(2,6),m:n.substring(0,1),d:n.substring(1,2),order:"m-d-y"}),i.push({y:n.substring(0,4),m:n.substring(4,5),d:n.substring(5,6),order:"y-m-d"}),d(i)):4===n.length?(i.push({y:n.substring(2,4),m:n.substring(1,2),d:n.substring(0,1),order:"d-m-y"}),i.push({y:n.substring(2,4),m:n.substring(0,1),d:n.substring(1,2),order:"m-d-y"}),i.push({y:n.substring(0,2),m:n.substring(2,3),d:n.substring(3,4),order:"y-m-d"}),d(i)):void 0};export{i as default};
//# sourceMappingURL=parse-numeric-date.module.js.map