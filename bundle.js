!function(t){var n={};function e(i){if(n[i])return n[i].exports;var s=n[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,e),s.l=!0,s.exports}e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:i})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(e.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var s in t)e.d(i,s,function(n){return t[n]}.bind(null,s));return i},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=0)}([function(t,n,e){"use strict";e.r(n);var i=function(){function t(t,n,e,i){this.id=t,this.ctx=n,this.canvas=e,this.settings=i,this.counter=0,this.infectedOthers=0,this.infectedCountdown=0,this.healthyCountdown=0,this.radiusCountdown=0,this.infected=!1,this.almostInfected=!1,this.immune=!1,this.radiusShowing=!1,this.randX=this._genRand(),this.randY=this._genRand(),this._randomStart()}return t.prototype._genRand=function(){return 2*Math.random()-1},t.prototype._randomStart=function(){this.x=this.canvas.width*Math.random(),this.y=this.canvas.height*Math.random(),this.x<=.1*this.canvas.width&&this.y<=.1*this.canvas.height&&(this.infected=!0,this.healthyCountdown=this.settings.stepsUntilHealthy)},t.prototype._getColor=function(){return this.almostInfected?this.settings.colors.almostInfected:this.infected?this.settings.colors.infected:this.immune?this.settings.colors.immune:this.settings.colors.default},t.prototype._draw=function(){this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.settings.radius,0,2*Math.PI,!1),this.ctx.fillStyle=this._getColor(),this.ctx.fill(),this.radiusShowing&&(this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.settings.infectionRadius,0,2*Math.PI,!1),this.ctx.strokeStyle=this._getColor(),this.ctx.lineWidth=.2,this.ctx.stroke())},t.prototype.move=function(){this.counter%this.settings.stepsUntilChange==0&&(this.randX=this._genRand(),this.randY=this._genRand()),this.counter+=1,this.x+=this.settings.velocity*this.randX,this.y+=this.settings.velocity*this.randY,(this.x>=this.canvas.width||this.x<=0)&&(this.randX=-this.randX),(this.y>=this.canvas.height||this.y<=0)&&(this.randY=-this.randY),this.almostInfected&&(this.infectedCountdown>0?this.infectedCountdown-=1:(this.infected=!0,this.almostInfected=!1,this.healthyCountdown=this.settings.stepsUntilHealthy)),this.infected&&(this.healthyCountdown>0?this.healthyCountdown-=1:(this.immune=!0,this.infected=!1,this.radiusShowing=!1,this.radiusCountdown=0)),this.radiusShowing&&(this.radiusCountdown>0?this.radiusCountdown-=1:this.radiusShowing=!1),this._draw()},t.prototype.setInfected=function(){return this.infected||this.almostInfected||this.immune?(console.log("cannot infect!!"),!1):(this.infectedCountdown=this.settings.stepsUntilInfected,this.almostInfected=!0,!0)},t.prototype.showRadius=function(t){this.radiusShowing=!0,this.radiusCountdown=t},t.prototype.getStatus=function(){return{infected:this.infected,almostInfected:this.almostInfected,immune:this.immune}},t.collisionDetect=function(t,n,e){return Math.sqrt(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2))<=e},t}(),s=function(){function t(t,n,e,i){void 0===e&&(e=null),void 0===i&&(i=null),this.ctx=t,this.canvasSize=n,this.ctx2=e,this.canvasSize2=i}return t.prototype.create=function(t){for(var n=this,e=t[0],s=t[1],o=[],r=0;r<e;r++)o.push(new i(r,this.ctx,this.canvasSize,s));var c=[],a=[];return function(){n.ctx.clearRect(0,0,n.canvasSize.width,n.canvasSize.height),o.filter((function(t){return t.getStatus().infected})).forEach((function(t){o.filter((function(t){return!t.getStatus().infected&&!t.getStatus().almostInfected&&!t.getStatus().immune})).forEach((function(n){i.collisionDetect(t,n,s.infectionRadius)&&n.setInfected()&&(t.infectedOthers+=1,t.showRadius(50))}))})),o.forEach((function(t){return t.move()})),c.push(o.filter((function(t){return t.getStatus().infected})).length),a.push(o.filter((function(t){return t.getStatus().immune})).length);var t=c.length;if(t>1500&&(t-=1,c.shift(),a.shift()),n.ctx2&&n.canvasSize2){var r=function(e){return e*(n.canvasSize2.width/t)},h=function(t){var i=e,s=c[t];return n.canvasSize2.height-n.canvasSize2.height/i*s},u=function(t){var i=e,s=c[t]+a[t];return n.canvasSize2.height-n.canvasSize2.height/i*s};n.ctx2.clearRect(0,0,n.canvasSize2.width,n.canvasSize2.height),a.forEach((function(t,e){0===e?(n.ctx2.beginPath(),n.ctx2.moveTo(r(e),u(e))):n.ctx2.lineTo(r(e),u(e))})),n.ctx2.lineTo(n.canvasSize2.width,n.canvasSize2.height),n.ctx2.lineTo(0,n.canvasSize2.height),n.ctx2.strokeStyle=s.colors.immune,n.ctx2.fillStyle=s.colors.immune,a.reduce((function(t,n){return t+n}),0)>0&&a.length>2&&(n.ctx2.stroke(),n.ctx2.fill()),c.forEach((function(e,i){0===i?(n.ctx2.beginPath(),n.ctx2.moveTo(r(i),h(i))):(t<1e3||i%5==0||t>=1500)&&n.ctx2.lineTo(r(i),h(i))})),n.ctx2.lineTo(n.canvasSize2.width,n.canvasSize2.height),n.ctx2.lineTo(0,n.canvasSize2.height),n.ctx2.strokeStyle=s.colors.infected,n.ctx2.fillStyle=s.colors.infected,c.reduce((function(t,n){return t+n}),0)>0&&c.length>2&&(n.ctx2.stroke(),n.ctx2.fill())}}},t.prototype.reset=function(){this.ctx.clearRect(0,0,this.canvasSize.width,this.canvasSize.height)},t}(),o=function(){function t(){this.numStep=0,this.isRunning=!1,this.animations=[],this.renderFunctions=[]}return t.prototype.addToLoop=function(t){this.animations.push(t)},t.prototype.init=function(t){var n=this;this.renderFunctions=[],this.animations.forEach((function(e){n.renderFunctions.push(e.create(t))}))},t.prototype.start=function(){this.isRunning=!0,this._recursiveRun()},t.prototype.stop=function(){this.isRunning=!1},t.prototype.runSingleFrame=function(){this.renderFunctions.forEach((function(t){return t()}))},t.prototype.clearLoop=function(){this.stop(),this.animations=[],this.renderFunctions=[]},t.prototype._recursiveRun=function(){var t=this;this.numStep+=1,requestAnimationFrame((function(){t.renderFunctions.forEach((function(t){return t()})),t.isRunning&&t._recursiveRun()}))},t}(),r={radius:5,colors:{default:"darkslategrey",almostInfected:"orange",infected:"darkred",immune:"lightgrey"},velocity:2,infectionRadius:25,stepsUntilChange:300,stepsUntilHealthy:400,stepsUntilInfected:60},c=50,a=[{min:5,max:500,step:5,value:c},{min:0,max:100,step:1,value:r.infectionRadius},{min:1,max:1e3,step:1,value:r.stepsUntilChange},{min:1,max:2e3,step:5,value:r.stepsUntilHealthy},{min:5,max:500,step:5,value:r.stepsUntilInfected}],h=function(t){t.init([c,r]),t.runSingleFrame();var n=!1,e=[];document.querySelectorAll("input").forEach((function(t){return e.push(t)}));var i=function(t,n){n.forEach((function(n){n.disabled=t}))};e.forEach((function(t,n){for(var e=0,i=Object.entries(a[n]);e<i.length;e++){var s=i[e],o=s[0],r=s[1];t.setAttribute(o,r)}}));var s=[];document.querySelectorAll("output").forEach((function(t){return s.push(t)})),s.forEach((function(t,n){t.textContent=String(a[n].value)})),e[0].addEventListener("change",(function(){s[0].textContent=String(e[0].value),c=Number(e[0].value),t.init([c,r]),t.runSingleFrame()})),["infectionRadius","stepsUntilChange","stepsUntilHealthy","stepsUntilInfected"].forEach((function(n,i){e[i+1].addEventListener("change",(function(){s[i+1].textContent=String(e[i+1].value),r[n]=Number(e[i+1].value),t.init([c,r]),t.runSingleFrame()}))}));var o=document.getElementById("start_stop_button");o.addEventListener("click",(function(){n?(t.stop(),n=!1,o.textContent="start"):(t.start(),n=!0,o.textContent="pause",i(!0,e))})),document.getElementById("reset_button").addEventListener("click",(function(){t.stop(),t.init([c,r]),t.runSingleFrame(),n=!1,o.textContent="start",i(!1,e)}))},u={width:document.getElementById("main-container").getBoundingClientRect().width,height:150},d=document.getElementById("corona-animation").getContext("2d"),f=document.getElementById("summary-chart");f.setAttribute("width",String(u.width));var l=new s(d,{width:400,height:400},f.getContext("2d"),u),g=new o;g.addToLoop(l),h(g)}]);