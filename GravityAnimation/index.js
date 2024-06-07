const HtmlCanvas = document.getElementById('canvas');

HtmlCanvas.width = innerWidth;
HtmlCanvas.height = innerHeight;

window.addEventListener('resize', () => {
    HtmlCanvas.width = innerWidth;
    HtmlCanvas.height = innerHeight;

    init();
});
HtmlCanvas.addEventListener('click', () => {
    init();
});

const canvas = HtmlCanvas.getContext('2d');

const friction = 0.93;
const gravity = 1;
const color = [
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
    const x = Math.floor(Math.random()* color.length);
    const result = color[x];

    return result;
}
function Circle(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = () => {
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        canvas.fillStyle = this.color;
        canvas.fill();
        canvas.stroke()
        canvas.closePath()
    }

    this.update = () => {
        if(this.y + this.radius > innerHeight){
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}
let array = [];
function init(){
    array = [];

    for(let z = 0; z < 200; z++){
        const x = generateRandom(10, innerWidth);
        const y = generateRandom(10, innerHeight);
        const dx = generateRandom(-2, 2);
        const dy = generateRandom(-2, 2);
        const radius = Math.floor(generateRandom(5, 30));
        const color = getRandomColor();
        
        array.push(new Circle(x, y, dx, dy, radius, color));
        array[z].draw();
    }
}

function animate(){
    requestAnimationFrame(animate);

    canvas.clearRect(0,0, innerWidth, innerHeight);

    for(let x = 0; x < array.length; x++){
        array[x].update();
    }

}
init()
animate()