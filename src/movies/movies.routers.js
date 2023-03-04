const router = require("express").Router();
const moviesServices = require("./movies.services.js");
const upload = require("../utils/multer.js");

router
  .route("/")
  .get(moviesServices.getAllMovies)
  .post(upload.single("movieVideo"), moviesServices.postMovie);

router.get("/genres/:genreId", moviesServices.getAllMoviesByGenre);
router.post("/:movieId/genre/:genreId", moviesServices.postGenreToMovie);

module.exports = router;
