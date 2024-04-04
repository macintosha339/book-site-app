const Book = require("../models/Book.js");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

// Book Type
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    year: { type: GraphQLInt },
    genre: { type: GraphQLString },
    author: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find();
      },
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Добавление книги
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        year: { type: GraphQLNonNull(GraphQLInt) },
        genre: { type: GraphQLNonNull(GraphQLString) },
        author: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(_, { key, name, year, genre, author }) {
        const book = new Book({
          name,
          year,
          genre,
          author,
        });

        return book.save();
      },
    },
    // Удаление книг
    deleteBooks: {
      type: GraphQLList(BookType),
      args: {
        ids: {
          type: GraphQLNonNull(GraphQLList(GraphQLID)),
        },
      },
      resolve: async (_, { ids }) => {
        const deletedBooks = await Book.find({ _id: { $in: ids } });
        await Book.deleteMany({ _id: { $in: ids } });
        return deletedBooks;
      },
    },
    // Изменение существующей книги
    updateBook: {
      type: BookType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        year: { type: GraphQLInt },
        genre: { type: GraphQLString },
        author: { type: GraphQLString },
      },
      resolve(_, { id, name, year, genre, author }) {
        return Book.findByIdAndUpdate(
          id,
          {
            $set: {
              name,
              year,
              genre,
              author,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
