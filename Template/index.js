const HtmlCanvas = document.getElementById('canvas');

HtmlCanvas.width = innerWidth;
HtmlCanvas.height = innerHeight;

const canvas = HtmlCanvas.getContext('2d');

window.addEventListener('resize', ()=> {
    init()
    HtmlCanvas.width = innerWidth;
    HtmlCanvas.height = innerHeight;
});
window.addEventListener('mousemove', (e)=> {
    mouse.x = e.x;
    mouse.y = e.y;
});

let array = [];
let mouse = {
    x: undefined,
    y: undefined
}
let colors = [
    '#00bdff',
    '#4d39ce',
    '#088eff',
    '#009e60'
];
function generateRandom(min , max){
    const result = (Math.random()*(max-min) + min);

    return result;
}
function getRandomColor(){
    const x = Math.floor(Math.random()* colors.length);
    const result = colors[x];

    return result;
}
function getRandomHslColor(x = 360, y = 100, z = 50){
    const result = `hsl(${Math.random()*x}, ${y}%, ${z}%)`;

    return result;
}
function Circle(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    
    this.update = () => {
        

        
        this.draw()
    }
    
    this.draw = () => {
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        canvas.fillStyle = this.color;
        canvas.fill();
        canvas.strokeStyle = this.color;
        canvas.stroke();
        canvas.closePath();
    }
}
function init(){
    array = [];

    for(let z = 0; z < 1; z++){
        const radius = 120;        
        const circle = new Circle(innerWidth/2, innerHeight/2, radius, 'blue');
        array.push(circle);
    }
}

function animation(){
    requestAnimationFrame(animation);

    canvas.clearRect(0, 0, innerWidth, innerHeight);
    for(let x = 0; x < array.length; x++){
        array[x].update()
    }
}
init()
animation()