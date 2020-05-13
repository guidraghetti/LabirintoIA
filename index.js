const File = require("./file");
const Maze = require("./maze");
const GA = require("./ga.js");

const file = new File(process.argv[2]);
const maze = new Maze(file.content());
const ga = new GA(
  process.argv[3],
  maze.getMatrix(),
  maze.freeBlocks,
  process.argv[4],
  file.name
);
ga.verifySolution();
