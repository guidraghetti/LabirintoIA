class Maze {
  constructor(lines) {
    this.sizeMatrix = lines[0];
    this.matrix = this.generateMatrix(lines);
  }

  generateMatrix(lines) {
    const withoutFirstLine = lines.filter((_, index) => index > 0);
    return withoutFirstLine.map((line) => line.trim().split(" "));
  }

  getMatrix() {
    return this.matrix;
  }

  getSize() {
    return this.sizeMatrix;
  }
}

module.exports = Maze;
