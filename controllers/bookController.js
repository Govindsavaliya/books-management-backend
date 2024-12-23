const BookModel = require("../models/book.model");
const { HttpStatus } = require("../utils/httpStatusCode");
const { ResponseMessage } = require("../utils/responseMessage");

exports.getBooksAction = async (req, res) => {
    try {
        const booksData = await BookModel.find({});

        if (booksData.length <= 0) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: ResponseMessage.books_not_found,
                status: HttpStatus.NOT_FOUND,
                success: false,
                data: {},
            });
        }

        return res.status(HttpStatus.OK).json({
            message: ResponseMessage.books_retrieved_successfully,
            status: HttpStatus.OK,
            success: true,
            data: booksData,
        });
    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            data: {},
        });
    }
}

exports.addBookAction = async (req, res) => {
    try {
        const { title, author } = req.body;

        const newBookDetails = new BookModel({ title, author });
        await newBookDetails.save();

        return res.status(HttpStatus.CREATED).json({
            message: ResponseMessage.book_added_successfully,
            status: HttpStatus.CREATED,
            success: true,
            data: newBookDetails,
        });

    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            data: {},
        });
    }
}