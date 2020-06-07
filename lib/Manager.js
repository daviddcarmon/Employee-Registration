const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, role, number) {
    super(name, id, email, role);
    this.number = number;
  }
  getNumber() {
    return this.number;
  }
}

module.exports = Manager;
