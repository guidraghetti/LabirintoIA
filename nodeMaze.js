class NodeMaze {
    constructor(parent, position) {
        this.parent = parent;
        this.position = position;
        this.g = 0;
        this.f = 0;
    }
}

module.exports = NodeMaze;