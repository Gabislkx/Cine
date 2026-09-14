import React from 'react'
import { GiFilmSpool } from "react-icons/gi";
import { FaCheck } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function Premium() {
  return (
    <div> 
        <div className='cabecalho'>
        <h1>
          CINEWOODY <GiFilmSpool />
        </h1>
        <button className='center'> <Link to="/CardFilme" className='link'>
            Home
          </Link>
          </button> 
        
          <button> <Link to="/premium" className="link">Premium</Link></button> 
        
            <input 
          type="text"  className='pesquisa'
          placeholder="pesquise seu filme"
        />
  
        </div>
        <h2>Area Premuim</h2>
        <div className='grid'>
           <div className=' card borda'>
          <h2>Full pro</h2>
          <p><FaCheck />  Sem anuncios</p>
          <p><FaCheck />  sem restição</p>
          <p><FaCheck />Verificado na conta</p>
          <h4>R$ 49,90</h4>
          <button>Buy</button>
        </div>
        
        <div className=' card borda'>
          <h2>Pro++</h2>
          <p><FaCheck />  Sem anuncios</p>
          <p><FaCheck />  sem restição</p>
          <h4>R$ 24,90</h4>
          <button>Buy</button>
        </div>
        
        <div  className=' card borda'>
        
          <h2>Pro+</h2>
          <p><FaCheck />  Sem anuncios</p>
          <p><CgClose />  Com Restrições</p>
          <h4>R$ 9,99</h4>
          <button>buy</button>
        </div>
         <div  className=' card borda'>
          <h2>Basico</h2>
          <p><CgClose />   Com anuncios</p>
          <p><CgClose />  Com Restrições</p>
          <h4>R$ 0,00</h4>
          <button>buy</button>
        </div>
        </div>
    </div>
  )
}
