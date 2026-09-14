import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiFilmProjector, GiFilmSpool } from "react-icons/gi";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail, MdOutlineStar } from "react-icons/md";
import { RiInstagramFill, RiBookmarkLine, RiBookmarkFill } from "react-icons/ri";
import "./Filme.css";

const GENEROS = ["Action", "Comedy", "Drama", "Horror", "Romance", "Science-Fiction", "Thriller"];

export default function CardFilme() {
  const [filmes, setFilmes] = useState([]);
  const [busca, setBusca] = useState("");
  const [genero, setGenero] = useState("");
  const [salvos, setSalvos] = useState([]);

  useEffect(() => {
    async function buscarFilmes() {
      const response = await fetch("https://api.tvmaze.com/shows?page=1");
      const dados = await response.json();
      setFilmes(dados.slice(0, 102));
    }
    buscarFilmes();
  }, []);

  function handleSave(id) {
    setSalvos((prev) =>
      prev.includes(id) ? prev.filter((filmeId) => filmeId !== id) : [...prev, id]
    );
  }

  const filmesfiltrados = filmes.filter((filme) => {
    const bateBusca = filme.name.toLowerCase().includes(busca.toLowerCase());
    const bateGenero = genero === "" || filme.genres?.includes(genero);
    return bateBusca && bateGenero;
  });

  return (
    <div>
      <header className="cabecalho">
        <h1>
          CINEWOODY <GiFilmSpool />
        </h1>
        <div className="bordas">
          <Link to="/CardFilme" className="link center">Home</Link>
        </div>
        <div className="bordas">
          <Link to="/premium" className="link">Premium</Link>
        </div>
        <input
          type="text"
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
          className="pesquisa"
          name="pesquisa"
          id="pesquisa"
          placeholder="pesquise seu filme"
        />
        <select 
          value={genero} 
          onChange={(e) => setGenero(e.target.value)}
          className="pesquisa"
        >
          <option value="">Generos</option>
          {GENEROS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </header>

      <br />
      <h2>
        FILMES E SERIES <GiFilmProjector />
      </h2>
      <br />

      <div className="grid">
        {filmesfiltrados.map((filme) => (
          <div key={filme.id} className="card borda">
            <p className="nota">
              <MdOutlineStar className="estrela" />
              {filme.rating?.average || " SEM NOTA"}
            </p>
            
            <img src={filme.image?.medium} alt={filme.name} />
            <h2>{filme.name}</h2>
            
            <div className="gray">
              <p>{filme.genres?.join(", ")}</p>
            </div>
            
            <div>
              <p className="sinopse">Sinopse</p>
              <div className="texto">
                <p>{filme.summary?.replace(/<[^>]*>?/gm, "")}</p>
              </div>

              {salvos.includes(filme.id) ? (
                <RiBookmarkFill onClick={() => handleSave(filme.id)} />
              ) : (
                <RiBookmarkLine onClick={() => handleSave(filme.id)} />
              )}
            </div>
          </div>
        ))}
      </div>

      <footer>
        <h3><IoLogoWhatsapp /> (22)9982823345</h3>
        <h3><MdEmail /> cinewoody@gmail.com</h3>
        <h3><RiInstagramFill /> Cinewoody</h3>
        <h4>Todos os direitos reservados ao cinewoody</h4>
      </footer>
    </div>
  );
}