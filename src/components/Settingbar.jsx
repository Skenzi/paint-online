import React from "react";
import toolState from "../store/toolState";

const Settingbar = () => {
    return (
        <div className="settingbar">
            <label className="settingbar__label" htmlFor="line-width">Толщина линии</label>
            <input id="line-width" onChange={(ev) => toolState.setLineWidth(ev.target.value)} defaultValue={1} min={1} max={56} type="number" />
            <label className="settingbar__label" htmlFor="stroke-color">Обводка линии</label>
            <input id="stroke-color" onChange={(ev) => toolState.setStrokeColor(ev.target.value)} type="color" />
        </div>
    )
};

export default Settingbar;
