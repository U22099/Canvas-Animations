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
    x: innerWidth/2,
    y: innerHeight/2
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
function Particle(x, y, radius, color, velocity){
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
    this.radian = generateRandom(0, Math.PI*2);
    this.distance = generateRandom(50, 180);
    this.lastMouse = {
        x: x,
        y: y
    }

    this.update = () => {
        const lastpoint = {
            x: this.x,
            y: this.y
        }
        this.lastMouse.x += (mouse.x - this.lastMouse.x)*0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y)*0.05;

        this.radian += this.velocity;
        this.x = this.lastMouse.x + Math.cos(this.radian) * this.distance;
        this.y = this.lastMouse.y + Math.sin(this.radian) * this.distance;

        this.draw(lastpoint)
    }

    this.draw = lastpoint => {
        canvas.beginPath();
        canvas.lineWidth = this.radius;
        canvas.moveTo(lastpoint.x, lastpoint.y);
        canvas.lineTo(this.x, this.y);
        canvas.fillStyle = this.color;
        canvas.fill();
        canvas.strokeStyle = this.color;
        canvas.stroke();
    }
}
function init(){
    array = [];

    for(let z = 0; z < 40; z++){
        const radius = generateRandom(2, 6); 
        const color = getRandomColor()     
        const circle = new Particle(innerWidth/2, innerHeight/2, radius, color, 0.08);
        array.push(circle);
    }
}

function animation(){
    requestAnimationFrame(animation);

    canvas.fillStyle = 'rgba(255, 255, 255, 0.05)';
    canvas.fillRect(0, 0, innerWidth, innerHeight);
    for(let x = 0; x < array.length; x++){
        array[x].update()
    }
}
init()
animation()