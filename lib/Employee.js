// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, email) {
        Employee.id++;
        this.name = name;
        this.id = Employee.id;
        this.email = email;
    }

    static id = 0;

    getName() {return this.name}
    getId() {return this.id}
    getEmail() {return this.email}
    getRole() {return 'Employee'}

}

module.exports = Employee;