const { Category } = require("./models/category");

const { Book } = require("./models/book");

const mongoose = require("mongoose");

const config = require("config");



const data = [

  {

    name: "Programing",

    books: [

      { title: "Simple Code", numberInStock: 5, dailyRentalRate: 2 },

      { title: "Code Secret", numberInStock: 8, dailyRentalRate: 2 },

      { title: "Coding with style", numberInStock: 5, dailyRentalRate: 2 }

    ]

  },

  {

    name: "Statistic",

    movies: [

      { title: "Todays Statistic", numberInStock: 5, dailyRentalRate: 2 },

      { title: "Statistic and Coding", numberInStock: 8, dailyRentalRate: 2 },

      { title: "The Theory", numberInStock: 15, dailyRentalRate: 2 }

    ]

  }

];



async function sampleDB() {

  await mongoose.connect(config.get("db"));



  await Book.deleteMany({});

  await Category.deleteMany({});



  for (let category of data) {

    const { _id: categoryId } = await new Genre({ name: category.name }).save();

    const books = category.books.map(book => ({

      ...book,

      category: { _id: categoryId, name: catgory.name }

    }));

    await Book.insertMany(books);

  }



  mongoose.disconnect();



  console.info("Done!");

}



sampleDB();