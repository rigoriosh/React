import { useFetchGifs } from "../hooks/useFetchGifs";
import { GifItem } from "./GifItem";

export const GitGrid = ({category}) => {

  const { imagenes, isLoading } = useFetchGifs(category);

  return (
    <>
      <h3>{category}</h3>
      {
        isLoading && (<h2>Cargando</h2>)
      }
      <div className="card-grid">
        {
          imagenes.map(img => (
            <GifItem key={img.id} {...img}/>
            // <li key={img.id}>{img.title}</li>
          ))
        }
      </div>
    </>
  )
}
