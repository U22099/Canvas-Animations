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
]
function Circle(x, y, radius, dx, dy, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRad = radius;
    this.color = color;

    this.draw = () => {
        canvas.beginPath();
        canvas.strokeStyle = this.color;
        canvas.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        canvas.fillStyle = this.color;
        canvas.stroke();
        canvas.fill()
    }
    this.update = () => {
        if(this.x - radius < 0 || this.x + radius > innerWidth){
            this.dx = -this.dx
        } else if(this.y - radius < 0 || this.y + radius > innerHeight){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if(this.radius < 40){
                this.radius += 1
            }
        }else if(this.radius > this.minRad){
                this.radius -= 1
        }

        this.draw()
    }
}
function init(){
    array = [];

    for(let z = 0; z < 320; z++){
        const radius = Math.floor(Math.random()*15);
        const x = (Math.random()*innerWidth) - radius;
        const y = (Math.random()*innerHeight) - radius;
        const dx = (Math.random() - 0.5) * 2;
        const dy = (Math.random() - 0.5) * 2;
        const color = colors[Math.floor((Math.random()*colors.length) - 1)];
        const circle = new Circle(x, y, radius, dx, dy, color);
        circle.draw();
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