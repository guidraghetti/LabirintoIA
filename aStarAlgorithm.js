const NodeMaze = require('./nodeMaze')
class AStarAlgorithm {
    constructor(maze){
        this.maze = maze;
    }

     heuristics(start, goal){
        let dx = Math.abs(start[0] - goal[1])
        let dy = Math.abs(start[1] - goal[0])
        return 10 * (dx + dy) - 5.857 * Math.min(dx, dy)

    }

     a_Star(start, goal) {
        let startNode = new NodeMaze (null, start);
        startNode.g = 0;
        startNode.f = 0;
        let goalNode = new NodeMaze (null, goal);
        goalNode.g = 0;   
        goalNode.f = 0;

        let openList = [];
        let closedList = [];

        openList.push(startNode);


        while (openList.length > 0) {
            let currentNode = openList[0];
           
            let currentIndex = 0;

            openList.forEach(element => {
               if(element.f < currentNode.f){
                   currentNode = element;
                   currentIndex = openList.indexOf(element);
               }
            })

            openList.slice(openList.indexOf(currentNode), 1);
            closedList.push(currentNode)
            let a = [2,4];
            let b = [2,4];
            
            if (currentNode.position.toString() == goalNode.position.toString()) {
                let path = [];
                let current = currentNode;
                while (current.parent !== null) {
                    path.push(current.position);
                    current = current.parent;
                    console.log(current.parent);
                }
                //console.log(path.reverse());
                return 
            }
            let neighbors = [];
            let positions = [[-1, 0],[1, 0],[0, +1],[0, -1],
                                [-1, 1],[1, 1],[1, -1],[-1, -1]]
            for (let i = 0; i < 8; i++){
                let nodePosition = [currentNode.position[0] + positions[i][0], currentNode.position[1] + positions[i][1]]
                if (nodePosition[0] < 0 
                    || nodePosition[1] < 0 
                    || nodePosition[0] >= this.maze.length-1 
                    || nodePosition[1] >= this.maze.length-1) {
                        continue
                    }
                if (   this.maze[nodePosition[0]][nodePosition[1]]=== '1'
                    || this.maze[nodePosition[0]][nodePosition[1]]=== 'B'
                    // || this.maze[nodePosition[0]][nodePosition[1]]=== 'E' 
                    ) {
                        continue
                }

                let newNode = new NodeMaze(currentNode, currentNode.position)
                //console.log (newNode);
                neighbors.push(newNode);
                
            }
            //console.log(neighbors);
            let indexNeighbor = neighbors.length-1;

            while (indexNeighbor > 0) {
                if (closedList.includes(neighbors[indexNeighbor])){
                    continue
                }
                neighbors[indexNeighbor].g = currentNode.g + 1;
                neighbors[indexNeighbor].f = neighbors[indexNeighbor].g + this.heuristics(neighbors[indexNeighbor], goal)

                for (let i = 0; i< openList.length; i++) {
                    if (neighbors[indexNeighbor] == openList[i] && neighbors[indexNeighbor].g > openList[i].g) {
                        continue;
                    }
                }
                openList.push(neighbors[indexNeighbor])

                indexNeighbor --;
            }
        }
        return false;
    }

}

module.exports = AStarAlgorithm;
