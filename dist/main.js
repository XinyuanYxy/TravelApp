var Client;(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};async function n(e){e.preventDefault();document.getElementById("generate");const t=document.getElementById("city").value,n={city:t,country:document.getElementById("country").value,time:document.getElementById("time").value,fTime:document.getElementById("flighttime").value,fNum:document.getElementById("flightnumber").value,fDes:document.getElementById("flightdes").value,lodging:document.getElementById("lodging").value,items:document.getElementById("items").value,notes:document.getElementById("notes").value};console.log("sending data to server from clientside"),await axios.post("/add",n),console.log("retrieving data");const i=await Client.retrieveData(t);o(i)}e.r(t),e.d(t,{addUlDeleteEditEL:()=>d,generateCard:()=>o,generateCountdown:()=>i,handleSubmit:()=>n,retrieveData:()=>l});const o=(e={})=>{const t=document.getElementById("planlist");d(t);let n=document.createElement("li"),o=document.getElementById("planlist").childElementCount;n.innerHTML=`<div class="card" >\n\t<h3>Days left: </h3>\n\t<div id="countdown${o+1}"> ${void 0===i(e.time)?"no countdown":i(e.time)}</div>\n\t<h3>Depart Time: </h3>\n\t<div id="time${o+1}"> ${""===e.time?"You have not put any depart time yet":e.time}\n\t </div>\n\t<h3>City: </h3>\n\t<div id="city${o+1}">${""===e.city?"you have not put city yet":e.city} </div>\n\t<h3>Country: </h3>\n\t<div id="country${o+1}">${""===e.country?"you have not put country yet":e.country}</div>\n\t<h3>Temperature Now: </h3>\n\t<div id="temp${o+1}">${void 0===e.currentWeather?"you have not put city yet":e.currentWeather}</div>\n\t<h3>Temperature In Future: </h3>\n\t<div id="temp${o+1}"> ${void 0===e.futureWeather?"you have not put city yet":e.futureWeather}</div>\n\t<h3>Flight Time: </h3>\n\t<div id="ftime${o+1}">${""===e.fTime?"you have not put flight time yet":e.fTime} </div>\n\t<h3>Flight Number: </h3>\n\t<div id="fnum${o+1}">${""===e.fNum?"you have not put flight number yet":e.fNum}</div>\n\t<h3>Flight Destination: </h3>\n\t<div id="fdes${o+1}">${""===e.fDes?"you have not put flight destination yet":e.fDes}</div>\n\t<h3>Lodging: </h3>\n\t<div id="lodging${o+1}">${""===e.lodging?"you have not put lodging yet":e.lodging}</div>\n\t<h3>Items: </h3>\n\t<div id="items${o+1}">${""===e.items?"you have not put items yet":e.items}</div>\n\t<h3>Notes: </h3>\n\t<div id="notes${o+1}">${""===e.notes?"you have not put notes yet":e.notes}</div>\n\t<button>Edit</button>\n\t<button>Delete</button>\n    </div>\n\t`,t.appendChild(n)},i=e=>{let t=new Date(e).getTime(),n=setInterval((function(){let e=(new Date).getTime(),o=t-e,i=Math.floor(o/864e5),d=Math.floor(o%864e5/36e5),l=Math.floor(o%36e5/6e4),a=Math.floor(o%6e4/1e3);return o<0?(clearInterval(n),"EXPIRED"):`${i} d ${d} h ${l} m ${a} s`}),1e3)},d=e=>{e.addEventListener("click",(e=>{if("BUTTON"===e.target.tagName){const t=e.target,n=t.parentNode;console.log(n);const o=n.parentNode;console.log(o);const i=n.childNodes;console.log("Edit"===t.textContent);const d=o.childElementCount;if("Delete"===t.textContent)console.log("clicked delete"),o.removeChild(n);else if("Edit"===t.textContent){console.log("clicked edit"),console.log(i);for(let e=3;e<i.length;e++){let t=i[e];if("DIV"===t.nodeName){let o=document.createElement("input");console.log(t.id==="time"+d||"ftime"+d),t.id===("time"+d||0)?o.type="date":(o.type="text",o.value=i[e].textContent),n.insertBefore(o,i[e]),console.log(n.removeChild(t))}}t.textContent="Save"}else if("Save"===t.textContent){for(let e=1;e<i.length;e++)if("INPUT"===i[e].nodeName){documentj.createElement("div");input.textContent=i[e].value,n.removeChild(i[e])}t.textContent="Edit"}}}))},l=async()=>{try{console.log("im in retrieveing data funciton clientside");return(await axios.get("/getStorageData")).data}catch(e){console.log(e)}};Client=t})();
//# sourceMappingURL=main.js.map