const Chromosome = require("./chromosome");

class Ga {
  constructor(lengthPopulation, matrix, maxFreeBlocks) {
    this.matrix = matrix;
    this.maxFreeBlocks = maxFreeBlocks;
    this.lengthPopulation = lengthPopulation;
    this.population = this.generateInitialPopulation();
    this.generation = new Array();
    this.maxFitness = null;
    this.randomChoose = -1;
    this.countChangeFitness = -Number.MAX_SAFE_INTEGER;
    console.log(this.countChangeFitness);
  }

  generateInitialPopulation() {
    let listPopulation = new Array();
    for (let i = 0; i < this.lengthPopulation; i++) {
      listPopulation.push(new Chromosome(this.maxFreeBlocks, 7));
    }
    return listPopulation;
  }

  elistism() {
    console.log("\n---- Realizando Elitismo ----m");
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
    if (this.maxFitness < this.sortedLastGen[0].fitness) {
      this.maxFitness = this.sortedLastGen[0];
      this.countChangeFitness = 0;
    } else {
      this.countChangeFitness++;
    }
    console.log("\nCromossomo Vencedor: ", this.sortedLastGen[0].fitness, "\n");
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
    console.log("----- Realizando Torneio ----- \n");
    const first = this.generation[this.generation.length - 1][firstRand];
    const second = this.generation[this.generation.length - 1][secondRand];
    console.log(
      "Primeiro Cromossomo Randômico: ",
      first.fitness,
      "\nSegundo Cromossomo Randômico: ",
      second.fitness,
      "\n"
    );
    if (first.fitness > second.fitness) {
      this.randomChoose = firstRand;
      console.log("Vencedor: ", first.fitness, "\n");
      return first;
    }

    console.log("Vencedor: ", second.fitness, "\n");
    this.randomChoose = secondRand;
    return second;
  }

  crossover() {
    console.log("----- Realizando Crossover ------\n");
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
    console.log("Crossover realizado com sucesso\n");
  }

  mutation() {
    const randChromosome = this.randomIntFromInterval(
      1,
      this.population.length - 1
    );
    const positionGene = this.randomIntFromInterval(0, this.maxFreeBlocks - 1);
    const randGene = this.randomIntFromInterval(0, 7);
    console.log("---- Realizando mutação ----- \n");
    console.log("Cromossomo escolhido: ", randChromosome);
    console.log("Posição do Gene: ", randGene);
    console.log("Valor do Gene: ", randGene, "\n");
    this.population[randChromosome].getChromosome()[positionGene] = randGene;
  }

  calculateFitness() {
    console.log("----- Calculando aptidão -----\n");
    for (let i = 0; i < this.population.length; i++) {
      console.log("\nCromossomo ", i, ": ");
      this.population[i].calculateWay(this.matrix);
      console.log("Qualidade Heurística: ", this.population[i].fitness);
    }
  }

  verifySolution() {
    let foundExit = false;
    while (this.countChangeFitness <= 500 && !foundExit) {
      this.calculateFitness();
      this.population.forEach((chromosome, index) => {
        if (chromosome.exit && !foundExit) {
          console.log("\nCaminho encontrado!!!");
          console.log("Caminho AG: ", chromosome.getPath());
          console.log("Qualide Heurística: ", chromosome.fitness);
          foundExit = true;
        }
      });

      if (!foundExit) {
        this.generation.push(this.population);
        console.log(`\n-----Geração ${this.generation.length - 1}-----\n`);
        this.population.forEach((cromossome, index) => {
          console.log(
            `Cromossomo ${index}: \n`,
            "Caminho: ",
            cromossome.path,
            "\n Genes: ",
            cromossome.genes
          );
        });
        this.population = new Array();
        const elistism = this.elistism();
        this.population.push(elistism);

        this.crossover();
        this.mutation();
      }
    }
    if (!foundExit) {
      console.log("\nCaminho NÃO encontrado!!!");
      console.log("Caminho AG incompleto: \n", this.maxFitness.path);
      console.log("Qualidade Heurística: ", this.maxFitness.fitness);
    }
  }
}

module.exports = Ga;
