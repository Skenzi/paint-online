import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Modal, Button } from 'react-bootstrap';
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from '../tools/Brush';
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";

const Canvas = observer(() => {
    const canvasRef = useRef();
    const [show, setShow] = useState(true);
    const [name, setName] = useState('');
    const params = useParams();

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);
    }, [])

    useEffect(() => {
        if(canvasState.username) {
            const wss = new WebSocket('ws://localhost:5000/');
            canvasState.setSessionId(params.id);
            canvasState.setSocket(wss);
            toolState.setTool(new Brush(canvasRef.current, wss, params.id))
            wss.onopen = () => {
                wss.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    event: 'connection',
                }));
            }
            wss.onmessage = (event) => {
                const msg = JSON.parse(event.data);
                switch(msg.event) {
                    case 'connection':
                        console.log(`Пользователь ${msg.username} подключился`)
                        break;
                    case 'draw':
                        drawHandler(msg.figure);
                        break;
                    default:
                        console.log('I dont know')
                }
            }
        }
    }, [canvasState.username])

    const drawHandler = (msg) => {
        const ctx = canvasRef.current.getContext('2d');
        switch(msg.type) {
            case 'brush':
                Brush.draw(ctx, msg.x, msg.y);
                break;
            case 'rect':
                Rect.staticDraw(ctx, msg.x, msg.y, msg.width, msg.height);
                break;
            case 'circle':
                Circle.staticDraw(ctx, msg.x, msg.y, msg.radius, msg.startAngle, msg.endAngle);
                break;
            case 'eraser':
                Eraser.draw(ctx, msg.x, msg.y);
                break;
            case 'line':
                console.log(msg)
                Line.staticDraw(ctx, msg.startX, msg.startY, msg.endX, msg.endY);
                break;
            case 'finish':
                ctx.beginPath();
                break;
            default:
                console.log('error')
        }
    }

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }

    const connectionHandler = () => {
        canvasState.setUsername(name);
        setShow(false);
    }

    return (
        <div className="canvas">
            <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Введите свое имя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={connectionHandler}>
            Подтвердить
          </Button>
        </Modal.Footer>
      </Modal>
            <canvas ref={canvasRef} onMouseDown={() => mouseDownHandler()} width={600} height={400}></canvas>
        </div>
    )
});

export default Canvas;
