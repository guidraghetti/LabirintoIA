const File = require("./file");
const Maze = require("./maze");
const Chromosome = require("./chromosome");

const file = new File(process.argv[2]);
const maze = new Maze(file.content());
const chromosome = new Chromosome(maze.freeBlocks, 7);

console.log("test", chromosome.getChromosome());
