const NodeMaze = require('./nodeMaze')
const fs = require("fs");
class AStarAlgorithm {
    constructor(maze, output) {
        this.maze = maze;
        this.output = output;
    }

    heuristics(start, goal) {
        return Math.max(Math.abs((start[0] - goal[0]) + (start[1] - goal[1])));
    }

    a_Star(start, goal) {

        this.output += `\n----- Rodando A* Algorithm-----`;
        console.log('----Rodando A* Algorithm-----\n\n')
        let startNode = new NodeMaze(null, start);
        startNode.g = 0;
        startNode.f = 0;
        let goalNode = new NodeMaze(null, goal);
        goalNode.g = 0;
        goalNode.f = 0;

        let openList = [];
        let closedList = [];

        openList.push(startNode);


        while (openList.length > 0) {

            let currentNode = openList[0];


            openList.forEach(element => {
                if (element.f < currentNode.f) {
                    currentNode = element;
                }
            })


            openList.splice(openList.indexOf(currentNode), 1);
            closedList.push(currentNode)

            if (currentNode.position.toString() == goalNode.position.toString()) {
                let path = [];
                let current = currentNode;
                while (current.parent !== null) {
                    path.push(current.position);
                    current = current.parent;
                }
                this.output += `\n----- Melhoro caminho encontrado`;
                this.output += `\nCaminho ${JSON.stringify(path)}\n`;
                console.log('----Melhor caminho encontrado----\n\n');
                console.log(`\nCaminho ${JSON.stringify(path)}\n`);
                return
            }
            let neighbors = [];
            let positions = [
                [-1, 0],
                [1, 0],
                [0, 1],
                [0, -1],
                [-1, 1],
                [1, 1],
                [1, -1],
                [-1, -1]
            ]
            for (let i = 0; i < 8; i++) {
                let nodePosition = [currentNode.position[0] + positions[i][0], currentNode.position[1] + positions[i][1]]
                if (nodePosition[0] < 0 ||
                    nodePosition[1] < 0 ||
                    nodePosition[0] > this.maze.length - 1 ||
                    nodePosition[1] > this.maze.length - 1) {
                    continue
                }
                if (this.maze[nodePosition[0]][nodePosition[1]] === '1' ||
                    this.maze[nodePosition[0]][nodePosition[1]] === 'B'
                ) {
                    continue
                }

                let newNode = new NodeMaze(currentNode, nodePosition)
                neighbors.push(newNode);

            }

            let indexNeighbor = 0;
            while (indexNeighbor < neighbors.length) {
                let controlWhile = false;
                for (let i = 0; i < closedList.length; i++) {
                    if (neighbors[indexNeighbor] && closedList[i].position.toString() == neighbors[indexNeighbor].position.toString()) {
                        indexNeighbor++;
                        controlWhile = true;
                    }
                }
                if (controlWhile == true) {
                    continue;
                }
                neighbors[indexNeighbor].g = currentNode.g + 1;
                neighbors[indexNeighbor].f = neighbors[indexNeighbor].g + this.heuristics(neighbors[indexNeighbor].position, goal)

                for (let i = 0; i < openList.length; i++) {
                    if (neighbors[indexNeighbor].position == openList[i].position && neighbors[indexNeighbor].g > openList[i].g) {
                        indexNeighbor++;
                        controlWhile = true;
                    }
                }
                if (controlWhile == true) {
                    continue
                }
                openList.push(neighbors[indexNeighbor])

                indexNeighbor++;
            }
        }
    }

}

module.exports = AStarAlgorithm;