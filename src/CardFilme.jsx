import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { MdEmail, MdOutlineStar } from "react-icons/md";
import { RiInstagramFill, RiBookmarkLine, RiBookmarkFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import "./Filme.css";
import { handleSave, buscarFilmes } from "./filme.js";

const GENEROS = ["Action", "Comedy", "Drama", "Horror", "Romance", "Science-Fiction", "Thriller"];

export default function CardFilme() {
  const [filmes, setFilmes] = useState([]);
  const [busca, setBusca] = useState("");
  const [genero, setGenero] = useState("");
  const [salvos, setSalvos] = useState([]);
  const [filmeModal, setFilmeModal] = useState(null); // Armazena o filme selecionado para o modal

  useEffect(() => {
    async function buscarFilmes() {
      const response = await fetch("https://api.tvmaze.com/shows?page=1");
      const dados = await response.json();
      setFilmes(dados.slice(0, 102));
    }
    buscarFilmes();
  }, []);import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { MdEmail, MdOutlineStar } from "react-icons/md";
import { RiInstagramFill, RiBookmarkLine, RiBookmarkFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import "./Filme.css";

const GENEROS = ["Action", "Comedy", "Drama", "Horror", "Romance", "Science-Fiction", "Thriller"];

export default function CardFilme() {
  const [filmes, setFilmes] = useState([]);
  const [busca, setBusca] = useState("");
  const [genero, setGenero] = useState("");
  const [salvos, setSalvos] = useState([]);
  const [filmeModal, setFilmeModal] = useState(null);

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
        <h1>CINE CLUBE</h1>
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
          <option value="">Gêneros</option>
          {GENEROS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </header>

      <br />
      <h2>MOVIE AND TV SERIES</h2>
      <br />

      <div className="grid">
        {filmesfiltrados.map((filme) => {
          const textoSinopse = filme.summary
            ? filme.summary.replace(/<[^>]*>?/gm, "")
            : "Sinopse não disponível.";
          const estaSalvo = salvos.includes(filme.id);

          return (
            <div key={filme.id} className="card borda">
              {/* Topo do Card: Nota e Botão de Salvar */}
              <div className="card-header">
                <p className="nota">
                  <MdOutlineStar className="estrela" />
                  {filme.rating?.average || "0.0"}
                </p>

                <button
                  className={`salvo ${estaSalvo ? "salvo-ativo" : ""}`}
                  onClick={() => handleSave(filme.id)}
                  aria-label={estaSalvo ? "Remover dos salvos" : "Salvar filme"}
                  title={estaSalvo ? "Remover dos salvos" : "Salvar filme"}
                >
                  {estaSalvo ? <RiBookmarkFill /> : <RiBookmarkLine />}
                </button>
              </div>

              {/* Corpo do Card */}
              <img 
                src={filme.image?.medium || "https://via.placeholder.com/210x295?text=Sem+Capa"} 
                alt={filme.name} 
                className="img"
              />
              <h2>{filme.name}</h2>

              <div className="gray">
                <p>{filme.genres?.join(", ")}</p>
              </div>

              <p 
                className="sinopse-preview" 
                onClick={() => setFilmeModal(filme)}
              >
                {textoSinopse.slice(0, 80)}...{" "}
                <strong className="link-mais">Ler sinopse</strong>
              </p>
            </div>
          );
        })}
      </div>

      {filmeModal && (
        <div className="modal-overlay" onClick={() => setFilmeModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="btn-fechar" 
              onClick={() => setFilmeModal(null)}
            >
              <CgClose />
            </button>
            
            <h2>{filmeModal.name}</h2>
            <p className="sinopse-completa">
              {filmeModal.summary
                ? filmeModal.summary.replace(/<[^>]*>?/gm, "")
                : "Sinopse não disponível."}
            </p>
          </div>
        </div>
      )}

      <footer>
        <h3><IoLogoWhatsapp /> (22)9982823345</h3>
        <h3><MdEmail /> CINECLUB@gmail.com</h3>
        <h3><RiInstagramFill /> CINE CLUB</h3>
        <h4>Todos os direitos reservados ao CINE CLUB</h4>
      </footer>
    </div>
  );
}

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
        <h1>CINE CLUBE</h1>
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
          <option value="">Gêneros</option>
          {GENEROS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </header>

      <br />
      <h2>MOVIE AND TV SERIES</h2>
      <br />

      <div className="grid">
        {filmesfiltrados.map((filme) => {
          const textoSinopse = filme.summary
            ? filme.summary.replace(/<[^>]*>?/gm, "")
            : "Sinopse não disponível.";
          const estaSalvo = salvos.includes(filme.id);

          return (
            <div key={filme.id} className="card borda">
              <div className="card-header">
                <p className="nota">
                  <MdOutlineStar className="estrela" />
                  {filme.rating?.average || "0.0"}
                </p>
              <img src={filme.image?.medium} alt={filme.name} className="img"/>
              <h2>{filme.name}</h2>

              <div className="gray">
                <p>{filme.genres?.join(", ")}</p>
              </div>

              <p 
                className="sinopse-preview" 
                onClick={() => setFilmeModal(filme)}
              >
                {textoSinopse.slice(0, 80)}...{" "}
                <strong className="link-mais">Ler sinopse</strong>
              </p>
            </div>


                <button
                  className={`salvo ${estaSalvo ? "salvo-ativo" : ""}`}
                  onClick={() => handleSave(filme.id)}
                  aria-label={estaSalvo ? "Remover dos salvos" : "Salvar filme"}
                  title={estaSalvo ? "Remover dos salvos" : "Salvar filme"}
                >
                  {estaSalvo ? <RiBookmarkFill /> : <RiBookmarkLine />}
                </button>
              </div>

          );
        })}
      </div>
      {filmeModal && (
        <div className="modal-overlay" onClick={() => setFilmeModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="btn-fechar" 
              onClick={() => setFilmeModal(null)}
            >
              <CgClose />
            </button>
            
            <h2>{filmeModal.name}</h2>
            <p className="sinopse-completa">
              {filmeModal.summary
                ? filmeModal.summary.replace(/<[^>]*>?/gm, "")
                : "Sinopse não disponível."}
            </p>
          </div>
        </div>
      )}

      <footer>
        <h3><IoLogoWhatsapp /> (22)9982823345</h3>
        <h3><MdEmail /> CINECLUB@gmail.com</h3>
        <h3><RiInstagramFill /> CINE CLUB</h3>
        <h4>Todos os direitos reservados ao CINE CLUB</h4>
      </footer>
    </div>
  );
}