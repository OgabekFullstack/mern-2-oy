const fs = require("fs").promises 
const path = require("path")
const slugify = require("slugify")

module.exports = class BookController {
    static async BooksGet(req, res) {
        let dbPath = path.join(__dirname, "..", "db", "database.json")
        let db = await fs.readFile(dbPath, "utf-8")
        db = await JSON.parse(db)
        let books = db.books

        res.status(200).json({
            ok: true,
            books
        })
    }

    static async BooksPost(req, res) {
        let { name, year, author } = req.body
        let dbPath = path.join(__dirname, "..", "db", "database.json")
        let db = await fs.readFile(dbPath, "utf-8")
        db = await JSON.parse(db)
        
        let slug = slugify(name, { remove: /[*+~.()'"!:@]/g })

        let book = db.books.find(el => el.slug === slug)

        if(book) {
            res.status(400).json({
                ok: false,
                message: "Book aready exists"
            })
            return
        }
        
        let addBook = {
            id: db.books.length + 1,
            name,
            year,
            author,
            slug
        }

        db.books.push(addBook)
        await fs.writeFile(dbPath, JSON.stringify(db))

        res.status(201).json({
            ok: true,
            message: "created book",
            addBook
        })

    }

    static async BookGet(req, res) {
        let {slug} = req.params

        let dbPath = path.join(__dirname, "..", "db", "database.json")
        let db = await fs.readFile(dbPath, "utf-8")
        db = await JSON.parse(db)

        let book = db.books.find(el => el.slug === slug)

        if(!book) {
            res.status(401).json({
                ok: false,
                message: "Invalid book slug"
            })
            return
        }

        res.status(200).json({
            ok: true,
            message: "kitob topildi",
            book
        })
    }
    static async BookPatch(req, res) {
        let dbPath = path.join(__dirname, "..", "db", "database.json")
        let db = await fs.readFile(dbPath, "utf-8")
        db = await JSON.parse(db)

        let slug = slugify(req.params.slug, {remove: /[*+~.()'"!:@]/g, lower: true})

        let book = db.books.find(el => el.slug === slug)

        if(!book) {
            res.status(400).json({
                ok: false,
                message: "Invalid book"
            })
            return
        }

        book = {...book, ...req.body}

        let bookIndex = db.books.findIndex(el => el.slug === book.slug)

        if(req.body.name) {
            book.slug = slugify(req.body.name, {remove: /[*+~.()'"!:@]/g, lower: true})
        }

        db.books[bookIndex] = book

        await fs.writeFile(dbPath, JSON.stringify(db))

        res.status(200).json({
            ok: true,
            message: "patch book",
            book
        })
    }
    static async BookDelete(req, res) {
        let dbPath = path.join(__dirname, "..", "db", "database.json")
        let db = await fs.readFile(dbPath, "utf-8")
        db = await JSON.parse(db)

        let slug = slugify(req.params.slug, {remove: /[*+~.()'"!:@]/g, lower: true})

        let book = db.books.find(el => el.slug === slug)

        if(!book) {
            res.status(400).json({
                ok: false,
                message: "Invalid book"
            })
            return
        }

        let bookIndex = db.books.findIndex(el => el.slug === book.slug)

        db.books.splice(bookIndex, 1)

        await fs.writeFile(dbPath, JSON.stringify(db))

        res.status(200).json({
            ok: true,
            message: "delete book",
            books: db.books
        })
    }
}