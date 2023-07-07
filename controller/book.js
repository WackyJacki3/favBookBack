import FavBook from "../model/favBooks.js";
import User from "../model/user.js";

const addFavBook = async (req, res) => {
    try {
        let { id, title, subtitle, coverPic, author, description, publishDate, publisher, categories, pageCount } = req.body;

        const { _id } = req.user;

        const user = await User.findById(_id);

        const userId = user._id;

        let imgZoom = coverPic.replace('zoom=1', 'zoom=10')
        coverPic= imgZoom;

        // check if author is an array

        const newBook = await FavBook({
            id, title, subtitle, coverPic, author, description, publishDate, publisher, categories, pageCount, userId,
        });

        await newBook.save();

        res.status(200).json({
            message: "Book added to Favourites",
            newBook: {
                title: title,
                subtitle: subtitle,
                author: author,
                publishDate: publishDate,
                publisher: publisher,
                categories: categories,
                pageCount: pageCount,
                userId: _id,
            }
        });

        console.log(newBook._id);
        const bookId = newBook._id;
        user.favBooks.push(newBook._id);
        await user.save();

    } catch (error) {
        console.log(error);
    }
}

const getFavBooks = async (req, res) => {
    const { _id } = req.user;

    let user = await User.findById(_id);

    let favBooks = await user.populate('favBooks');

    favBooks = favBooks.favBooks;

    res.status(200).json({
        favBooks
    })
};

const deleteFavBook = async (req, res) => {
    const { _id } = req.user;
    const { id } = req.body;

    try {
        
        let user = await User.findById(_id);

        user = user.favBooks;


        let post = await FavBook.findOne({ id: id});

        post = post._id;

        await FavBook.findByIdAndDelete(post);

        return res.status(200).json({
            message: `Book: ${id} is deleted!`
        });
    } catch (error) {
        console.log(`deleteFavBook ${error}`);
        return res.status(200).json({
            message: `Server error`,
        });
    }
}

export {
    addFavBook,
    getFavBooks,
    deleteFavBook,
}