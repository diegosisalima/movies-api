const DataTypes = require("sequelize").DataTypes;
const _episodes = require("./episodes");
const _genres = require("./genres");
const _movie_genres = require("./movie_genres");
const _movies = require("./movies");
const _seasons = require("./seasons");
const _serie_genres = require("./serie_genres");
const _series = require("./series");
const _users = require("./users");

function initModels(sequelize) {
  const episodes = _episodes(sequelize, DataTypes);
  const genres = _genres(sequelize, DataTypes);
  const movie_genres = _movie_genres(sequelize, DataTypes);
  const movies = _movies(sequelize, DataTypes);
  const seasons = _seasons(sequelize, DataTypes);
  const serie_genres = _serie_genres(sequelize, DataTypes);
  const series = _series(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  movie_genres.belongsTo(genres, { as: "genre", foreignKey: "genre_id" });
  genres.hasMany(movie_genres, { as: "movie_genres", foreignKey: "genre_id" });
  serie_genres.belongsTo(genres, { as: "genre", foreignKey: "genre_id" });
  genres.hasMany(serie_genres, { as: "serie_genres", foreignKey: "genre_id" });
  movie_genres.belongsTo(movies, { as: "movie", foreignKey: "movie_id" });
  movies.hasMany(movie_genres, { as: "movie_genres", foreignKey: "movie_id" });
  episodes.belongsTo(seasons, { as: "season", foreignKey: "season_id" });
  seasons.hasMany(episodes, { as: "episodes", foreignKey: "season_id" });
  seasons.belongsTo(series, { as: "serie", foreignKey: "serie_id" });
  series.hasMany(seasons, { as: "seasons", foreignKey: "serie_id" });
  serie_genres.belongsTo(series, { as: "serie", foreignKey: "serie_id" });
  series.hasMany(serie_genres, { as: "serie_genres", foreignKey: "serie_id" });

  return {
    episodes,
    genres,
    movie_genres,
    movies,
    seasons,
    serie_genres,
    series,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
