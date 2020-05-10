class Chromosome {
  constructor(maxLength, genesLenght) {
    this.genesLenght = genesLenght;
    this.maxLength = maxLength;
    this.currentCord = [0, 0]; //row, col
    this.genes = this.generateChromosome();
    this.path = new Array();
    this.countPathNoRepeat = 0;
    this.fitness = 0;
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
      return { value: -1 };
    }

    return {
      value: matrix[currentCord[0] - 1][[currentCord[1]]],
      coord: [currentCord[0] - 1, currentCord[1]],
    };
  }

  movementNortheast(currentCord, matrix) {
    if (currentCord[0] == 0 || currentCord[1] == matrix.length - 1) {
      return { value: -1 };
    }
    return {
      value: matrix[currentCord[0] - 1][[currentCord[1] + 1]],
      coord: [currentCord[0] - 1, currentCord[1] + 1],
    };
  }

  movementEast(currentCord, matrix) {
    if (currentCord[1] == matrix.length - 1) {
      return { value: -1 };
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
      return { value: -1 };
    }

    return {
      value: matrix[currentCord[0] + 1][[currentCord[1] + 1]],
      coord: [currentCord[0] + 1, currentCord[1] + 1],
    };
  }

  movementSouth(currentCord, matrix) {
    if (currentCord[0] == matrix.length - 1) {
      return { value: -1 };
    }
    return {
      value: matrix[currentCord[0] + 1][[currentCord[1]]],
      coord: [currentCord[0] + 1, currentCord[1]],
    };
  }
  movementSouthwest(currentCord, matrix) {
    if (currentCord[0] == matrix.length - 1 || currentCord[1] == 0) {
      return { value: -1 };
    }
    return {
      value: matrix[currentCord[0] + 1][[currentCord[1] - 1]],
      coord: [currentCord[0] + 1, currentCord[1] - 1],
    };
  }
  movementWest(currentCord, matrix) {
    if (currentCord[1] == 0) {
      return { value: -1 };
    }
    return {
      value: matrix[currentCord[0]][[currentCord[1] - 1]],
      coord: [currentCord[0], currentCord[1] - 1],
    };
  }

  movementNorthWest(currentCord, matrix) {
    if (currentCord[0] == 0 || currentCord[1] == 0) {
      return { value: -1 };
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

  calcScore(moveValue) {
    switch (moveValue) {
      case "0":
        return this.countPathNoRepeat * 2;
      case "B":
        return -1000;
      case "1":
        return -10;
      case "E":
        return -100;
      case "S":
        return 1000;
      case -1:
        return -10;
      default:
        console.log("moveValueError", moveValue);
    }
  }

  calculateWay(matrix) {
    let scoreMoves = 0;
    this.genes.forEach((gene) => {
      const move = this.move(gene, matrix);
      scoreMoves = scoreMoves + this.calcScore(move.value);

      if (move.value == "S") {
        scoreMoves += 1000;
        this.fitness = scoreMoves;
        return;
      }

      for (let i = 0; i < this.path.length; i++) {
        if (
          move.coord &&
          this.path[i][0] == move.coord[0] &&
          this.path[i][1] == move.coord[1]
        ) {
          this.countPathNoRepeat--;
          scoreMoves += -100;
          break;
        }
      }

      switch (move.value) {
        case "0":
          this.currentCord = move.coord;
          this.path.push(move.coord);
          this.countPathNoRepeat++;
          break;
        case "E":
          this.currentCord = move.coord;
          this.path.push(move.coord);
          this.countPathNoRepeat++;
          break;
        default:
          break;
      }
    });
    this.fitness = scoreMoves;
    return scoreMoves;
  }
}

module.exports = Chromosome;
