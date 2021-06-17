import {arenas} from "./fight.js";

export const createElement = (tag, className) => {
    const createdTag = document.createElement(tag);
    if(className){
        createdTag.classList.add(className)
    }
    return createdTag;
}

 export function getRandom (num){
     return Math.ceil(Math.random() * num);
 }

 export const createReloadButton = () =>{
     const reloadWrap = createElement('div', 'reloadWrap');
     const button = createElement('button', 'button');
     reloadWrap.appendChild(button);
     button.innerText = 'Restart';
     arenas.appendChild(reloadWrap);

     button.addEventListener('click', function(){
         window.location.reload();
     })
 }
