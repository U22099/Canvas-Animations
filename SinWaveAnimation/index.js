const HtmlCanvas = document.getElementById('canvas');

HtmlCanvas.width = innerWidth;
HtmlCanvas.height = innerHeight;

const canvas = HtmlCanvas.getContext('2d');

window.addEventListener('resize', ()=> {
    HtmlCanvas.width = innerWidth;
    HtmlCanvas.height = innerHeight;
});
let frequency = 0.08;
function animate(){
    requestAnimationFrame(animate);

    canvas.fillStyle = 'rgba(0, 0, 0, 0.01)';
    canvas.fillRect(0, 0, HtmlCanvas.width, HtmlCanvas.height);

    canvas.beginPath();
    canvas.moveTo(0, HtmlCanvas.height/2);

    for (let i = 0; i < HtmlCanvas.width; i++) {
        const yEqn = HtmlCanvas.height / 2 + Math.sin((i / 100) + frequency) * 150  * Math.abs(Math.sin(i))
        canvas.lineTo(i, yEqn);
        
    }
    
    canvas.strokeStyle = `hsl(${Math.abs(Math.sin(frequency * 0.2)*255)}, 100%, 50%)`;
    canvas.stroke();
    
    frequency += 0.04;
}
animate()