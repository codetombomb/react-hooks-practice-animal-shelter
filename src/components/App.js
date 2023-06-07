import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleChangeType(type) {
    setFilters(type)
  }

  function fetchPets () {
    fetch(`http://localhost:3001/pets${filters.type === "all" ? "" : `?type=${filters.type}`}`)
      .then(resp => resp.json())
      .then(data => setPets(data))
  }

  function handleAdoptPet (id) {
    const newPets = JSON.parse(JSON.stringify(pets))
    setPets(newPets.map(pet => pet.id === id ? {...pet, isAdopted: true} : pet))
  }

  const filteredPets = pets.filter(pet => {
    if(filters.type === "all") return true

    return pet.type === filters.type
  })

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleChangeType} onFindPetsClick={fetchPets}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={filteredPets} onAdoptPet={handleAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;