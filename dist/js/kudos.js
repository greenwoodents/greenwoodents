var Kudos=function(){"use strict";var e={},n={startingNumber:59,wrapper:".js-kudos",container:".kudos-counter",text:".js-kudos > p",numberClass:"kudos-number",animateClass:"kudos-animate",animation:{numberPosition:[25,0],helperPosition:[8,0]},dialog:{intro:"Kudos",hover:"Don't move!",finish:"Thanks!"}},t=!1,r=[],o=!1,a=!1,i={raw:[],helpers:[]};e.config=n;var s=function(e){i={raw:[],helpers:[]},t===!1&&(n.wrapper=document.querySelector(n.wrapper),n.container=document.querySelector(n.container),n.text=document.querySelector(n.text),t=!0),e&&(n.startingNumber=e);for(var r=n.startingNumber.toString(),o=0;o<r.length;o++)i.raw[o]=r.charAt(o);for(var a=(n.startingNumber+1).toString(),s=0;s<a.length;s++)i.helpers[s]=a.charAt(s);n.wrapper.addEventListener("mouseover",p,!1),n.wrapper.addEventListener("mouseleave",d,!1),c(),u()};e.init=s;var c=function(){var e=document.createDocumentFragment();[].forEach.call(i.helpers,function(t,r,o){void 0===i.raw[r]&&(i.raw[r]="");var a=document.createElement("DIV");a.classList.add(n.numberClass),a.innerHTML='<p class="kudos-number-helper" style="top:'+n.animation.helperPosition[0]+'px; opacity: 0;">'+i.helpers[r]+'</p><p class="kudos-number-visible" style="top:'+n.animation.numberPosition[0]+'px; opacity: 1;">'+i.raw[r]||"0</p>",i.helpers[r]!==i.raw[r]&&a.classList.add(n.animateClass),e.appendChild(a)}),n.container.innerHTML="",n.container.appendChild(e)},u=function(){r=[],o=!1,a=!1;var e=document.querySelectorAll("."+n.animateClass);[].forEach.call(e,function(e,n,t){var o=e.querySelector(".kudos-number-helper"),a=e.querySelector(".kudos-number-visible"),i=new TimelineLite({paused:!0});i.to(a,.5,{top:36}).to(a,.5,{top:46,opacity:0}).call(function(){m()}).to(o,1,{opacity:1},"-=0.25").to(o,2.2,{top:25,ease:Elastic.easeOut},"-=1"),r[n]=i})},l=function(){a===!1&&[].forEach.call(r,function(e,n,t){e.restart()})},p=function(e){console.log("hover"),a===!1&&(n.text.innerHTML=n.dialog.hover),o===!1&&(l(),o=!0)},d=function(e){a===!1&&([].forEach.call(r,function(e,n,t){e.reverse()}),o=!1,n.text.innerHTML=n.dialog.intro)},m=function(){a=!0,o=!1,n.text.innerHTML=n.dialog.finish,window.location.hash="😮",h()},h=function(){};return e.extendDone=h,s(n.startingNumber),e}();console.log(Kudos);