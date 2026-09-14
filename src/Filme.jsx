import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);

  useEffect(() => {
    async function buscarFilme() {
      const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
      const dados = await response.json();
      setFilme(dados);
    }
    buscarFilme();
  }, [id]);

  return (
    <div>
      <img src={filme.image?.medium} alt={filme.name} />
      <p>
        {filme.id}
    </p>
      <h2>
        {filme.name}
      </h2>
      <p>
        {filme.genres}
      </p>
      <p>
      {filme.average}
      </p>
    <div>
    
    </div>
      
    </div>
  );
}