const Chromosome = require("./chromosome");
const fs = require("fs");
const AStarAlgorithm = require("./aStarAlgorithm");
class Ga {
  constructor(
    lengthPopulation,
    matrix,
    maxFreeBlocks,
    porcentMutation,
    fileName
  ) {
    this.matrix = matrix;
    this.maxFreeBlocks = maxFreeBlocks;
    this.lengthPopulation = lengthPopulation;
    this.output = "";
    this.population = this.generateInitialPopulation();
    this.generation = new Array();
    this.maxFitness = null;
    this.porcentMutation = porcentMutation;
    this.randomChoose = -1;
    this.countChangeFitness = -Number.MAX_SAFE_INTEGER;
    console.log(this.countChangeFitness);
    this.fileName = fileName;
  }

  generateInitialPopulation() {
    this.output += "\n---- Gerando População Inicial -----\n";
    let listPopulation = new Array();
    for (let i = 0; i < this.lengthPopulation; i++) {
      listPopulation.push(new Chromosome(this.maxFreeBlocks, 7));
    }
    this.output +=
      "\nPopulação gerada: " + JSON.stringify(listPopulation) + "\n";
    return listPopulation;
  }

  elistism() {
    console.log("\n---- Realizando Elitismo -----");
    this.output += "\n---- Realizando Elitismo ----\n";
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
      this.maxFitness === null ||
      this.maxFitness.fitness < this.sortedLastGen[0].fitness
    ) {
      this.maxFitness = this.sortedLastGen[0];
      this.countChangeFitness = 0;
    } else {
      this.countChangeFitness++;
    }
    console.log("\nCromossomo Vencedor: ", this.sortedLastGen[0].fitness, "\n");
    this.output +=
      "\nCromossomo Vencedor: " + this.sortedLastGen[0].fitness + "\n";
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
    this.output += "\n----- Realizando Torneio ----- \n";
    const first = this.generation[this.generation.length - 1][firstRand];
    const second = this.generation[this.generation.length - 1][secondRand];
    console.log(
      "Primeiro Cromossomo Randômico: ",
      first.fitness,
      "\nSegundo Cromossomo Randômico: ",
      second.fitness,
      "\n"
    );
    this.output +=
      "\nPrimeiro Cromossomo Randômico: " +
      first.fitness +
      "\nSegundo Cromossomo Randômico: " +
      second.fitness +
      "\n";
    if (first.fitness > second.fitness) {
      this.randomChoose = firstRand;
      console.log("Vencedor: ", first.fitness, "\n");
      this.output += "\nVencedor: " + first.fitness + "\n";
      return first;
    }

    console.log("Vencedor: ", second.fitness, "\n");
    this.output += "\nVencedor: " + first.fitness + "\n";
    this.randomChoose = secondRand;
    return second;
  }

  crossover() {
    console.log("----- Realizando Crossover ------\n");
    this.output += "\n----- Realizando Crossover ------\n";
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
    this.output += "\nCrossover realizado com sucesso\n";
  }

  mutation() {
    const lenghtMutations = parseInt(
      this.maxFreeBlocks * (this.porcentMutation / 100)
    );
    console.log("---- Realizando mutação ----- \n");
    this.output += "\n---- Realizando mutação ----- \n";

    for (let i = 1; i < this.population.length; i++) {
      for (let i = 0; i < lenghtMutations; i++) {
        const positionGene = this.randomIntFromInterval(
          0,
          this.maxFreeBlocks - 1
        );
        const randGene = this.randomIntFromInterval(0, 7);
        this.population[i].getChromosome()[positionGene] = randGene;
      }
    }
    console.log("Mutação concluída\n");
    this.output += "\nMutação concluída\n";
  }

  calculateFitness() {
    console.log("----- Calculando aptidão -----\n");
    this.output += "\n----- Calculando aptidão -----\n";
    for (let i = 0; i < this.population.length; i++) {
      console.log("\nCromossomo ", i, ": ");
      this.output += "\nCromossomo " + i + ":";
      this.population[i].calculateWay(this.matrix);
      console.log("Qualidade Heurística: ", this.population[i].fitness);
      this.output +=
        "\nQualidade Heurística: " + this.population[i].fitness + "\n";
    }
  }

  verifySolution() {
    let foundExit = false;
    let maxLoop = 10000;
    while (maxLoop >= 0 && this.countChangeFitness <= 50 && !foundExit) {
      this.calculateFitness();
      this.population.forEach((chromosome, index) => {
        if (chromosome.exit && !foundExit) {
          console.log("\nCaminho encontrado!!!");
          this.output += "\nCaminho encontrado!!!\n";
          this.output += "\nCromossomo: " + index + "\n";
          console.log("Caminho AG: ", chromosome.getPath());
          this.output +=
            "Caminho AG: " + JSON.stringify(chromosome.getPath()) + "\n";
          console.log("Genes: ", chromosome.getChromosome());
          console.log("Qualide Heurística: ", chromosome.fitness);
          this.output += "Qualide Heurística: " + chromosome.fitness + "\n";
          foundExit = true;
          const aStar = new AStarAlgorithm(this.matrix, this.output);
          console.log(chromosome.getPath()[chromosome.getPath().length-1])
         aStar.a_Star([0,0],chromosome.getPath()[chromosome.getPath().length-1] );
        }
      });

      if (!foundExit) {
        this.generation.push(this.population);
        console.log(`\n-----Geração ${this.generation.length - 1}-----\n`);
        this.output += `\n-----Geração ${this.generation.length - 1}-----\n`;
        this.population.forEach((cromossome, index) => {
          console.log(
            `Cromossomo ${index}: \n`,
            "Caminho: ",
            cromossome.path,
            );
          this.output += `\nCromossomo ${index}:
          \nCaminho: ${JSON.stringify(cromossome.path)}\n`;
        });
        this.population = new Array();
        const elistism = this.elistism();
        this.population.push(elistism);

        this.crossover();
        this.mutation();
      }
      maxLoop--;
    }
    if (!foundExit) {
      console.log("\nCaminho NÃO encontrado!!!");
      this.output += "\nCaminho NÃO encontrado!!!\n";
      console.log("Caminho AG incompleto: \n", this.maxFitness.path);
      this.output +=
        "\nMelhor caminho AG incompleto: \n" +
        JSON.stringify(this.maxFitness.path) +
        "\n";
      console.log("Qualidade Heurística: ", this.maxFitness.fitness);
      this.output +=
        "Melhor qualidade Heurística: " + this.maxFitness &&
        this.maxFitness.fitness + "\n";
    }
    fs.writeFileSync(
      __dirname.concat(
        `/output/${this.fileName.replace(".txt", "")}-output.txt`
      ),
      this.output
    );
  }
}

module.exports = Ga;
