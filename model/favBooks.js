import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
    },
    coverPic: {
        type: String,
        default: ""
    },
    author: [{
        type: String,
        default: ""
    }],
    description: {
        type: String,
        default: "N/A"
    },
    publishDate: {
        type: String,
        default: ""
    },
    publisher: {
        type: String,
        default: ""
    },
    categories: [{
        type: String,
        default: ""
    }],
    pageCount: {
        type: Number,
        default: 0
    },
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
});

const FavBook = mongoose.model("FavBook", bookSchema);

export default FavBook;
