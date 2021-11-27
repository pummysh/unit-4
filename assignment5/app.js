const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const connect = () => {
    return mongoose.connect(" mongodb://127.0.0.1:27017/test");
};

const sectionSchema = new mongoose.Schema(
    {
        section: { type: String, required: true }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const section = mongoose.model("section", sectionSchema);

const userSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true }
    },
    {
        versionKey: false,
        timestamps: true,
    }

);

const user = mongoose.model("user", userSchema);


const bookSchema = new mongoose.Schema(
    {
        body: { type: String, required: true },
        section_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "section",
            required: true,
        },
        author_id: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "author"
            }
        ],
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const book = mongoose.model("book", bookSchema);

const authorSchema = new mongoose.Schema({
    author: { type: String, required: true }
});

const author = mongoose.model("author", authorSchema);

app.post("/author", async (req, res) => {
    try {
        const authors = await author.create(req.body);

        return res.status(201).send({ authors });
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

app.get("/author", async (req, res) => {
    try {
        const authors = await author.find({}).lean().exec();
        return res.send({ authors })

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

///////////////////////////////////////////////////////////////////////////////////

app.post("/user", async (req, res) => {
    try {
        const users = await user.create(req.body);

        return res.status(201).send({ users });
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

app.get("/user", async (req, res) => {
    try {
        const users = await user.find({}).lean().exec();
        return res.send({ users })

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

/////////////////////////////////////////////////////////////////
app.post("/book", async (req, res) => {
    try {
        const books = await book.create(req.body);

        return res.status(201).send({ books });
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

app.get("/book", async (req, res) => {
    try {
        const books = await book.find({}).lean().exec();
        return res.send({ books })

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

app.get("/book/checkedout", async (req, res) => {
    try {
        const books = await book.find({ user_id: { $exists: true } }).lean().exec()
        return res.send({ books })

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

app.get("/book/:author", async (req, res) => {

    try {
        const books = await book.find().populate("author_id").lean().exec();
        a1=[]
        for(let i=0; i<books.length; i++) {
            let author_id = books[i].author_id;
            for(let j=0; j<author_id.length; j++) {
                if(author_id[j].author===req.params.author){
                    a1.push(books[i]);
                }
            }
        }
        return res.send(a1)

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

app.get("/book/section/:section", async (req, res) => {
    try {
        const books = await book.find().populate("section_id").lean().exec()
        a1=[]
        console.log(books)
        for(let i=0; i<books.length; i++) {
            let section_id = books[i].section_id;

                if(section_id.section===req.params.section){
                    a1.push(books[i]);
                }

        }
        return res.send(a1)

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

app.get("/books/user/:section", async (req, res) => {
    try {
        const books = await book.find({ user_id: { $exists: false } }).populate("section_id").lean().exec()
        console.log(books)
        a1 = []
        for (let i = 0; i < books.length; i++) {
            let section_id = books[i].section_id;

            if (section_id.section === req.params.section) {
                a1.push(books[i]);
            }

        }
        return res.send(a1)

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

app.get("/books/:author/:section", async (req, res) => {
    try {
        const books = await book.find().populate("section_id").lean().exec()
        console.log(books)
        a1 = []
        console.log(req.params.author)
        for (let i = 0; i < books.length; i++) {
            let section_id = books[i].section_id;
            let author = books[i].author_id;
            if (section_id.section === req.params.section) {
                for(let j = 0; j < author.length; j++){
                    if(author[i]===req.params.author){
                        console.log(books[i])
                        a1.push(books[i]);
                    }
                }
            }

        }
        return res.send(a1)
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

//--------------for sections--------------------------------

app.post("/sections", async (req, res) => {
    try {
        const sections = await section.create(req.body);

        return res.status(201).send(sections);
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

app.get("/sections", async (req, res) => {
    try {
        const sections = await section.find({}).lean().exec();
        return res.send({ sections })

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

const start = async () => {
    await connect();
    app.listen(2283, () => {
        console.log('listening on port 2233')
    })
}

start();