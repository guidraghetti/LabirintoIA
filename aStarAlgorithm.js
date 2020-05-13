const NodeMaze = require('./nodeMaze')
class AStarAlgorithm {
    constructor(maze){
        this.maze = maze;
    }

     heuristics(start, goal){
        let dx = Math.abs(start[0] - goal[1])
        let dy = Math.abs(start[1] - goal[0])
        let sum = 10 * (dx + dy) - 5.857 * Math.min(dx, dy)
        return sum;
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
            //console.table(openList)
            let currentNode = openList[0];
           

            openList.forEach(element => {
               if(element.f < currentNode.f){
                   currentNode = element;
               }
            })

            openList.splice(openList.indexOf(currentNode), 1);
            closedList.push(currentNode)
           // console.table(openList)
            //console.table(closedList)
            //console.log(currentNode.position.toString() == goalNode.position.toString() ? 'True' : 'False')
           // console.log(currentNode);
            if (currentNode.position.toString() == goalNode.position.toString()) {
                let path = [];
                let current = currentNode;
                console.log('Entrou', currentNode.position)
                while (current.parent !== null) {
                    path.push(current.position);
                    current = current.parent;
                }
                console.log(path.reverse());
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

                let newNode = new NodeMaze(currentNode, nodePosition)
                //console.log (newNode);
                neighbors.push(newNode);
                 //console.table(neighbors)
                
            }
            //console.log(neighbors);
            let indexNeighbor = 0;
            while (indexNeighbor < neighbors.length) {
               //console.table(closedList)
               console.log(neighbors[indexNeighbor], indexNeighbor, neighbors.length)
               
                
               for (let i = 0; i < closedList.length; i ++) {
                   if(neighbors[indexNeighbor] && closedList[i].position.toString() == neighbors[indexNeighbor].position.toString()){
                    console.log('Entrou no closed');
                    indexNeighbor ++;
                    continue
                   }
               }
               if(neighbors.length === indexNeighbor){
                break
                 }
               // console.log(currentNode);
                neighbors[indexNeighbor].g = currentNode.g + 1;
                //console.log('Valor =', neighbors[indexNeighbor].g + this.heuristics(neighbors[indexNeighbor], goal));
                neighbors[indexNeighbor].f = neighbors[indexNeighbor].g + this.heuristics(neighbors[indexNeighbor].position, goal)

                for (let i = 0; i< openList.length; i++) {
                    if (neighbors[indexNeighbor].position == openList[i].position && neighbors[indexNeighbor].g > openList[i].g) {
                        indexNeighbor++;
                        continue;
                    }
                }
                openList.push(neighbors[indexNeighbor])

                indexNeighbor ++;
            }
        }
        return false;
    }

}

module.exports = AStarAlgorithm;
