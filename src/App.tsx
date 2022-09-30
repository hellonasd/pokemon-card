import React from "react";
import { Routes, Route } from "react-router-dom";
import { Pokemons } from "./pages/pokemons/pokemons";
import { Pokemon } from "./pages/pokemon/pokemon";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Pokemons />} />
        <Route path={`pokemons/page/:id`} element={<Pokemons />} />
        <Route path="pokemon/:id" element={<Pokemon />} />
      </Routes>
    </div>
  );
}

export default App;
