var Kudos=function(){"use strict";var e={},t={startingNumber:58,wrapper:".js-kudos",container:".kudos-counter",text:".js-kudos > p",numberClass:"kudos-number",animateClass:"kudos-animate",animation:{numberPosition:[25,0],helperPosition:[8,0]},dialog:{intro:"Kudos",hover:"Don't move!",finish:"Thanks!"}},n=!1,r=[],o=!1,a=!1,i={raw:[],helpers:[]};e.config=t;var s=function(e){n===!1&&(t.wrapper=document.querySelector(t.wrapper),t.container=document.querySelector(t.container),t.text=document.querySelector(t.text),n=!0),e&&(t.startingNumber=e);for(var r=t.startingNumber.toString(),o=0;o<r.length;o++)i.raw[o]=r.charAt(o);for(var a=(t.startingNumber+1).toString(),s=0;s<a.length;s++)i.helpers[s]=a.charAt(s);t.wrapper.addEventListener("mouseover",p,!1),t.wrapper.addEventListener("mouseleave",d,!1),u(),c()};e.init=s;var u=function(){var e=document.createDocumentFragment();[].forEach.call(i.helpers,function(n,r,o){void 0===i.raw[r]&&(i.raw[r]="");var a=document.createElement("DIV");a.classList.add(t.numberClass),a.innerHTML='<p class="kudos-number-helper" style="top:'+t.animation.helperPosition[0]+'px; opacity: 0;">'+i.helpers[r]+'</p><p class="kudos-number-visible" style="top:'+t.animation.numberPosition[0]+'px; opacity: 1;">'+i.raw[r]||"0</p>",i.helpers[r]!==i.raw[r]&&a.classList.add(t.animateClass),e.appendChild(a)}),t.container.innerHTML="",t.container.appendChild(e)},c=function(){var e=document.querySelectorAll("."+t.animateClass);[].forEach.call(e,function(e,t,n){var o=e.querySelector(".kudos-number-helper"),a=e.querySelector(".kudos-number-visible"),i=new TimelineLite({paused:!0});i.to(a,.5,{top:36}).to(a,.5,{top:46,opacity:0}).call(function(){m()}).to(o,1,{opacity:1},"-=0.25").to(o,2.2,{top:25,ease:Elastic.easeOut},"-=1"),r[t]=i})},l=function(){a===!1&&[].forEach.call(r,function(e,t,n){e.restart()})},p=function(e){a===!1&&(t.text.innerHTML=t.dialog.hover),o===!1&&(l(),o=!0)},d=function(e){a===!1&&([].forEach.call(r,function(e,t,n){e.reverse()}),o=!1,t.text.innerHTML=t.dialog.intro)},m=function(){a=!0,o=!1,t.text.innerHTML=t.dialog.finish,h()},h=function(){};return e.extendDone=h,s(t.startingNumber),e}();console.log(Kudos);