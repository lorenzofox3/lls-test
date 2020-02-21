const faker = require('faker');

const students = [];
let count = 200;

while (--count >= 0) {
    students.push({
        id: count,
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        birthDate: faker.date.between(new Date(2010, 0), new Date(2000, 0)),
        bio: faker.lorem.paragraph(),
        avatar: faker.image.avatar()
    });
}

console.log(JSON.stringify(students));
