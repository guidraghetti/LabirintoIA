function randomBetween(min, max) {
  const randomNumber = Math.random() * (max - min) + min;
  return Math.round(randomNumber, 0);
}

class Chromosome {
  constructor(maxLength, genesLenght) {
    this.genesLenght = genesLenght;
    this.maxLength = maxLength;
    this.genes = this.generateChromosome();
  }

  randomBetween(min, max) {
    const randomNumber = Math.random() * (max - min) + min;
    return Math.round(randomNumber, 0);
  }

  getChromosome() {
    return this.genes;
  }

  generateChromosome() {
    let listGenes = new Array(this.maxLength).fill(0);

    return listGenes.map((gene) => (gene = randomBetween(0, 7)));
  }
}

module.exports = Chromosome;
