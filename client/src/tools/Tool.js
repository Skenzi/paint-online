export default class Tool {
    constructor(canvas, socket, sessionId) {
        this.canvas = canvas;
        this.sessionId = sessionId;
        this.socket = socket;
        this.ctx = canvas.getContext('2d');
        this.destroyedEvents();
    }

    destroyedEvents() {
        this.canvas.onmouseup = null;
        this.canvas.onmousedown = null;
        this.canvas.onmousemove = null;
    }

    set fillColor(color) {
        this.ctx.fillStyle = color;
    }

    set strokeColor(color) {
        this.ctx.strokeStyle = color;
    }

    set lineWidth(width) {
        this.ctx.lineWidth = width;
    }
}