class Color{
    color1;
    color2;
    constructor(color1='#00bfa5', color2='#00332e'){
        this.color1 = color1;
        this.color2 = color2;
    }


    generateCode(container,defaultDirection,code){
        code.value = `background-image: linear-gradient(${defaultDirection}, ${this.color1},${this.color2})`;
        container.style.backgroundImage =`linear-gradient(${defaultDirection}, ${this.color1},${this.color2})`;
    }

    generateRandom(container,defaultDirection,code){
        let clr1='',
            clr2='';

            const array = new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f');

            for(let i=0; i<6; i++){
                clr1+=array[Math.floor(Math.random()*array.length)]

                clr2+=array[Math.floor(Math.random()*array.length)]
            }
           
            code.value = `background-image: linear-gradient(${defaultDirection}, ${this.color1},${this.color2})`;

            container.style.backgroundImage =`linear-gradient(${defaultDirection}, #${clr1},#${clr2})`;

            this.color1 = '#'+clr1;
            this.color2 = '#'+clr2;

    }
}






const color1 = document.querySelector('#color1');
const color2 = document.querySelector('#color2');

const container = document.querySelector('.container');
const code = document.querySelector('.code')
const copy = document.querySelector('.copy')

const random = document.querySelector('.random');


let defaultDirection = 'to bottom';

var background = new Color();


background.generateCode(container,defaultDirection,code)



function setGradientDirection(directionName,directionAngle){
let directions = document.querySelectorAll(".directions button");

for(let i of directions){
    i.classList.remove("active")
}
directionAngle.classList.add("active")
defaultDirection = directionName;

background.color1 = color1.value;
background.color2 = color2.value;

background.generateCode(container,defaultDirection,code)

}


color1.addEventListener("input",function(){
    background.color1 = this.value;
    background.color2 = color2.value;

    background.generateCode(container,defaultDirection,code)

})



color2.addEventListener("input",function(){
    background.color1 = color1.value;
    background.color2 = this.value;

    background.generateCode(container,defaultDirection,code)
})


random.addEventListener('click',function(){

    background.generateRandom(container,defaultDirection,code)

    color1.value = background.color1;
    color2.value = background.color2;

})

copy.addEventListener("click",function() {
    code.select();
    document.execCommand("copy")

    copy.innerHTML = "Code copied !";

    setTimeout(function() {
        copy.innerHTML = "Copy";
    },2000)

})