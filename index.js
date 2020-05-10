const File = require("./file");
const Maze = require("./maze");
const Chromosome = require("./chromosome");
const GA = require("./ga.js");

const file = new File(process.argv[2]);
const maze = new Maze(file.content());
const chromosome = new Chromosome(maze.freeBlocks, 8);
const ga = new GA(process.argv[3], maze.getMatrix(), maze.freeBlocks);
ga.verifySolution();
