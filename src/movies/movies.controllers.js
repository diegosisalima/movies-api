const Movies = require("../models/movies.models");
const Movie_genres = require("../models/movie_genres.models.js");
const uuid = require("uuid");
const Genres = require("../models/genres.models");
const { Op } = require("sequelize");

const findAllMovies = (limit, offset, search) => {
  //limit: cuantos quiero mosta; offset: donde empiezo a mostrar
  const queryOptions = {
    limit: limit,
    offset: offset,
    where: {},
  };
  if (search) {
    queryOptions.where = {
      title: {
        [Op.iLike]: `%${search}%`,
      },
    };
  }
  const data = Movies.findAndCountAll(queryOptions);
  return data;
};
const createMovie = async (movieObj) => {
  const newMovie = {
    id: uuid.v4(),
    title: movieObj.title,
    synopsis: movieObj.synopsis,
    releaseYear: movieObj.releaseYear,
    director: movieObj.director,
    duration: movieObj.duration,
    trillerUrl: movieObj.trillerUrl,
    coverUrl: movieObj.coverUrl,
    movieUrl: movieObj.movieUrl,
    classification: movieObj.classification,
    rating: movieObj.rating,
  };
  const data = await Movies.create(newMovie);
  return data;
};

const addGenreToMovie = async (body) => {
  const data = await Movie_genres.create({
    id: uuid.v4(),
    movieId: body.movieId,
    genreId: body.genreId,
  });
  return data;
};

const findAllMoviesByGenre = async (genreId) => {
  const data = await Movies.findAll({
    include: {
      model: Genres,
      where: {
        id: genreId,
      },
    },
  });
  return data;
};

module.exports = {
  findAllMovies,
  createMovie,
  addGenreToMovie,
  findAllMoviesByGenre,
};
