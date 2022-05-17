import Tool from "./Tool";
export default class Line extends Tool {
    constructor(canvas, socket, sessionId) {
        super(canvas, socket, sessionId);
        this.listen();
    }
    listen() {
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
                type: 'line',
                startX: this.startX,
                startY: this.startY,
                endX: this.currentX,
                endY: this.currentY,
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
            this.currentX = e.pageX - e.target.offsetLeft;
            this.currentY = e.pageY - e.target.offsetTop;
            this.draw(this.currentX, this.currentY);
        }
    }
    draw(x, y) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.startX, this.startY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
            this.ctx.beginPath();
    }
    static staticDraw(ctx, startX, startY, endX, endY) {
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.beginPath();
    }
}