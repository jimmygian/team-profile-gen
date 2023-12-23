// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
class Intern extends Employee {

    constructor(name, email, school) {
        super(name, email);
        this.school = school;
    }

    getSchool() {return this.school}
    getRole() {return 'Intern'}
}

module.exports = Intern;