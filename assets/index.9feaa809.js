!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var e=document.getElementById("canvas");e.width=window.innerWidth,e.height=window.innerHeight;var t=e.getContext("2d");t.fillStyle="#010101",t.fillRect(0,0,e.width,e.height);var o=!0,n=!1,i=!1;var r=[],l=[],a=[],h=[],c=[],d=0;const s=window.innerWidth-.05*window.innerWidth,f=window.innerHeight-.05*window.innerHeight,u=window.innerWidth+5,g=window.innerHeight+5;var m=0;Array.from({length:40},(()=>function(){let e=Math.floor(Math.random()*s+.05),t=Math.floor(Math.random()*f+.05),o=.4*Math.random()-.2,n=.4*Math.random()-.2;r[m]=e,l.push(t),a.push(o),h.push(n),c.push(0),m++}()));const w=[[-6,-6,-6,g,.1,.2,-1,.2,"left"],[-6,u,-6,-6,-1,.2,.1,.2,"top"],[u,u,-6,g,-1,-.1,-1,.2,"right"],[-6,u,g,g,-1,.2,-1,-.1,"bottom"]];function y(e,t){return e===t?e:Math.random()*(e-t)+t}function M(e){let o=Math.floor(4*Math.random()),i=y(w[o][1],w[o][0]),s=y(w[o][3],w[o][2]),f=y(w[o][5],w[o][4]),m=y(w[o][7],w[o][6]);r[e]=Math.floor(i),l[e]=Math.floor(s),a[e]=f,h[e]=m,c[e]=d;let M=a[e]*(d-c[e])+r[e],p=h[e]*(d-c[e])+l[e];n&&(console.log(w[o][8]),console.log(`birth frame: ${c[e]}`),console.log("x1: -6, y1: -6"),console.log(`x2: ${u}, y2: ${g}`),console.log(`x:${r[e]}, y:${l[e]}`),console.log(`x:${M}, y:${p}`)),t.beginPath(),t.arc(M,p,5,0,2*Math.PI),t.fillStyle="#575757",t.fill()}function p(e,o,n){for(let i=0;i<40;i++)if(i!=n){let n=a[i]*(d-c[i])+r[i],s=h[i]*(d-c[i])+l[i],f=e-n,u=o-s,g=Math.sqrt(f*f+u*u);if(g<=250){t.beginPath(),t.moveTo(e,o),t.lineTo(n,s),t.strokeStyle="#575757";let i=2-(2-.01)/((250-0)/g);t.lineWidth=i,t.stroke()}}}function b(){i||(t.clearRect(0,0,e.width,e.height),t.fillStyle="#010101",t.fillRect(0,0,e.width,e.height));for(let e=0;e<40;e++){let o=a[e]*(d-c[e])+r[e],i=h[e]*(d-c[e])+l[e];if(o<=-11||o>=u+5||i<=-11||i>=g+5)M(e);else{if(p(o,i,e),t.beginPath(),t.arc(o,i,5,0,2*Math.PI),n){let n=(Math.abs(a[e])+Math.abs(h[e]))/2/.2*255;t.fillStyle=`rgb(${n}, 255, 255)`,t.fill(),k(o,i)}n||(t.fillStyle="#575757",t.fill())}}n&&(t.beginPath(),t.strokeStyle="white",t.rect(-6,-6,u- -6,g- -6),t.stroke(),t.beginPath(),t.strokeStyle="red",t.rect(-11,-11,u+5,g+5+5)),v()}function k(e,o){t.stroke(),t.beginPath(),t.arc(e,o,125,0,2*Math.PI),t.fillStyle="rgba(255, 0, 0, 0.1)",t.fill()}function v(){o?(window.requestAnimationFrame(b),d++):window.requestAnimationFrame(v)}document.addEventListener("keydown",(function(e){" "===e.key&&(o=!o),"d"===e.key&&(n=!n),"t"===e.key&&(i=!i)})),window.requestAnimationFrame(b);