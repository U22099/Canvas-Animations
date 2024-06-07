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
    const result = (Math.random()*(max-min)) + min;

    return result;
}
function getRandomColor(){
    const x = Math.floor(Math.random()* colors.length);
    const result = colors[x];

    return result;
}
function Circle(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radian = generateRandom(0, Math.PI*2);
    this.distance = generateRandom(50, 200);
    
    this.update = () => {
        

        this.radian += 0.08
        this.x = x + Math.cos(this.radian) * this.distance;
        this.y = y + Math.sin(this.radian) * this.distance;
        
        this.draw()
    }
    
    this.draw = () => {
        canvas.beginPath();
        canvas.lineWidth = this.radius
        canvas.moveTo(mouse.x, mouse.y);
        canvas.lineTo(this.x, this.y);
        canvas.fillStyle = this.color;
        canvas.fill();
        canvas.strokeStyle = this.color;
        canvas.stroke();
    }
}
function init(){
    array = [];

    for(let z = 0; z < 100; z++){
        const radius = 2;        
        const circle = new Circle(
            innerWidth/2 , 
            innerHeight/2 , 
            radius, 
            getRandomColor());
        array.push(circle);
    }
}

function animation(){
    requestAnimationFrame(animation);

    canvas.fillStyle = 'rgba(0,0,0,0.3)'
    canvas.fillRect(0, 0, innerWidth, innerHeight);
    for(let x = 0; x < array.length; x++){
        array[x].update()
    }
}
init()
animation()