const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    email: 'john.doe@example.com',
    address: '123 Main St',

    // Method to get the full name
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    },

    // Method to update the email
    updateEmail(newEmail) {
        this.email = newEmail;
    },

    // Method to retrieve the age
    getAge() {
        return this.age;
    },

    // Method to update the address
    updateAddress(newAddress) {
        this.address = newAddress;
    },

    // Method to get all details
    getDetails() {
        return `Name: ${this.getFullName()}, Age: ${this.age}, Email: ${this.email}, Address: ${this.address}`;
    }
};

// Example usage and displaying in the HTML
document.getElementById('fullName').innerText = person.getFullName();
person.updateEmail('new.email@example.com');
document.getElementById('details').innerText = person.getDetails();
