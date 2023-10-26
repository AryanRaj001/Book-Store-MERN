import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
// import {Book} from "./models/bookModel.js";
import booksRoutes from "./routes/booksRoutes.js"
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
// OPtion 1: Allow All Origins with Default of cors(*)
// app.use(cors());
//Option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );
//Option 2: Allow Custom Origins
app.use(
    cors({
        origin: ['https://deploy-mern-1whq.vercel.app'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
        credentials: true
    })
);

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack Tutorial')
});

// // Route for Saving a New Book
// app.post('/books', async (request, response) => {
//     try {
//         if(
//             !request.body.title ||
//             !request.body.author ||
//             !request.body.publishYear
//         ) {
//             return response.status(400).send({
//                 message: 'Send all required fields: title, author, publishYear',
//             });
//         }
//         const newBook = {
//             title: request.body.title,
//             author: request.body.author,
//             publishYear: request.body.publishYear,
//         };

//         const book = await Book.create(newBook);

//         return response.status(201).send(book);
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({message: error.message});
//     }
// });

// //Route for Get All Books from Database
// app.get('/books', async (request, response) => {
//     try {
//         const books = await Book.find({});
        
//         return response.status(200).json({
//             count: books.length,
//             data: books
//         });
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({message: error.message});
//     }
// });

// //Route for Get one Book from Database by ID
// app.get('/books/:id', async (request, response) => {
//     try {

//         const { id } = request.params;

//         const book = await Book.findById( id );
        
//         return response.status(200).json(book);
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({message: error.message});
//     }
// });

// //Route for updatng a book
// app.put('/books/:id', async (request, response) => {
//     try {
//         if(
//             !request.body.title ||
//             !request.body.author ||
//             !request.body.publishYear
//         ) {
//             return response.status(400).send({
//                 message: 'Send all required fields: title, author, publishYear',
//             });
//         }

//         const { id } = request.params;

//         const result = await Book.findByIdAndUpdate(id, request.body);

//         if(!result){
//             return response.status(404).json({ message: 'Book not found' });
//         }

//         return response.status(200).send({ message: 'Book updated successfully' });

//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({message: error.message});
//     }
// });

// //Rout to delete a book
// app.delete('/books/:id', async (request, response) => {
//     try {
//         const { id } = request.params;

//         const result = await Book.findByIdAndDelete(id);

//         if(!result) {
//             return response.status(404).json({ message: 'Book not found' });
//         }

//         return response.status(200).send({ message: 'Book deleted successfully' });

//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({message: error.message});
//     }
// });

app.use('/books', booksRoutes);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });