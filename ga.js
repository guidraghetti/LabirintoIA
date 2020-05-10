const Chromosome = require("./chromosome");

class Ga {
  constructor(lengthPopulation, matrix, maxFreeBlocks) {
    this.matrix = matrix;
    this.maxFreeBlocks = maxFreeBlocks;
    this.lengthPopulation = lengthPopulation;
    this.population = this.generateInitialPopulation();
    this.listFitness = new Array().fill(0);
  }

  generateInitialPopulation() {
    let listPopulation = new Array();
    for (let i = 0; i < this.lengthPopulation; i++) {
      listPopulation.push(new Chromosome(this.maxFreeBlocks, 7));
    }
    console.log("Cromossomos: \n", listPopulation, "\n\n\n");
    return listPopulation;
  }

  calculateFitness() {
    let listFit = new Array();
    for (let i = 0; i < this.population.length; i++) {
      console.log(`\n ----- Cromossomo  posição: ${i} ----- \n`);
      listFit.push(this.population[i].calculateWay(this.matrix));
    }
    console.log("\n\n\nLista Final ", listFit);
    return listFit;
  }

  verifySolution() {
    this.listFitness = this.calculateFitness();
    if (this.listFitness.includes("Exit")) {
      this.listFitness.forEach((fitness, index) => {
        if (fitness == "Exit") {
          console.log("Exit: ", this.population[index].getPath());
        }
      });
    } else {
      console.log("todo resto");
    }
  }
}

module.exports = Ga;
