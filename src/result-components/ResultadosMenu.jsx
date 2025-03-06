import React, { useState } from "react";
import menuData from "../menu_resultados.json";
import"./ResultadosMenu.css";

// Importación de todos los componentes posibles
import SenaduriasVotosEntidades2018 from "./2018/SenaduriasVotosEntidades2018";
import SenaduriasVotosPartido2018 from "./2018/SenaduriasVotosPartido2018";
import DiputacionesVotosDistritos2018 from "./2018/DiputacionesVotosDistritos2018";
import DiputacionesVotosPartidos2018 from "./2018/DiputacionesVotosPartidos2018";
import PresidenciaPartido2018 from "./2018/PresidenciaPartido2018";
import PresidenciaCandidatura2018 from "./2018/PresidenciaCandidatura2018";

import DiputacionesVotosDistritos2021 from "./2021/DiputacionesVotosDistritos2021";
import DiputacionesVotosPartidos2021 from "./2021/DiputacionesVotosPartidos2021";

import SenaduriasVotosEntidades2024 from "./2024/SenaduriasVotosEntidades2024";
import SenaduriasVotosPartido2024 from "./2024/SenaduriasVotosPartido2024";
import DiputacionesVotosDistritos2024 from "./2024/DiputacionesVotosDistritos2024";
import DiputacionesVotosPartidos2024 from "./2024/DiputacionesVotosPartidos2024";
import PresidenciaPartido2024 from "./2024/PresidenciaPartido2024";
import PresidenciaCandidatura2024 from "./2024/PresidenciaCandidatura2024";

import PieChart from "./2024/PieChart";

const ResultadosMenu = () => {
  // selectedPath guarda la selección de cada nivel (por ejemplo: ["federal", "2018", "senadurias", ...])
  const [selectedPath, setSelectedPath] = useState([]);

  // Función que recorre el menú para obtener el objeto correspondiente a un nivel dado
  const getMenuAtLevel = (level) => {
    let menu = menuData;
    for (let i = 0; i < level; i++) {
      const key = selectedPath[i];
      if (menu && menu[key]) {
        menu = menu[key];
      } else {
        menu = null;
        break;
      }
    }
    return menu;
  };

  // Actualiza el selectedPath truncando desde el nivel modificado y agregando la nueva selección.
  const handleSelectChange = (level, value) => {
    setSelectedPath((prev) => {
      const newPath = prev.slice(0, level);
      newPath[level] = value;
      return newPath;
    });
  };

  // Genera los selects dinámicamente según el menú anidado.
  const renderSelects = () => {
    const selects = [];
    let menu = menuData;
    // Iteramos en cada nivel mientras haya opciones en el menú
    for (let level = 0; menu && typeof menu === "object" && Object.keys(menu).length > 0; level++) {
      const options = Object.keys(menu);
      selects.push(
        <div key={`level-${level}-${selectedPath[level] || "none"}`} className="forms">
          <select
            className="input"
            value={selectedPath[level] || ""}
            onChange={(e) => handleSelectChange(level, e.target.value)}
          >
            <option value="">Seleccione una opción</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
      // Si no se seleccionó nada en este nivel, dejamos de generar más selects.
      if (!selectedPath[level]) break;
      menu = menu[selectedPath[level]];
    }
    return selects;
  };

  // Construimos la ruta actual como string (ejemplo: "federal > 2018 > senadurias > votos por entidades")
  const currentPathStr = selectedPath.join(" > ");

  // Determinamos qué componente renderizar según la ruta seleccionada.
  const getComponentForPath = (pathStr) => {
    switch (pathStr) {
      case "federal > 2018 > senadurias > votos por entidades":
        return <SenaduriasVotosEntidades2018 />;
      case "federal > 2018 > senadurias > votos por partido politico":
        return <SenaduriasVotosPartido2018 />;
      case "federal > 2018 > diputaciones > votos por distritos":
        return <DiputacionesVotosDistritos2018 />;
      case "federal > 2018 > diputaciones > votos por partidos politicos y candidatura independiente":
        return <DiputacionesVotosPartidos2018 />;
      case "federal > 2018 > presidencia > partido":
        return <PresidenciaPartido2018 />;
      case "federal > 2018 > presidencia > candidatura":
        return <PresidenciaCandidatura2018 />;
      case "federal > 2021 > diputaciones > votos por distritos":
        return <DiputacionesVotosDistritos2021 />;
      case "federal > 2021 > diputaciones > votos por partidos politicos y candidatura independiente":
        return <DiputacionesVotosPartidos2021 />;
      case "federal > 2024 > senadurias > votos por entidades":
        return <SenaduriasVotosEntidades2024 />;
      case "federal > 2024 > senadurias > votos por partido politico":
        return <SenaduriasVotosPartido2024 />;
      case "federal > 2024 > diputaciones > votos por distritos":
        return <DiputacionesVotosDistritos2024 />;
      case "federal > 2024 > diputaciones > votos por partidos politicos y candidatura independiente":
        return <DiputacionesVotosPartidos2024 />;
      case "federal > 2024 > presidencia > partido":
        return <PresidenciaPartido2024 />;
      case "federal > 2024 > presidencia > candidatura":
        return <PresidenciaCandidatura2024 />;
      default:
        return null;
    }
  };

  const selectedComponent = getComponentForPath(currentPathStr);

  return (
    <div className="container">
      <h2 className="heading">Resultados</h2>
      {/* Siempre se muestran los selects */}
      <div className="forms">{renderSelects()}</div>
      {/* Se muestra el componente correspondiente o un mensaje de aviso */}
      {selectedComponent ? (
         <div>
          <br/>
        <div className="result-component">{selectedComponent}</div>
        <div/>
      </div>
      ) : (
        
        <div>
          <br/>
          <div className="alert alert-info">
            Por favor, seleccione todas las opciones para ver el resultado.
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultadosMenu;
