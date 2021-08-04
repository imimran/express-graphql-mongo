const {
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLObjectType
} = require("graphql");

const _ = require('lodash')

var book = [
    {name: "js-book", genre:"IT", id:"1", authorId: "1"},
    {name: "py-book", genre:"IT", id:"2", authorId: "2"},
    {name: "go-book", genre:"Programming", id:"3", authorId: "3"},
    {name: "java-book", genre:"IT", id:"4", authorId: "2"},
    {name: "php-book", genre:"Programming", id:"5", authorId: "3"},
    {name: "react-book", genre:"IT", id:"6", authorId: "3"},
]

var author = [
    {name: "Imran", age: 29, id:"1"},
    {name: "Atia", age: 29, id:"2"},
    {name: "Humayra", age: 30, id:"3"},
]
  

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log("parent", parent);
                return _.find(author, {id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(book, { authorId: parent.id })
            }
            
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                console.log(typeof( args.id));
                //code to get data from db/other
               return _.find(book, {id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(author, { id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve() {
                return book
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve() {
                return author
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})