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
    this.randomChoose = -1;
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
      this.maxFitness = this.sortedLastGen[0];
    }

    return this.sortedLastGen[0];
  }

  randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  tournament() {
    let firstRand;
    while (true) {
      firstRand = this.randomIntFromInterval(
        0,
        this.generation[this.generation.length - 1].length - 1
      );
      if (firstRand != this.randomChoose) {
        break;
      }
    }
    let secondRand;

    while (true) {
      secondRand = this.randomIntFromInterval(
        0,
        this.generation[this.generation.length - 1].length - 1
      );
      if (firstRand != secondRand && this.randomChoose != secondRand) {
        break;
      }
    }
    const first = this.generation[this.generation.length - 1][firstRand];
    const second = this.generation[this.generation.length - 1][secondRand];

    if (first.fitness > second.fitness) {
      this.randomChoose = firstRand;
      return first;
    }

    this.randomChoose = secondRand;
    return second;
  }

  crossover() {
    const sons = [];
    for (
      let i = 0;
      i < (this.generation[this.generation.length - 1].length - 1) / 2;
      i++
    ) {
      const cutPoint = this.randomIntFromInterval(0, this.maxFreeBlocks - 1);

      const father = this.tournament();
      const mother = this.tournament();

      const fatherGenes = [...father.getChromosome()];
      const motherGenes = [...mother.getChromosome()];

      const cutFather = fatherGenes.splice(cutPoint, this.maxFreeBlocks);
      const cutMother = motherGenes.splice(0, cutPoint);
      const son1 = new Chromosome(this.maxFreeBlocks, 7);
      son1.setChomosome(cutFather.concat(cutMother));
      sons.push(son1);
      const son2 = new Chromosome(this.maxFreeBlocks, 7);
      son2.setChomosome(cutMother.concat(cutFather));
      sons.push(son2);
    }
    this.population.push(...sons);
  }

  mutation() {
    const randChromosome = this.randomIntFromInterval(
      1,
      this.population.length - 1
    );
    const positionGene = this.randomIntFromInterval(0, this.maxFreeBlocks - 1);
    const randGene = this.randomIntFromInterval(0, 7);
    this.population[randChromosome].getChromosome()[positionGene] = randGene;
  }

  calculateFitness() {
    let listFit = new Array();
    for (let i = 0; i < this.population.length; i++) {
      console.log("\n\n", "---Cromossomo ", i, "------");
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
    let maxLoop = 10000;
    while (maxLoop) {
      this.listFitness = this.calculateFitness();
      if (this.listFitness.includes(1000)) {
        this.listFitness.forEach((fitness, index) => {
          if (fitness == 1000) {
            console.log("Caminho AG: ", this.population[index].getPath());
            maxLoop = 0;
          }
        });
      } else {
        this.generation.push(this.population);
        this.population = new Array();
        this.population.push(this.elistism());
        console.log("Caminho AG incompleto: \n", this.maxFitness);
        this.crossover();
        this.mutation();
        maxLoop--;
      }
    }
  }
}

module.exports = Ga;
