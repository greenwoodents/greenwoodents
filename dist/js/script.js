Pace.once("done",function(){app.afterLoadInitial()}),function(){"use strict";var e=window.matchMedia("(min-width: 768px)"),t=window.matchMedia("(min-width: 680px)"),n={},a=[];n.extFn=a;var o=function(e,t,n){null!=e&&"undefined"!=typeof e&&(e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent?e.attachEvent("on"+t,n):e["on"+t]=n)},c=function(){[].forEach.call(document.querySelectorAll(".defer"),function(e,t,n){e.classList.remove("defer"),e.classList.add("deferload"),e.hasAttribute("data-src")&&(e.style.backgroundImage="url('"+e.getAttribute("data-src")+"')")})},i=function(){var e=document.querySelectorAll("#instafeed");[].forEach.call(e,function(e,t,n){var a=new Instafeed({get:"user",clientId:"1fbd28fc3ac2446190809988d7bdbab7",userId:1650642267,accessToken:"1650642267.467ede5.f7b1d8f9e1f4423b910d327f28f7b517",resolution:"standard_resolution",limit:7,template:'<img src="{{image}}" />'});a.run(),document.querySelector(".button-instagram").addEventListener("click",function(){ga("send","event","instagram","clicked")})})},s=function(){var n,a={active:"menu-active",activeLeft:"menu-active-left",openRight:"menu-from-right-open",openLeft:"menu-from-left-open"},c=document.body,i=0,s=0,d=!1,l={},r=function(){o(window,"resize",p),o(window,"resize",f),o(window,"scroll",v),o(window,"popstate",h),n=new Dragdealer("dragMenu",{steps:2,speed:.3,loose:!1,requestAnimationFrame:!0,css3:!0,dragStopCallback:function(e,n){1===e?(c.classList.add("opened"),t.matches&&(window.scrollTo(0,0),window.location.hash="menu")):setTimeout(function(){c.classList.remove("opened"),window.location.hash=""},300)},dragStartCallback:function(e,t){1===e&&c.classList.remove("opened")}}),h(),p(),g.init(),t.matches||d!==!1||"menu"===window.location.hash||document.querySelector(".menu-drag").classList.add("menu-in-out")},u=function(){var e=document.querySelectorAll(".js-open-menu"),n=document.querySelectorAll(".js-open-menu-left"),a=document.querySelector(".menu-close");[].forEach.call(e,function(e,t,n){o(e,"click",function(){event.stopImmediatePropagation(),w("right")})}),[].forEach.call(n,function(e,t,n){o(e,"click",function(){event.stopImmediatePropagation(),w("left")})}),a.addEventListener("click",function(){event.stopImmediatePropagation(),t.matches&&(window.location.hash=""),document.body.classList.add("button-click"),setTimeout(function(){document.body.classList.remove("button-click")},500)})};l.addButtonListeners=u;var m=function(){for(var e in a)if(a.hasOwnProperty(e)){var t=a[e];c.classList.remove(t)}};l.clearAllMenuState=m;var f=function(){var e=window.matchMedia("(min-width: 1300px)"),t=window.matchMedia("(min-width: 960px)"),n=window.matchMedia("(min-width: 680px)"),a=window.matchMedia("(max-width: 680px)"),o=15,c=4;n.matches&&(c=2),t.matches&&(c=3),e.matches&&(c=4),a.matches&&(c=1);var i,s=document.querySelector(".js-filtr-content"),d=s.offsetWidth;i="BackCompat"===document.compatMode?document.body.clientWidth:document.documentElement.clientWidth;var l=Math.round((d-4)/c-2*o),r=document.querySelectorAll(".js-filtr-content li");[].forEach.call(r,function(e,t,n){e.style.width=l+"px",e.style.margin=o+"px"})};l.size=f;var h=function(){var e=c.classList.contains("opened"),n=c.classList.contains(a.active);"#menu"===window.location.hash?e||n||(t.matches?w("left"):L("open")):(e||n)&&(t.matches?m():L("close"))};l.checkUrlforHash=h;var v=function(t){var n=document.body.classList.contains("body-homepage");if(!n){var a=document.querySelector(".fixed-menu-block");a&&e.matches&&(s=document.body.scrollTop,s>i?a.classList.add("hidden"):a.classList.remove("hidden"),i=s)}},p=function(){var e=c.classList.contains("opened"),o=c.classList.contains(a.active);return t.matches?(n.disable(),(e||o)&&(L("close"),w("left")),"desktop"):(n.enable(),(e||o)&&(m(),L("open")),"mobile")},L=function(e){switch(e){case"close":n.setValue(0,0),c.classList.remove("opened");break;case"open":n.setValue(1,0),c.classList.add("opened");break;default:n.setValue(1,0),c.classList.add("opened")}},w=function(e){if(window.scrollTo(0,0),!c.classList.contains(a.active))switch(e){case"left":c.classList.add(a.active),c.classList.add(a.activeLeft),c.classList.add(a.openLeft);break;case"right":c.classList.add(a.active),c.classList.add(a.openRight);break;default:c.classList.add(a.active),c.classList.add(a.openRight)}f(),t.matches&&(window.location.hash="menu")},g=function(){var e,t={},n=function(){console.log("init");var t=document.querySelectorAll(".js-filtr a");[].forEach.call(t,function(t,n,c){e=document.querySelectorAll(".js-filtr-content li"),o(t,"click",function(e){if(e.preventDefault(),this.classList.contains("activated"))this.classList.remove("activated");else{{this.getAttribute("filter").toLowerCase().trim()}this.classList.add("activated")}a()})})};t.init=n;var a=function(){var t=document.querySelectorAll(".activated"),n=[];[].forEach.call(t,function(e,t,a){var o=e.getAttribute("filter").toLowerCase().trim();n.push(o)}),[].forEach.call(e,function(e,t,n){e.classList.add("fltr-hidden")}),setTimeout(function(){[].forEach.call(e,function(e,t,a){e.classList.add("fltr-hidden");var o=e.getAttribute("filter-class").toLowerCase().trim().split(","),i=0;n.length>0?[].forEach.call(o,function(t,a,o){[].forEach.call(n,function(n,a,o){t=t.trim(),n==t&&(console.log("activeFilter"),i++),i===o.length&&c(e)})}):c(e)})},350)},c=function(e){e.classList.remove("fltr-hidden")};return t}();return r(),l.drag=n,l}(),d=function(){var e=document.querySelectorAll(".project-overlay");console.log(e),[].forEach.call(e,function(e,t,n){o(e,"click",function(e){e.preventDefault(),event.stopImmediatePropagation();var t=$("#main").smoothState().data("smoothState");t.load(this.href)}),o(e,"mouseover",function(e){e.preventDefault();var t=$("#main").smoothState().data("smoothState");t.fetch(this.href)})}),function(e){var t=e("html, body"),n=e("#main").smoothState({prefetch:!0,pageCacheSize:0,onStart:{duration:300,render:function(e,t){document.getElementById("main").classList.remove("is-here"),n.toggleAnimationClass("is-exiting")}},onProgress:{duration:0,render:function(e,n){t.css("cursor","wait"),t.find("a").css("cursor","wait"),document.getElementById("main").classList.add("content-pending")}},onEnd:{duration:300,render:function(e,n,a){t.css("cursor","auto"),t.find("a").css("cursor","pointer"),n.html(a);var o=document.body;document.getElementById("main").classList.remove("content-pending"),o.classList.contains("menu-active")?(s.clearAllMenuState(),document.getElementById("main").classList.add("is-here")):document.getElementById("main").classList.add("is-here"),o.classList.contains("opened")&&(o.classList.remove("opened"),s.drag.setValue(0,0)),window.scrollTo(0,0),window.app.components(a)}}}).data("smoothState")}(jQuery)},l=function(){s.size(),c(),r(),d(),e.matches&&i()};n.afterLoadInitial=l;var r=function(t){if(t){var n=t[0].getAttribute("page")||"Home";document.querySelector(".menu-page-title").innerHTML=n}var o=document.querySelectorAll(".js-hidden-box");[].forEach.call(o,function(e,t,n){e.addEventListener("click",function(){e.classList.toggle("clicked")})});var c=[0,1360,2240],d=document.querySelectorAll(".hiddenSoft");d&&[].forEach.call(d,function(e,t,n){e.classList.contains("animated")||setTimeout(function(){e.classList.add("animated")},c[t])});var l=document.querySelector(".homepage");if(null!==l)document.body.classList.add("body-homepage");else{var r=document.body.classList.contains("body-homepage");r&&document.body.classList.remove("body-homepage")}var u=document.querySelector(".body-wrap").classList.contains("loaded");if(u){var m=document.querySelectorAll(".js-show");[].forEach.call(m,function(e,t,n){e.classList.add("animate"),e.classList.remove("js-show")})}for(var f=a.length-1;f>=0;f--)a[f].call();s.addButtonListeners(),e.matches&&i()};n.components=r,window.app=n}(this);