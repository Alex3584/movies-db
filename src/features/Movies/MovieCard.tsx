import { Link } from "react-router-dom";

import "./Movies.css"

interface MovieCardProps {
  id: number;
  title: string;
  overview: string;
  popularity: number;
 }


export function MovieCard({id, title, overview, popularity }: MovieCardProps) {
  return (
    <div className="movies-card">
      <Link to={`/movies/${id}`}>{title}</Link>
      <div className="movies-card-overview">{overview}</div>
      <div className="movies-card-popularity">{popularity}</div>
    </div>
  );
}