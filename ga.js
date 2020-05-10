const Chromosome = require("./chromosome");

class Ga {
  constructor(lengthPopulation, matrix, maxFreeBlocks) {
    this.matrix = matrix;
    this.maxFreeBlocks = maxFreeBlocks;
    this.lengthPopulation = lengthPopulation;
    this.population = this.generateInitialPopulation();
    this.generation = new Array();
    this.listFitness = new Array().fill(0);
    this.maxFitness = 0;
  }

  generateInitialPopulation() {
    let listPopulation = new Array();
    for (let i = 0; i < this.lengthPopulation; i++) {
      listPopulation.push(new Chromosome(this.maxFreeBlocks, 7));
    }
    return listPopulation;
  }

  elistism() {
    const compare = (a, b) => {
      if (a.fitness < b.fitness) {
        return 1;
      }

      if (a.fitness > b.fitness) {
        return -1;
      }

      return 0;
    };
    this.sortedLastGen = this.generation[this.generation.length - 1].sort(
      compare
    );
    if (
      this.maxFitness === 0 ||
      this.maxFitness < this.sortedLastGen[0].fitness
    ) {
      this.maxFitness = this.sortedLastGen[0].fitness;
    }

    return this.sortedLastGen[0];
  }

  calculateFitness() {
    let listFit = new Array();
    for (let i = 0; i < this.population.length; i++) {
      console.log("\n\n", "---Cromossomo ", i, " -----");
      listFit.push(this.population[i].calculateWay(this.matrix));
      console.log(
        this.population[i].path,
        this.population[i].countPathNoRepeat,
        "\n"
      );
    }
    console.log("\nLista Final:", listFit);
    return listFit;
  }

  verifySolution() {
    this.listFitness = this.calculateFitness();
    if (this.listFitness.includes(1000)) {
      this.listFitness.forEach((fitness, index) => {
        if (fitness == 1000) {
          console.log("Exit Path: ", this.population[index].getPath());
        }
      });
    } else {
      this.generation.push(this.population);
      this.population = new Array();
      this.population.push(this.elistism());
      console.log(this.maxFitness);
    }
  }
}

module.exports = Ga;
