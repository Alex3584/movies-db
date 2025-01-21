import { Movie } from "../../reducers/movies";
import { connect } from "react-redux";
import { RootState } from "store";
import { MovieCard } from "./MovieCard";
import styles from "./Movies.module.scss";

interface Props {
  movies: Movie[];
}

function Movies({ movies }: Props) {
  return (
    <section>
      <div className={styles.list}>
        {movies.map((m) => (
          <MovieCard
            id={m.id}
            title={m.title}
            overview={m.overview}
            popularity={m.popularity}
          />
        ))}
      </div>
    </section>
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
});

const connector = connect(mapStateToProps);

export default connector(Movies);
