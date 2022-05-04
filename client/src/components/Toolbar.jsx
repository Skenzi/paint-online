import React from "react";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from '../tools/Brush';
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Line from '../tools/Line';
import Eraser from '../tools/Eraser';

const Toolbar = () => {
    const changeColor = (ev) => {
        toolState.setFillColor(ev.target.value);
        toolState.setStrokeColor(ev.target.value);
    }
    return (
        <div className="toolbar">
            <button className="toolbar__button brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas))} />
            <button className="toolbar__button rect" onClick={() => toolState.setTool(new Rect(canvasState.canvas))} />
            <button className="toolbar__button circle" onClick={() => toolState.setTool(new Circle(canvasState.canvas))} />
            <button className="toolbar__button eraser" onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}  />
            <button className="toolbar__button line" onClick={() => toolState.setTool(new Line(canvasState.canvas))} />
            <input type="color" onChange={changeColor} className="toolbar__button" />
            <button className="toolbar__button undo" onClick={() => canvasState.undo()} />
            <button className="toolbar__button redo" onClick={() => canvasState.redo()} />
            <button className="toolbar__button save" />
        </div>
    )
};

export default Toolbar;