const File = require("./file");
const Maze = require("./maze");
const GA = require("./ga.js");
// const AStarAlgorithm = require("./aStarAlgorithm");

const file = new File(process.argv[2]);
const maze = new Maze(file.content());

// const aStar = new AStarAlgorithm(maze.getMatrix());
// aStar.a_Star([0, 0], [8, 0]);
const ga = new GA(
  process.argv[3],
  maze.getMatrix(),
  maze.freeBlocks,
  process.argv[4],
  file.name
);
ga.verifySolution();
