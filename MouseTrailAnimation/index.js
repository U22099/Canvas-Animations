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
function generateRandom(min , max){
    const result = (Math.random()*(max-min)) + min;

    return result;
}
function getRandomHslColor(x = 360, y = 100, z = 50){
    const result = `hsl(${Math.random()*x}, ${y}%, ${z}%)`;

    return result;
}
function Circle(){
    this.x = mouse.x;
    this.y = mouse.y;
    this.radius = generateRandom(0.5, 2);
    this.color = getRandomHslColor();
    this.velocity = {
        x: generateRandom(-1, 1),
        y: generateRandom(-1, 1),
    }
    
    this.update = () => {

        
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        this.draw()
    }
    
    this.draw = () => {
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.radius, 0 , Math.PI*2);
        canvas.fillStyle = this.color;
        canvas.fill();
        canvas.strokeStyle = this.color;
        canvas.stroke();
        canvas.closePath();
    }
}

window.addEventListener('mousemove', (e)=> {
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 3; i++) {
        array.push(new Circle());        
    }
});
window.addEventListener('mouseout', (e)=> {
    mouse.x = undefined;
    mouse.y = undefined;
});
function drawLine(particle1, particle2){
    canvas.beginPath()
    canvas.moveTo(particle2.x, particle2.y);
    canvas.lineTo(particle1.x, particle1.y);
    canvas.lineWidth = 0.2;
    canvas.strokeStyle = getRandomHslColor();
    canvas.stroke();
    canvas.closePath();
}
function connect(particle){
    for (let i = 0; i < array.length; i++) {
        if(array[i] === particle) continue;
        if(array[i].x - particle.x < 60 || array[i].y - particle.y < 60){
            drawLine(array[i], particle);
        }       
    }
}
function animation(){
    requestAnimationFrame(animation);

    canvas.fillStyle = 'rgba(0,0,0,0.3)'
    canvas.fillRect(0, 0, innerWidth, innerHeight);
    for(let x = 0; x < array.length; x++){
        if(array[x].radius > 0){
            array[x].update();
            array[x].radius -= 0.03;
            
            //connect(array[x]);
        } else if(array[x].radius <= 0){
            array.splice(x, 1);
        }
    }
}
animation()
