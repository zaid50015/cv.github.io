let navMenuTags=document.querySelectorAll(".navbar a");
let skillsBar=document.querySelectorAll(".skill-progress > div");

const intialWidth=(element)=>{
  element.style.width=0+"%";
}
skillsBar.forEach(element => {
  intialWidth(element);
});

const fillwidth=(element)=>{
    let targetWidth=element.getAttribute("bar-width");
    let currentWidth=0;
   let interval= setInterval(() => {
      if(currentWidth==targetWidth){
        clearInterval(interval);
        return;
      }
      currentWidth++;
      element.style.width=currentWidth+"%";
   
   },5);
}

let scrollVertically=(pos,time)=>{
    let interval=setInterval(() => {
        let coordinates=pos.getBoundingClientRect();
        if(coordinates.top<=0){
            clearInterval(interval);
            return;
         }
    
         window.scrollBy(0,time);
       
       }, time);
}
navMenuTags.forEach(element => {
  element.addEventListener("click", function (event) {
    event.preventDefault();
    let sectionName=this.getAttribute('href');
    if(sectionName!="#"){
        sectionName=sectionName.slice(1);
       let pos=document.getElementById(sectionName);
       scrollVertically(pos,50)
    
    }

    })
});
window.addEventListener('scroll',()=>{
  skillsBar.forEach(element => {
    let cord=element.getBoundingClientRect();
   if((element.getAttribute("data-value")=="false") &&(cord.top<=(window.innerHeight))){
     fillwidth(element);
     console.log("fired");
     element.setAttribute("data-value",true);
   }
   else if(cord.top>window.innerHeight){
    intialWidth(element);
    element.setAttribute("data-value",false);
   }
  });
})
let scrollpercentage=()=>{
  let scrollColor=document.getElementById("progress");
  let scrollvalue=document.getElementById("progress-value");
  let pos=document.documentElement.scrollTop;
  let totalheigh=document.documentElement.scrollHeight-document.documentElement.clientHeight;
  let cal=Math.round(100*pos/totalheigh);
  scrollColor.style.background = `conic-gradient(rgb(223,146,59) ${cal}%, #c0c0ff ${cal}%)`;
  scrollvalue.textContent = `${cal}%`;
}
window.onscroll=scrollpercentage;
window.onload=scrollpercentage;