import React, { useEffect, useState } from 'react';
import 'charts.css';
import ReactECharts from 'echarts-for-react';
import './PresidenciaPartido2024.css'; // Importamos el CSS de estilos
// Importamos el JSON localmente
import localData from '../jsons/presidenciapartido2024.json';

const PresidenciaPartido2024 = () => {
  const [dataToFill, setDataToFill] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {

        setDataToFill(localData);
      } catch (e) {
        console.error(e);
      }
      console.log("Obteniendo datos...");
    };
    getData();
  }, []);

  // Filtramos para excluir "votos nulos" y "candidaturas no registradas"
  const filteredData =
    dataToFill && dataToFill.votacionPartidosConDistribucion
      ? dataToFill.votacionPartidosConDistribucion.filter(item => {
          const nombre = item.nombrePartido.toLowerCase();
          return nombre !== "votos nulos" && nombre !== "candidaturas no registradas";
        })
      : [];

  // Ordenamos los datos filtrados por el total (de mayor a menor)
  const sortedData = [...filteredData].sort((a, b) => b.total - a.total);

  return (
    <>
      <div className="row presidencia-container">
        <div className="card home-wrapper container-fluid col table-container">
          <table className="table table-fluid bg-light align-middle mb-1 m-1 stripped text-center p-2">
            <thead className="border-dark bg-dark border-1">
              <tr>
                <th className="table-dark" scope="col">Partido</th>
                <th className="table-dark" scope="col">Total</th>
                <th className="table-dark" scope="col">%</th>
                <th className="table-dark" scope="col">Lugar</th>
              </tr>
            </thead>
            {sortedData.length > 0 ? (
              <tbody>
                {sortedData.map((item, index) => (
                  <tr key={index} className="border-dark border-1 table-stripped">
                    <th scope="row">
                      <img
                        alt=""
                        style={{ height: "50px", width: "auto" }}
                        className="imagen-candidato-movil"
                        src={`https://computos2024.ine.mx/assets/img/partidos${item.emblemaPartido}`}
                      />
                    </th>
                    <td className="bg-info-subtle">
                      <p className="f17">{item.total.toLocaleString()}</p>
                    </td>
                    <td>
                      <p className="f17">{item.porcentaje.toFixed(2)}%</p>
                    </td>
                    <td>
                      <p className="f17">{index + 1}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="4">
                    <h5>Cargando...</h5>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>

        <div className="col chart-container">
          <ReactECharts
            option={{
              tooltip: { trigger: 'item' },
              series: [
                {
                  name: "",
                  type: 'pie',
                  radius: '65%',
                  data: sortedData.map(item => ({
                    value: item.porcentaje,
                    name: item.nombrePartido
                  })),
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            }}
            style={{ height: '400px', width: '100%' }}
          />
        </div>
      </div>
    </>
  );
};

export default PresidenciaPartido2024;
