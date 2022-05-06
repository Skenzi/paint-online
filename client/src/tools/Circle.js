import Tool from "./Tool";

export default class Circle extends Tool {
    constructor(canvas, socket, sessionId) {
        super(canvas, socket, sessionId);
        this.listen();
    }
    listen() {
        console.log('listen')
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }
    mouseUpHandler(e) {
        this.mouseDown = false;
        this.socket.send(JSON.stringify({
            event: 'draw',
            id: this.sessionId,
            figure: {
                type: 'circle',
                x: this.startX,
                y: this.startY,
                radius: this.radius,
                startAngle: this.startAngle,
                endAngle: this.endAngle,
            }
        }))
    }
    mouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = this.canvas.toDataURL();
    }
    mouseMoveHandler(e) {
        if(this.mouseDown) {
            const currentX = e.pageX - e.target.offsetLeft;
            this.radius = Math.abs(currentX - this.startX);
            this.startAngle = 0 * Math.PI;
            this.endAngle = 2 * Math.PI;
            this.draw(this.startX, this.startY, this.radius, this.startAngle, this.endAngle);
        }
    }
    draw(x, y, r, startAngle, endAngle) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, startAngle, endAngle);
            this.ctx.fill();
            this.ctx.stroke();
        }
    }
    static staticDraw(ctx, x, y, r, startAngle, endAngle) {
        ctx.arc(x, y, r, startAngle, endAngle);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
    }
}