const File = require("./file");
const Maze = require("./maze");

const file = new File(process.argv[2]);
const maze = new Maze(file.content());

console.log(maze.getMatrix(), maze.getSize());
