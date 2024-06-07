const HtmlCanvas = document.getElementById('canvas');

HtmlCanvas.width = innerWidth;
HtmlCanvas.height = innerHeight;

const canvas = HtmlCanvas.getContext('2d');

window.addEventListener('resize', ()=> {
    init()
    HtmlCanvas.width = innerWidth;
    HtmlCanvas.height = innerHeight;
});

let array = [];
let mouse = {
    x: undefined,
    y: undefined
}
let colors = [
    '#ff2400',
    '#ee5921',
    '#e11584',
    '#f78702',
    '#ffd800',
    '#ffc40c'
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
function getRandomHslColor(x, y, z){
    const result = `hsl(${Math.random()*x}, ${y}%, ${z}%)`;

    return result;
}
const gravity = 0.03;
const friction = 0.99;
function Circle(x, y, radius, color, velocity){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
    
    this.update = () => {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.velocity.y += gravity;
        this.x += this.velocity.x
        this.y += this.velocity.y


        this.alpha -= 0.005;
    }
    
    this.draw = () => {
        canvas.save();
        canvas.globalAlpha = this.alpha;
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        canvas.fillStyle = this.color;
        canvas.fill();
        canvas.closePath();
        canvas.restore();
    }
}
function init(){
    array = [];

    
}

function animation(){
    requestAnimationFrame(animation);

    canvas.fillStyle = 'rgba(0,0,0,0.05)';
    canvas.fillRect(0,0,innerWidth,innerHeight);
    for(let x = 0; x < array.length; x++){
        if(array[x].alpha > 0){
            array[x].update()
        } else{
            array.splice(x, 1);
        }
    }
}
init()
HtmlCanvas.addEventListener('click', (e)=> {
    mouse.x = e.x;
    mouse.y = e.y;
    
    for(let z = 0; z < 600; z++){
        const radius = 3;
        const angle = Math.PI*2/600    
        const circle = new Circle(mouse.x, mouse.y, radius, getRandomHslColor(360, 100, 50), {
            x: Math.cos(angle * z) * Math.random() * 30,
            y: Math.sin(angle * z) * Math.random() * 30
        });
        array.push(circle);
    }
    animation();
});