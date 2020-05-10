class Chromosome {
  constructor(maxLength, genesLenght) {
    this.genesLenght = genesLenght;
    this.maxLength = maxLength;
    this.currentCord = [0, 0]; //row, col
    this.genes = this.generateChromosome();
    this.path = new Array();
  }

  randomBetween(min, max) {
    const randomNumber = Math.random() * (max - min) + min;
    return Math.round(randomNumber, 0);
  }

  getChromosome() {
    return this.genes;
  }

  getPath() {
    return this.path;
  }

  generateChromosome() {
    let listGenes = new Array(this.maxLength).fill(0);

    return listGenes.map((gene) => (gene = this.randomBetween(0, 7)));
  }
  // https://pt.wikipedia.org/wiki/Rosa_dos_ventos
  // 0 = norte
  // 1 = nordeste
  // 2 = leste
  // 3 = sudeste
  // 4 = sul
  // 5 = sudoeste
  // 6 = oeste
  // 7 = noroeste
  movementNorth(currentCord, matrix) {
    if (currentCord[0] == 0) {
      return -1;
    }
    return {
      value: matrix[currentCord[0] - 1][[currentCord[1]]],
      coord: [currentCord[0] - 1, currentCord[1]],
    };
  }

  movementNortheast(currentCord, matrix) {
    if (currentCord[0] == 0 || currentCord[1] == matrix.length - 1) {
      return -1;
    }
    return {
      value: matrix[currentCord[0] - 1][[currentCord[1] + 1]],
      coord: [currentCord[0] - 1, currentCord[1] + 1],
    };
  }

  movementEast(currentCord, matrix) {
    if (currentCord[1] == matrix.length - 1) {
      return -1;
    }
    return {
      value: matrix[currentCord[0]][[currentCord[1] + 1]],
      coord: [currentCord[0], currentCord[1] + 1],
    };
  }

  movementSoutheast(currentCord, matrix) {
    if (
      currentCord[0] == matrix.length - 1 ||
      currentCord[1] == matrix.length - 1
    ) {
      return -1;
    }

    return {
      value: matrix[currentCord[0] + 1][[currentCord[1] + 1]],
      coord: [currentCord[0] + 1, currentCord[1] + 1],
    };
  }

  movementSouth(currentCord, matrix) {
    if (currentCord[0] == matrix.length - 1) {
      return -1;
    }
    return {
      value: matrix[currentCord[0] + 1][[currentCord[1]]],
      coord: [currentCord[0] + 1, currentCord[1]],
    };
  }
  movementSouthwest(currentCord, matrix) {
    if (currentCord[0] == matrix.length - 1 || currentCord[1] == 0) {
      return -1;
    }
    return {
      value: matrix[currentCord[0] + 1][[currentCord[1] - 1]],
      coord: [currentCord[0] + 1, currentCord[1] - 1],
    };
  }
  movementWest(currentCord, matrix) {
    if (currentCord[1] == 0) {
      return -1;
    }
    return {
      value: matrix[currentCord[0]][[currentCord[1] - 1]],
      coord: [currentCord[0], currentCord[1] - 1],
    };
  }

  movementNorthWest(currentCord, matrix) {
    if (currentCord[0] == 0 || currentCord[1] == 0) {
      return -1;
    }
    return {
      value: matrix[currentCord[0] - 1][[currentCord[1] - 1]],
      coord: [currentCord[0] - 1, currentCord[1] - 1],
    };
  }

  move(moviment, matrix) {
    switch (moviment) {
      case 0:
        return this.movementNorth(this.currentCord, matrix);
      case 1:
        return this.movementNortheast(this.currentCord, matrix);
      case 2:
        return this.movementEast(this.currentCord, matrix);
      case 3:
        return this.movementSoutheast(this.currentCord, matrix);
      case 4:
        return this.movementSouth(this.currentCord, matrix);
      case 5:
        return this.movementSouthwest(this.currentCord, matrix);
      case 6:
        return this.movementWest(this.currentCord, matrix);
      default:
        return this.movementNorthWest(this.currentCord, matrix);
    }
  }

  calculateWay(matrix) {
    let lenghtMoves = 0;
    this.genes.forEach((gene) => {
      if (lenghtMoves == "Caiu") {
        return;
      }
      if (lenghtMoves == "Exit") {
        return;
      }

      const move = this.move(gene, matrix);
      console.log("move ", move);
      switch (move.value) {
        case "0":
          this.currentCord = move.coord;
          this.path.push(move.coord);
          lenghtMoves++;
          break;
        case "B":
          break;
        case "1":
          break;
        case "E":
          this.currentCord = move.coord;
          this.path.push(move.coord);
          lenghtMoves = 0;
          break;
        case "S":
          lenghtMoves = "Exit";
          break;
        case "-1":
          break;
      }
    });
    return lenghtMoves;
  }
}

module.exports = Chromosome;
