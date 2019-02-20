!function(t){var e={};function i(s){if(e[s])return e[s].exports;var a=e[s]={i:s,l:!1,exports:{}};return t[s].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(s,a,function(e){return t[e]}.bind(null,a));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(t,e,i){},function(t,e,i){"use strict";i.r(e);class s{constructor(t,e){this.name=t,this.canvasId=e,this.sprites=[],this.source=0,this.paused=!1,this.startTime=0,this.lastFrameTime=0,this.fps=0,this.gameTime=0,this.lastPauseTime=0,this.pauseAllTime=0,this.imgs=[],this.imgsDom={},this.imgsLoadSuccess=0,this.imgsLoadFail=0,this.imgIndex=0,this.width=0,this.height=0,this.eventListeners=[],this.dom=document.getElementById(e);let i=this.dom.getContext("2d");this.context=i,this.width=i.canvas.width,this.height=i.canvas.height,window.onkeypress=(t=>{this.keyPressed(t)}),window.onkeydown=(t=>{this.keyPressed(t)})}findKeyListener(t){let e;return this.eventListeners.forEach(i=>{i.name===t&&(e=i)}),e}addEventListener(t){this.eventListeners.push(...t)}queueImage(t){this.imgs.push(t)}imgLoadedCallBack(t){this.imgsLoadSuccess++}imgLoadedFailCallBack(t){this.imgsLoadFail++}loadImg(t){let e=new Image;e.src=t,e.addEventListener("load",t=>{this.imgLoadedCallBack(t)}),e.addEventListener("error",t=>{this.imgLoadedFailCallBack(t)}),this.imgsDom[t]=e}loadImgs(){return this.imgIndex<this.imgs.length&&(this.loadImg(this.imgs[this.imgIndex]),this.imgIndex++),this.imgs.length<=0?100:(this.imgsLoadSuccess+this.imgsLoadFail)/this.imgs.length*100}getNowTime(){return+new Date}start(){this.startTime=this.getNowTime(),window.requestAnimationFrame(t=>{this.animate(t)})}animate(t){this.paused?setInterval(()=>{window.requestAnimationFrame(t=>{this.animate(t)})},100):(this.updateBase(t),this.clearScreen(),this.startAnimate(),this.paintUnderSprites(),this.updateSprites(t),this.paintSprites(),this.paintOverSprites(t),this.endAnimate(),window.requestAnimationFrame(t=>{this.animate(t)}))}updateBase(t){this.updateFrameRate(t),this.gameTime=this.getNowTime()-Number(this.startTime),this.lastFrameTime=t}updateFrameRate(t){0===this.lastFrameTime?this.fps=s.CONST_FPS:this.fps=1e3/(Number(t)-Number(this.lastFrameTime))}clearScreen(){null!==this.context&&this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height)}addSprite(t){this.sprites.push(t)}getSprite(t){for(let e=0;e<this.sprites.length;e++)if(this.sprites[e].getName()===t)return this.sprites[e];return null}updateSprites(t){for(let e=0;e<this.sprites.length;e++){let i=this.sprites[e];i.visible&&i.update(this.context,t)}}paintSprites(){for(let t=0;t<this.sprites.length;t++){let e=this.sprites[t];e.visible&&e.paint(this.context)}}togglePaused(){this.paused=!this.paused;let t=this.getNowTime();this.paused?this.lastPauseTime=t:0!==this.lastPauseTime&&(this.pauseAllTime+=t-this.lastPauseTime)}getGameAllTime(){return this.getNowTime()-this.startTime-this.pauseAllTime}getPixelsPerFrame(t){return t/this.fps}}s.CONST_FPS=60;var a=[{name:"left",listener(t,e,i){e.eventLastUpdateTime=i,e.position.y--;let s=e.position,a=0;for(let i=0;i<e.TYPE_ARR_HEIGHT;i++)for(let r=0;r<e.TYPE_ARR_WEIGHT;r++)e.type[i][r]&&s.x+i<2*t.SQUARE_LENGTH&&s.x+i>=0&&s.y+r>=0&&s.y+r<t.SQUARE_LENGTH&&(a=a+t.squareArr[s.x+i][s.y+r].bold+e.type[i][r]);(e.position.y<0||a>4)&&e.position.y++}},{name:"right",listener(t,e,i){e.eventLastUpdateTime=i,e.position.y++;let s=e.position,a=0;for(let i=0;i<e.TYPE_ARR_HEIGHT;i++)for(let r=0;r<e.TYPE_ARR_WEIGHT;r++)e.type[i][r]&&s.x+i<2*t.SQUARE_LENGTH&&s.x+i>=0&&s.y+r>=0&&s.y+r<t.SQUARE_LENGTH&&(a=a+t.squareArr[s.x+i][s.y+r].bold+e.type[i][r]);(e.position.y>t.SQUARE_LENGTH-e.weight||a>4)&&e.position.y--}},{name:"down",listener(t,e,i){e.eventLastUpdateTime=i,e.position.x++;let s=e.position,a=0;for(let i=0;i<e.TYPE_ARR_HEIGHT;i++)for(let r=0;r<e.TYPE_ARR_WEIGHT;r++)e.type[i][r]&&s.x+i<2*t.SQUARE_LENGTH&&s.y+r<t.SQUARE_LENGTH&&s.x+i>=0&&s.y+r>=0&&(a=a+t.squareArr[s.x+i][s.y+r].bold+e.type[i][r]);(a>4||e.position.x>2*t.SQUARE_LENGTH-e.height)&&e.position.x--}},{name:"up",listener(t,e,i){let s=[];for(let t=0;t<e.TYPE_ARR_HEIGHT;t++){s[t]=[];for(let i=0;i<e.TYPE_ARR_WEIGHT;i++)s[t][i]=0}for(let t=0;t<e.TYPE_ARR_HEIGHT;t++)for(let i=0;i<e.TYPE_ARR_WEIGHT;i++)s[i][3-t]=e.type[t][i];for(;;){let t=!1;for(let e=0;e<4;e++)s[0][e]&&(t=!0);if(t)break;for(let t=0;t<4;t++)for(let e=0;e<4;e++)s[t][e]=t+1<4?s[t+1][e]:0}for(;;){let t=!1;for(let e=0;e<4;e++)s[e][0]&&(t=!0);if(t)break;for(let t=0;t<4;t++)for(let e=0;e<4;e++)s[e][t]=t+1<4?s[e][t+1]:0}let a=e.position,r=0;for(let i=0;i<e.TYPE_ARR_HEIGHT;i++)for(let h=0;h<e.TYPE_ARR_WEIGHT;h++)s[i][h]&&a.x+i<2*t.SQUARE_LENGTH&&a.y+h<t.SQUARE_LENGTH&&a.x+i>=0&&a.y+h>=0&&(r=r+t.squareArr[a.x+i][a.y+h].bold+s[i][h]);4===r&&(e.rotateIndex=(e.rotateIndex+1)%4,e.type=s,e.setWH())}}];class r{constructor(t,e,i,s){this.name=t,this.visible=!0,this.behaviors=i,this.painter=e,this.game=s}paint(t){this.painter.paint(this,t,this.game)}update(t,e){for(let i=this.behaviors.length-1;i>=0;i--)this.behaviors[i].execute(this,t,e,this.game)}init(t){}getName(){return this.name}}let h={paint(t,e,i){e.save(),e.fillStyle=i.SQUARE_BOLD,e.strokeStyle=i.SQUARE_STROKE_STYLE,e.lineWidth=i.SQUARE_PADDING;let s=t.position;for(let a=0;a<t.TYPE_ARR_HEIGHT;a++)for(let r=0;r<t.TYPE_ARR_WEIGHT;r++)if(t.type[a][r]){let t=i.squareArr[s.x+a][s.y+r];e.fillRect(t.x,t.y,i.SQUARE_WEIGHT,i.SQUARE_HEIGHT),e.strokeRect(t.x+i.SQUARE_PADDING,t.y+i.SQUARE_PADDING,i.SQUARE_WEIGHT-2*i.SQUARE_PADDING,i.SQUARE_HEIGHT-2*i.SQUARE_PADDING)}e.restore()}},n={execute(t,e,i,s){if(!t.eventing&&i-t.lastUpdateTime>500){let e=t.position;t.position.x++;let a=0;for(let i=0;i<t.TYPE_ARR_HEIGHT;i++)for(let r=0;r<t.TYPE_ARR_WEIGHT;r++)e.x+i>=0&&e.y+r>=0&&t.type[i][r]&&e.x+i<2*s.SQUARE_LENGTH&&e.y+r<s.SQUARE_LENGTH&&(a=a+s.squareArr[e.x+i][e.y+r].bold+t.type[i][r]);if(a>4||t.position.x>2*s.SQUARE_LENGTH-t.height){for(let i=0;i<t.TYPE_ARR_HEIGHT;i++)for(let a=0;a<t.TYPE_ARR_WEIGHT;a++)t.type[i][a]&&(s.squareArr[e.x+i-1][e.y+a].bold=1);t.generateSprite()}t.lastUpdateTime=i}}};i(0);let o=new class extends s{constructor(t,e){super(t,e),this.translateDelta=.025,this.translateOffset=0,this.SUN_TOP=110,this.SUN_LEFT=450,this.SUN_RADIUS=80,this.SQUARE_LENGTH=10,this.GAP=6,this.squareArr=[],this.SQUARE_FILL_STYLE="#879372",this.SQUARE_STROKE_STYLE="#9ead86",this.SQUARE_PADDING=4,this.SQUARE_BOLD="#000",this.status="init",this.clearSquareAnimate=0,this.ACTIVE_COLOR=["#dc532a","#879372","#dc532a"],this.activeColorIndex=0,this.clearSquareArr=[],this.animateId=0,this.endGameAnimate=0,this.SQUARE_WEIGHT=(this.width-this.GAP*(this.SQUARE_LENGTH+1))/this.SQUARE_LENGTH,this.SQUARE_HEIGHT=(this.height-this.GAP*(2*this.SQUARE_LENGTH+1))/(2*this.SQUARE_LENGTH);for(let t=0;t<2*this.SQUARE_LENGTH;t++){this.squareArr[t]=[];for(let e=0;e<this.SQUARE_LENGTH;e++){let i=e*this.SQUARE_WEIGHT+(e+1)*this.GAP,s=t*this.SQUARE_HEIGHT+(t+1)*this.GAP;this.squareArr[t][e]={x:i,y:s,bold:0}}}this.endAnimateIndex=2*this.SQUARE_LENGTH}scrollBackground(){this.translateOffset=(this.translateOffset+this.translateDelta)%this.context.canvas.width,this.context.translate(-this.translateOffset,0)}setGameStatus(t){this.status=t}start(){this.startTime=this.getNowTime(),this.setGameStatus("running"),window.requestAnimationFrame(t=>{this.animate(t)})}paintFarCloud(t,e,i){t.save(),this.scrollBackground(),t.lineWidth=.5,t.strokeStyle="rgba(100, 140, 230, 0, 0.8)",t.fillStyle="rgba(255,255,255,0.4)",t.beginPath(),t.moveTo(e+102,i+91),t.quadraticCurveTo(e+180,i+110,e+250,i+90),t.quadraticCurveTo(e+312,i+87,e+279,i+60),t.quadraticCurveTo(e+321,i+20,e+265,i+20),t.quadraticCurveTo(e+219,i+4,e+171,i+23),t.quadraticCurveTo(e+137,i+5,e+104,i+18),t.quadraticCurveTo(e+57,i+23,e+79,i+48),t.quadraticCurveTo(e+57,i+74,e+104,i+92),t.closePath(),t.stroke(),t.fill(),t.restore()}paintNearCloud(t,e,i){t.save(),this.scrollBackground(),this.scrollBackground(),t.lineWidth=.5,t.strokeStyle="rgba(100, 140, 230, 0, 0.8)",t.fillStyle="rgba(255,255,255,0.4)",t.beginPath(),t.fillStyle="rgba(255,255,255,0.7)",t.moveTo(e+364,i+37),t.quadraticCurveTo(e+426,i+28,e+418,i+72),t.quadraticCurveTo(e+450,i+123,e+388,i+114),t.quadraticCurveTo(e+357,i+144,e+303,i+115),t.quadraticCurveTo(e+251,i+118,e+278,i+83),t.quadraticCurveTo(e+254,i+46,e+320,i+46),t.quadraticCurveTo(e+326,i+12,e+362,i+37),t.closePath(),t.stroke(),t.fill(),t.restore()}paintSun(t){t.save(),t.strokeStyle="orange",t.fillStyle="yellow",t.strokeStyle="orange",t.lineWidth=1,t.beginPath(),t.arc(this.SUN_LEFT,this.SUN_TOP,this.SUN_RADIUS,0,2*Math.PI,!0),t.fill(),t.stroke(),t.stroke(),t.restore()}paintBackSquare(t){t.save(),t.strokeStyle=this.SQUARE_STROKE_STYLE,t.lineWidth=this.SQUARE_PADDING;for(let e=0;e<2*this.SQUARE_LENGTH;e++)for(let i=0;i<this.SQUARE_LENGTH;i++){let s=this.squareArr[e][i];1===s.bold?t.fillStyle=this.SQUARE_BOLD:t.fillStyle=this.SQUARE_FILL_STYLE,t.fillRect(s.x,s.y,this.SQUARE_WEIGHT,this.SQUARE_HEIGHT),t.strokeRect(s.x+this.SQUARE_PADDING,s.y+this.SQUARE_PADDING,this.SQUARE_WEIGHT-2*this.SQUARE_PADDING,this.SQUARE_HEIGHT-2*this.SQUARE_PADDING)}t.restore()}gameOverAnimate(){if(this.endAnimateIndex--,this.endAnimateIndex<2*-this.SQUARE_LENGTH)this.endGameAnimate=0;else if(this.endAnimateIndex<0)for(let t=0;t<this.SQUARE_LENGTH;t++)this.squareArr[Math.abs(this.endAnimateIndex)-1][t].bold=0;else for(let t=0;t<this.SQUARE_LENGTH;t++)this.squareArr[Math.abs(this.endAnimateIndex)][t].bold=1}startAnimate(){this.animateId||(this.animateId=setInterval(()=>{this.activeColorIndex++,this.activeColorIndex>=3&&(this.activeColorIndex=0,this.endAnimate(),clearInterval(this.animateId),this.animateId=0)},100))}paintAnimate(){this.context.save(),this.context.fillStyle=this.ACTIVE_COLOR[this.activeColorIndex],this.context.strokeStyle=this.SQUARE_STROKE_STYLE,this.context.lineWidth=this.SQUARE_PADDING;for(let t=0,e=this.clearSquareArr.length;t<e;t++)for(let e=0;e<this.SQUARE_LENGTH;e++){let i=this.squareArr[this.clearSquareArr[t]][e];this.context.fillRect(i.x,i.y,this.SQUARE_WEIGHT,this.SQUARE_HEIGHT),this.context.strokeRect(i.x+this.SQUARE_PADDING,i.y+this.SQUARE_PADDING,this.SQUARE_WEIGHT-2*this.SQUARE_PADDING,this.SQUARE_HEIGHT-2*this.SQUARE_PADDING)}this.context.restore()}paintUnderSprites(){}paintOverSprites(t){this.paintBackSquare(this.context)}endAnimate(){this.clearSquareAnimate=0;let t=[];for(let e=0;e<2*this.SQUARE_LENGTH;e++){t[e]=[];for(let i=0;i<this.SQUARE_LENGTH;i++)t[e][i]=Object.assign({},this.squareArr[e][i],{bold:0})}let e=[];for(let t=2*this.SQUARE_LENGTH-1;t>=0;t--){let i=!1;for(let e=0;e<this.clearSquareArr.length;e++)if(this.clearSquareArr[e]===t){i=!0;break}i||e.push(this.squareArr[t])}for(let i=0,s=2*this.SQUARE_LENGTH-1;i<e.length;i++)for(let a=0;a<this.SQUARE_LENGTH;a++)t[s-i][a].bold=e[i][a].bold;this.squareArr=t,this.setSource(this.clearSquareArr.length)}setSource(t){this.source+=10*t}restart(){this.sprites[0].init(1),this.init(),this.start()}init(){for(let t=0;t<2*this.SQUARE_LENGTH;t++)for(let e=0;e<this.SQUARE_LENGTH;e++)this.squareArr[t][e].bold=0;this.status="init",this.clearSquareAnimate=0,this.activeColorIndex=0,this.animateId=0,this.endGameAnimate=0,this.endAnimateIndex=2*this.SQUARE_LENGTH}keyPressed(t){let e,i="";switch(t.keyCode){case 32:i="space";break;case 68:i="d";break;case 75:i="k";break;case 83:i="s";break;case 80:i="p";break;case 37:i="left";break;case 39:i="right";break;case 38:i="up";break;case 40:i="down"}(e=this.findKeyListener(i))&&e.listener(this,this.sprites[0],Date.now())}animate(t){this.paused?setInterval(()=>{window.requestAnimationFrame(t=>{this.animate(t)})},100):(this.updateBase(t),this.clearScreen(),this.paintOverSprites(t),this.clearSquareAnimate?(this.startAnimate(),this.paintAnimate()):this.endGameAnimate?this.gameOverAnimate():(this.paintSprites(),this.updateSprites(t),this.checkSquare()),this.checkGameStatus(),("running"===this.status||this.endGameAnimate)&&window.requestAnimationFrame(t=>{this.animate(t)}))}checkSquare(){this.clearSquareArr=[];for(let t=0;t<2*this.SQUARE_LENGTH;t++){let e=!1;for(let i=0;i<this.SQUARE_LENGTH;i++)if(0===this.squareArr[t][i].bold){e=!0;break}e||this.clearSquareArr.push(t)}this.clearSquareArr.length<=0?this.clearSquareAnimate=0:this.clearSquareAnimate=1}checkGameStatus(){for(let t=0;t<this.SQUARE_LENGTH;t++)this.squareArr[0][t].bold&&(this.endGameAnimate=1,this.setGameStatus("end"))}}("俄罗斯方块","gameCanvas"),l=document.getElementById("loadingToast"),d=document.getElementById("loadButton"),c=document.getElementById("progressDiv"),E=new class{constructor(t,e,i,s,a){this.width=t,this.height=e,this.LEFT=0,this.TOP=0,this.domElement=document.createElement("div");let r=document.createElement("canvas").getContext("2d");this.context=r,this.cornerRadius=e/2,this.RIGHT=this.LEFT+2*this.cornerRadius+t,this.BOTTOM=this.TOP+e,this.domElement.appendChild(this.context.canvas),this.context.canvas.width=t+e,this.context.canvas.height=e,this.percentComplete=0,this.background=document.createElement("canvas").getContext("2d"),this.foreground=document.createElement("canvas").getContext("2d"),this.background.globalAlpha=.3,this.background.canvas.width=t+e,this.background.canvas.height=e,this.foreground.canvas.width=t+e,this.foreground.canvas.height=e,this.drawToBuffer(this.background,i,a),this.drawToBuffer(this.foreground,i,s)}drawToBuffer(t,e,i){t.save(),t.fillStyle=i,t.strokeStyle=e,t.beginPath(),t.moveTo(this.LEFT+this.cornerRadius,this.TOP),t.lineTo(this.RIGHT-this.cornerRadius,this.TOP),t.arc(this.RIGHT-this.cornerRadius,this.TOP+this.cornerRadius,this.cornerRadius,-Math.PI/2,Math.PI/2),t.lineTo(this.LEFT+this.cornerRadius,this.TOP+2*this.cornerRadius),t.arc(this.LEFT+this.cornerRadius,this.TOP+this.cornerRadius,this.cornerRadius,Math.PI/2,-Math.PI/2),t.fill();let s=t.createLinearGradient(this.LEFT,this.TOP,this.LEFT,this.BOTTOM);s.addColorStop(0,"rgba(255,255,255,0.4)"),s.addColorStop(.3,"rgba(255,255,255,0.7)"),s.addColorStop(.4,"rgba(255,255,255,0.5)"),s.addColorStop(1,"rgba(255,255,255,0.1)"),t.fillStyle=s,t.fill(),t.lineWidth=.4,t.stroke(),t.restore()}draw(t){this.erase(),this.context.drawImage(this.background.canvas,0,0),t>0&&this.context.drawImage(this.foreground.canvas,0,0,this.foreground.canvas.width*(t/100),this.foreground.canvas.height,0,0,this.foreground.canvas.width*(t/100),this.foreground.canvas.height)}erase(){this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height)}}(300,25,"rgba(0,0,0,0.5)","#ef4510","#00964b"),u=document.getElementById("source"),T=document.getElementById("fps"),m=document.getElementById("gameTime"),A=document.getElementById("restart"),S=document.getElementById("gameOver");S.style.display="none",A.style.display="none",A.addEventListener("click",function(){setTimeout(()=>{o.restart(),S.style.display="none",A.style.display="none"},500)}),d.addEventListener("click",function(t){let e=0,i=0;t.preventDefault(),d.style.display="none",c.appendChild(E.domElement),e=setInterval(function(){100===(i+=20)&&(clearInterval(e),setTimeout(function(){l.style.display="none",o.start()},500)),E.draw(i)},200)},!1);let R=new class extends r{constructor(t,e,i,s,a,r){super(t,e,i,s),this.type=[],this.typeId=1,this.eventing=!1,this.lastUpdateTime=0,this.eventLastUpdateTime=0,this.TYPE_COUNT=5,this.TYPE_ARR_WEIGHT=4,this.TYPE_ARR_HEIGHT=4,this.rotateIndex=0,this.CONST_TYPE=[[{weight:2,height:2},{weight:2,height:2}],[{weight:2,height:3},{weight:3,height:2}],[{weight:2,height:3},{weight:3,height:2}],[{weight:1,height:4},{weight:4,height:1}],[{weight:3,height:2},{weight:2,height:3}]];for(let t=0;t<this.TYPE_ARR_HEIGHT;t++){this.type[t]=[];for(let e=0;e<this.TYPE_ARR_WEIGHT;e++)this.type[t][e]=0}this.position=r,this.height=this.CONST_TYPE[a-1][this.rotateIndex%2].height,this.weight=this.CONST_TYPE[a-1][this.rotateIndex%2].weight,this.init(a)}setWH(){this.weight=this.CONST_TYPE[this.typeId-1][this.rotateIndex%2].weight,this.height=this.CONST_TYPE[this.typeId-1][this.rotateIndex%2].height}setPosition(t,e){this.position.x=t,this.position.y=e}setRotate(t){this.rotateIndex=t}init(t){if(this.typeId=t,1===t)for(let t=0;t<this.TYPE_ARR_HEIGHT;t++)for(let e=0;e<this.TYPE_ARR_WEIGHT;e++)this.type[t][e]=t<2&&e<2?1:0;else if(2===t)for(let t=0;t<this.TYPE_ARR_HEIGHT;t++)for(let e=0;e<this.TYPE_ARR_WEIGHT;e++)this.type[t][e]=t||e?1===t&&e<2?1:2===t&&1===e?1:0:1;else if(3===t)for(let t=0;t<this.TYPE_ARR_HEIGHT;t++)for(let e=0;e<this.TYPE_ARR_WEIGHT;e++)this.type[t][e]=!t&&e<2?1:1===t&&1===e?1:2===t&&1===e?1:0;else if(4===t)for(let t=0;t<this.TYPE_ARR_HEIGHT;t++)for(let e=0;e<this.TYPE_ARR_WEIGHT;e++)this.type[t][e]=e?0:1;else if(5===t)for(let t=0;t<this.TYPE_ARR_HEIGHT;t++)for(let e=0;e<this.TYPE_ARR_WEIGHT;e++)this.type[t][e]=t||1!==e?1===t&&e<3?1:0:1}generateSprite(){let t=Math.ceil(100*Math.random())%this.TYPE_COUNT+1;this.setRotate(0),this.setPosition(0,5),this.init(t),this.setWH()}}("square sprite",h,[n],o,1,{x:0,y:5}),p=["青铜水平","白银水平","黄金水平","铂金水平","钻石水平","星耀水平","最强王者","荣耀王者"],g=Date.now();setInterval(()=>{u.innerText=o.source+"",Date.now()-g>500&&(T.innerText=Math.ceil(o.fps)+"",g=Date.now()),"end"===o.status&&(o.source>400?S.innerText="Game Over, "+p[7]:S.innerText="Game Over, "+p[Math.ceil(o.source/50)],S.style.display="block",A.style.display="block")},16),setInterval(()=>{m.innerText=Math.ceil(o.gameTime/1e3)+"s"},1e3),o.addEventListener(a),o.addSprite(R),o.paintBackSquare(o.context)}]);