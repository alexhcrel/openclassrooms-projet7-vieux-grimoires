const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const booksCtrl = require("../controllers/books");

router.get("/", booksCtrl.getAll);
router.get("/bestrating", booksCtrl.getBestRated);
router.get("/:id", multer, booksCtrl.getOne);
router.post("/", multer, booksCtrl.createBook);
router.put("/:id", multer, booksCtrl.modify);
router.delete("/:id", booksCtrl.delete);
router.post("/:id/rating", booksCtrl.bookRating);

module.exports = router;
