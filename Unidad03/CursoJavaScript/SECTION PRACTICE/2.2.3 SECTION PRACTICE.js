//Question 1
let ticket = {
    from: "Berlin",
    to: "Potsdam",
    price: 11
};

console.log(`Ticket from: ${ticket.from}`);
console.log(`Ticket to: ${ticket.to}`);
console.log(`Ticket price: ${ticket.price}`);

//Question 2
let person = {};
person.name = "Mary";
person.surname = "Stuart";

// Mostramos cada campo de forma individual en la consola
console.log(person.name);
console.log(person.surname);

//Question 3
let books = [
    {
        title: "Speaking JavaScript",
        author: "Axel Rauschmayer",
        pages: 460
    },
    {
        title: "Programming JavaScript Applications",
        author: "Eric Elliot",
        pages: 254
    },
    {
        title: "Understanding ECMAScript 6",
        author: "Nicholas C. Zakas",
        pages: 352
    }
];

//Question 4
let newBook = {
    title: "Learning JavaScript Design Patterns",
    author: "Addy Osmani",
    pages: 254
};

books.push(newBook);

console.log(books.length);
console.log(books[0].title);
console.log(books[1].title);
console.log(books[2].title);
console.log(books[3].title);

//Question 5
let selectedBooks = books.slice(-2);

//Question 6
books.shift();
console.log(books.length);
console.log(books[0].title);
console.log(books[1].title);
console.log(books[2].title);
//Question 7
let sum = books[0].pages + books[1].pages + books[2].pages;
console.log(sum);

