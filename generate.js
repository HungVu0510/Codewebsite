var faker = require('faker');

var database = { products: [], users: [], orders: []};

database.users.push({
    id: 1,
    name: "Admin",
    username: "admin",
    password: "123456",
    role: "ADMIN",
    token: "token1"
});

for (var i = 1; i<= 10; i++) {
    database.products.push({
        id: i,
        name: faker.commerce.productName(),
        description: faker.lorem.sentences(),
        price: faker.commerce.price(),
        imageUrl: "https://source.unsplash.com/1600x900/?product",
        quantity: faker.random.number()
    });
    database.users.push({
        id: i + 1,
        username: "user" + (i + 1),
        name: "User " + (i + 1),
        password: "123456",
        role: "CUSTOMER",
        token: "token" + (i + 1),
        email: "user" + (i + 1) + "@gmail.com",
        phone: "012345678" + i,
        address: "address" + i
    });
    database.orders.push({
        id: i + 1,
        userId: (i + 1),
        productId: i,
        quantity: i + 2
    });
}

console.log(JSON.stringify(database));
