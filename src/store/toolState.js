import {makeAutoObservable} from 'mobx';

class ToolState {
    tull = null
    constructor() {
        makeAutoObservable(this);
    }

    setTool(tool) {
        this.tool = tool;
    }
}

export default new ToolState();