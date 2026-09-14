import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CardFilme from "./CardFilme";
import Premium from "./Premium";
import "./Filme.css";

export default function App() {
  return (
    <div className="barra">
    <BrowserRouter>
      <Routes>
        <Route path="/CardFilme" element={<CardFilme/>} />
        <Route path="/premium" element={<Premium/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}