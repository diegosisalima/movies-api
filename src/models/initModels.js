const Users = require("./users.models");
const Movies = require("./movies.models");
const Episodes = require("./episodes.models");
const Genres = require("./genres.models");
const MovieGenres = require("./movie_genres.models");
const Seasons = require("./seasons.models");
const SerieGenres = require("./serie_genres.models");
const Series = require("./series.models");

const initModels = () => {
  //? Users
  Users;

  //? Movies <-> Genres - MovieGenres
  Movies.belongsToMany(Genres, { through: MovieGenres });
  Genres.belongsToMany(Movies, { through: MovieGenres });

  //? Series <-> Genres - SerieGenres
  Series.belongsToMany(Genres, { through: SerieGenres });
  Genres.belongsToMany(Series, { through: SerieGenres });

  //? Series -> Seasons
  Series.hasMany(Seasons);
  Seasons.belongsTo(Series);

  //? Seasons -> Episodes
  Seasons.hasMany(Episodes);
  Episodes.belongsTo(Seasons);
};

module.exports = initModels;
