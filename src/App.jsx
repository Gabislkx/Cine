import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CardFilme from "./CardFilme";
import Premium from "./Premium";
import "./Filme.css";

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/CardFilme" replace />} />
          <Route path="/CardFilme" element={<CardFilme />} />
          <Route path="/premium" element={<Premium />} />
        </Routes>
    </BrowserRouter>
  );
}