var Kudos=function(){"use strict";var e={},n={startingNumber:58,wrapper:document.querySelector(".js-kudos"),container:document.querySelector(".kudos-counter"),text:document.querySelector(".js-kudos > p"),numberClass:"kudos-number",animateClass:"kudos-animate",animation:{speed:300,numberPosition:[25,0],helperPosition:[13,0]}},t=!1;console.log(n);var o={raw:[],helpers:[]};e.numbers=o,e.config=n;var r=function(){var e=document.createDocumentFragment();[].forEach.call(o.helpers,function(t,r,a){void 0===o.raw[r]&&(o.raw[r]="");var i=document.createElement("DIV");i.classList.add(n.numberClass),i.innerHTML='<p class="kudos-number-helper" style="top:'+n.animation.helperPosition[0]+'px; opacity: 0;">'+o.helpers[r]+'</p><p class="kudos-number-visible" style="top:'+n.animation.numberPosition[0]+'px; opacity: 1;">'+o.raw[r]||"0</p>",o.helpers[r]!==o.raw[r]&&i.classList.add(n.animateClass),e.appendChild(i)}),n.container.innerHTML="",n.container.appendChild(e)},a=function(e){e&&(n.startingNumber=e);for(var t=n.startingNumber.toString(),a=0;a<t.length;a++)o.raw[a]=t.charAt(a);for(var i=(n.startingNumber+1).toString(),c=0;c<i.length;c++)o.helpers[c]=i.charAt(c);n.wrapper.addEventListener("mouseover",s,!1),n.wrapper.addEventListener("mouseout",u,!1),r()};e.init=a;var i=function(){var e=document.querySelectorAll("."+n.animateClass);[].forEach.call(e,function(e,n,t){var o=e.querySelector(".kudos-number-helper"),r=e.querySelector(".kudos-number-visible");Velocity(r,{top:[36,26],opacity:[1,1]},{duration:500,easing:"easeIn",complete:function(){Velocity(o,{top:[26,8]},{delay:500,duration:2200,easing:[500,12],begin:function(){o.classList.add("showme"),c()}}),Velocity(r,{top:[46,36],opacity:[0,1]},{delay:100,duration:500,easing:"easeIn"})}})})};e.animate=i;var s=function(e){console.log(e),"finished"!==t&&(n.text.innerHTML="Don't move!"),t===!1&&(i(),t=!0)},u=function(e){},c=function(){t="finished",n.text.innerHTML="Thanks!",console.log("animation done")};return e.done=c,a(n.startingNumber),e}();console.log(Kudos.numbers);