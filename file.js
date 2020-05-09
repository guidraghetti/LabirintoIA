const fs = require("fs");

class File {
  constructor(name) {
    this.name = name;
  }

  read() {
    return fs.readFileSync(this.name, "utf8");
  }

  content() {
    return this.read().trim().split("\n");
  }
}

module.exports = File;
