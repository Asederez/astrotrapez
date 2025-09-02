window.addEventListener("load",()=>{
 // Starfield
 const c=document.getElementById("starfield"),ctx=c.getContext("2d");
 function resize(){c.width=innerWidth;c.height=innerHeight;}
 resize(); window.onresize=resize;
 const stars=Array.from({length:500},()=>({x:Math.random()*c.width,y:Math.random()*c.height,z:Math.random()*c.width}));
 function draw(){ctx.fillStyle="black";ctx.fillRect(0,0,c.width,c.height);
   for(let s of stars){s.z-=2;if(s.z<=0)s.z=c.width;
     let k=128.0/s.z;let px=s.x*k+c.width/2;let py=s.y*k+c.height/2;
     if(px>=0&&px<=c.width&&py>=0&&py<=c.height){let size=(1-s.z/c.width)*2;ctx.fillStyle="white";ctx.fillRect(px,py,size,size);}} requestAnimationFrame(draw);}
 draw();
 // Leaflet map ISS
 var map=L.map('map').setView([0,0],2);
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap'}).addTo(map);
 var marker=L.marker([0,0]).addTo(map);
 async function updateISS(){
   const r=await fetch("https://api.wheretheiss.at/v1/satellites/25544"); const d=await r.json();
   marker.setLatLng([d.latitude,d.longitude]); map.panTo([d.latitude,d.longitude]);
   document.getElementById("lat").textContent=d.latitude.toFixed(2);
   document.getElementById("lon").textContent=d.longitude.toFixed(2);
   document.getElementById("alt").textContent=d.altitude.toFixed(1);
   document.getElementById("vel").textContent=d.velocity.toFixed(1);
 }
 setInterval(updateISS,5000); updateISS();
});