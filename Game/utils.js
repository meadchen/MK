import {arenas} from "./game.js";

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

 export const getTime = () => {
    const date = new Date();
    return new Intl.DateTimeFormat('default', {
        hour: 'numeric',
        minute: 'numeric',
    }).format(date);
 }

 export const createReloadButton = () =>{
     const reloadWrap = createElement('div', 'reloadWrap');
     const button = createElement('button', 'button');
     reloadWrap.appendChild(button);
     button.innerText = 'Restart';
     arenas.appendChild(reloadWrap);

     button.addEventListener('click', function(){
         window.location.pathname = 'MK/index.html';
     })
 }
