import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiFilmProjector } from "react-icons/gi";
import { GiFilmSpool } from "react-icons/gi";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { RiBookmarkLine, RiBookmarkFill } from "react-icons/ri";
import { MdOutlineStar } from "react-icons/md";
import "./Filme.css";
export default function CardFilme() {
  const [filmes, setFilmes] = useState([]);
  useEffect(() => {
    async function buscarFilmes() {
      const response = await fetch("https://api.tvmaze.com/shows?page=1");
      const dados = await response.json();
      setFilmes(dados.slice(0, 102));
    }
    buscarFilmes();
  }, []);
  const [isSaved, setIsSaved] = useState(false);
  function handleSave() {
    setIsSaved((isSaved) => !isSaved);
  }

  const [busca, setBusca] = useState('');
  const filmesfiltrados = filmes.filter((filme) => 
    filme.name.toLowerCase().startsWith(busca.toLowerCase())
  );

  return (
    <div>
      <header className="cabecalho">
        <h1>CINEWOODY  <GiFilmSpool /></h1>
         <button className='center'> <Link to="/CardFilme" className='link'>Home</Link></button> 
  <button> <Link to="/premium" className="link">Premium</Link></button> 
        <input 
          type="text" 
          value={busca} 
          onChange={(evento) => setBusca(evento.target.value)} 
          className="pesquisa"  
          name="pesquisa" 
          id="pesquisa" 
          placeholder="pesquise seu filme"
        />
        <ul>
          {filmesfiltrados.map((filme) => (
            <div key={filme.id}></div> 
          ))}
        </ul>
      </header>
      <br />
      <h2>FILMES E SERIES  <GiFilmProjector /></h2>
      <br />
      <div className="grid">
        {filmesfiltrados.map((filme) => (
          <div key={filme.id} className="card borda">
            <img src={filme.image?.medium} alt={filme.name} />
            <h2>{filme.name}</h2>
            <div className="gray">
            <p>{filme.genres?.join(", ")}</p>
            </div>
            <p><MdOutlineStar className="estrela"/>{filme.rating?.average}</p>
            <div>
              <div >
              <p>{filme.summary?.replace(/<[^>]*>?/gm, "")}</p>
              </div>
              {isSaved ? (
                <RiBookmarkFill onClick={handleSave} />
              ) : (
                <RiBookmarkLine onClick={handleSave} />
              )}
            </div>
          </div>
        ))}
      </div>

      <footer>
        <h3><IoLogoWhatsapp />  (22)9982823345</h3>
        <h3><MdEmail />  cinewoody@gmail.com</h3>
        <h3><RiInstagramFill /> Cinewoody</h3>

        <h4>Todos os direitos reservados ao cinewoody</h4>
      </footer>
    </div>
  );
}