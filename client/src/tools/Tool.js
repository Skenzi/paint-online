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
        this.socket.send(JSON.stringify({
            event: 'draw',
            id: this.sessionId,
            figure: {
                type: 'fillColor',
                color,
            }
        }))
    }

    set strokeColor(color) {
        this.socket.send(JSON.stringify({
            event: 'draw',
            id: this.sessionId,
            figure: {
                type: 'strokeColor',
                color,
            }
        }))
    }

    set lineWidth(width) {
        this.socket.send(JSON.stringify({
            event: 'draw',
            id: this.sessionId,
            figure: {
                type: 'lineWidth',
                width,
            }
        }))
    }
}