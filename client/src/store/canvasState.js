import {makeAutoObservable} from 'mobx';

class CanvasState {
    canvas = null;
    socket = null;
    sessionId = null;
    undoList = [];
    redoList = [];
    username = '';
    constructor() {
        makeAutoObservable(this);
    }

    setSocket(socket) {
        this.socket = socket;
    }

    setSessionId(id) {
        this.sessionId = id;
    }

    setUsername(username) {
        this.username = username;
    }

    setCanvas(canvas) {
        this.canvas = canvas;
    }

    pushToRedo(data) {
        this.redoList.push(data);
    }

    pushToUndo(data) {
        this.undoList.push(data);
    }

    undo() {
        const ctx = this.canvas.getContext('2d');
        if(this.undoList.length) {
            const dataUrl = this.undoList.pop();
            this.socket.send(JSON.stringify({
                event: 'drawImage',
                id: this.sessionId,
                dataUrl,
            }))
            this.pushToRedo(this.canvas.toDataURL());
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            }
        } else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    redo() {
        const ctx = this.canvas.getContext('2d');
        if(this.redoList.length) {
            const dataUrl = this.redoList.pop();
            this.socket.send(JSON.stringify({
                event: 'drawImage',
                id: this.sessionId,
                dataUrl,
            }))
            this.pushToUndo(this.canvas.toDataURL());
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            }
        }
    }
}

export default new CanvasState();