class Maze {
  constructor(lines) {
    this.sizeMatrix = lines[0];
    this.matrix = this.generateMatrix(lines);
    this.freeBlocks = this.generateFreeBlocks(lines);
  }

  generateMatrix(lines) {
    const withoutFirstLine = lines.filter((_, index) => index > 0);
    return withoutFirstLine.map((line) => line.trim().split(" "));
  }

  generateFreeBlocks(lines) {
    const withoutFirstLine = lines.filter((_, index) => index > 0);
    let valueFreeBlocks = 0;

    withoutFirstLine.forEach((line) => {
      line
        .trim()
        .split(" ")
        .forEach((gene) => {
          if (gene == 0) {
            valueFreeBlocks++;
          }
        });
    });
    return valueFreeBlocks;
  }

  getMatrix() {
    return this.matrix;
  }

  getSize() {
    return this.sizeMatrix;
  }

  getLengthFreeBlocks() {
    return this.freeBlocks;
  }
}

module.exports = Maze;
