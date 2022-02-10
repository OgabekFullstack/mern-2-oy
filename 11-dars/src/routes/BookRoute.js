const { BooksGet, BooksPost, BookGet, BookPatch, BookDelete } = require("../controllers/BookController")

const router = require("express").Router()

router.get("/books", BooksGet)
router.post("/books", BooksPost)
router.get("/books/:slug", BookGet)
router.patch("/books/:slug", BookPatch)
router.delete("/books/:slug", BookDelete)

module.exports = {
    path: "/api",
    router
}
