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
function distance(x1, y1, x2, y2){
    const x = x2 - x1;
    const y = y2 - y1;

    const result = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    return result;
}
function rotate(velocity, angle){
    const rotatedVelocity = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
    }
    return rotatedVelocity
}
function resolveCollision(particle1, particle2){
    const xdiff = particle2.x - particle1.x;
    const ydiff = particle2.y - particle1.y;

    const vxdiff = particle1.velocity.x - particle2.velocity.x;
    const vydiff = particle1.velocity.y - particle2.velocity.y;

    if(vxdiff * xdiff + vydiff * ydiff >= 0){

        const angle = -Math.atan2(ydiff, xdiff);

        const m1 = 1;
        const m2 = 1;

        const u1 = rotate(particle1.velocity, angle);
        const u2 = rotate(particle2.velocity, angle);

        const v1 = {
            x: (u1.x*(m1 - m2) + 2*m2*u2.x) / (m1+m2),
            y: u1.y
        };
        const v2 = {
            x: (u2.x*(m2 - m1) + 2*m1*u1.x) / (m1+m2),
            y: u2.y
        };

        const v1Final = rotate(v1, -angle);
        const v2Final = rotate(v2, -angle);

        particle1.velocity = v1Final;
        particle2.velocity = v2Final;

    }
}
function Circle(x, y, radius, vx, vy, color){
    this.x = x;
    this.y = y;
    this.velocity = {
        x: vx,
        y: vy
    }
    this.radius = radius;
    this.minRad = radius;
    this.color = color;
    this.opacity = 0.2;

    this.draw = () => {
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        canvas.save()
        canvas.globalAlpha = this.opacity;
        canvas.fillStyle = this.color;
        canvas.fill();
        canvas.restore();
        canvas.strokeStyle = this.color;
        canvas.stroke();
    }
    this.update = () => {
        for (let i = 0; i < array.length; i++) {
            if(this === array[i]) continue;
            if(distance(this.x, this.y, array[i].x, array[i].y) < this.radius + array[i].radius){
                resolveCollision(this, array[i]);
            }
            
        }
        if(this.x - radius < 0 || this.x + radius > innerWidth){
            this.velocity.x = -this.velocity.x
        } else if(this.y - radius < 0 || this.y + radius > innerHeight){
            this.velocity.y = -this.velocity.y;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if(mouse.x - this.x < 100 && mouse.x - this.x > -100 && mouse.y - this.y < 100 && mouse.y - this.y > -100){
            if(this.opacity < 0.8){
                this.opacity += 0.08;
            }
        }else if(this.opacity > 0.2){
                this.opacity -= 0.1;
        }

        this.draw()
    }
}
function init(){
    array = [];

    for(let z = 0; z < 280; z++){
        const radius = 15;
        let x = generateRandom(radius, innerWidth - radius);
        let y = generateRandom(radius, innerHeight - radius);
        const vx = generateRandom(-4, 4);
        const vy = generateRandom(-4, 4);
        const color = getRandomColor();
        if( z !== 0){
            for (let i = 0; i < array.length; i++) {
                if(distance(x, y, array[i].x, array[i].y) < radius + array[i].radius){
                    x = generateRandom(radius, innerWidth - radius);
                    y = generateRandom(radius, innerHeight - radius);

                    i = -1;
                }                
            }
        }
        
        const circle = new Circle(x, y, radius, vx, vy, color);
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