import React from "react";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from '../tools/Brush';
import Rect from "../tools/Rect";

const Toolbar = () => {
    return (
        <div className="toolbar">
            <button className="toolbar__button brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas))} />
            <button className="toolbar__button rect" onClick={() => toolState.setTool(new Rect(canvasState.canvas))} />
            <button className="toolbar__button circle" />
            <button className="toolbar__button eraser" />
            <button className="toolbar__button line" />
            <input type="color" className="toolbar__button" />
            <button className="toolbar__button undo" />
            <button className="toolbar__button redo" />
            <button className="toolbar__button save" />
        </div>
    )
};

export default Toolbar;
