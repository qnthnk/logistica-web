import React, { useEffect, useState } from 'react'
import 'charts.css';
import ReactECharts from 'echarts-for-react';





const PresidenciaPartido2024 = () => {
    const [dataToFill, setDataToFill] = useState({})
    useEffect(() => {
        const getData = async () => {
            try {
                let response = await fetch(`https://computos2024.ine.mx/assets/JSON/PRESIDENTE/NACIONAL/Presidente_NACIONAL.json`)
                let data = await response.json()
                console.log(data)
                setDataToFill(data)
            } catch (e) {
                console.error(e)
            }
            console.log("Obteniendo datos...");
        };
        getData();
    }, [])
    
    
    return (
        <>
        <div className='row'>
            <div className='card home-wrapper container-fluid col'  >
                <table className=" table-fluid  bg-light align-middle mb-1 m-1 stripped text-center p-2">
                    <thead className='border-dark bg-dark border-1'>
                        <tr >
                            <th className="table-dark" scope="col">Partido</th>
                            <th className="table-dark" scope="col">  Total </th>
                            <th className="table-dark" scope="col">  %  </th>
                            <th className="table-dark" scope="col">Lugar</th>
                        </tr>
                    </thead>
                {dataToFill && dataToFill.votacionPartidosConDistribucion ? (//FALTA FILTRAR PARA QUE NO APAREZCAN VOTOS NULOS Y CANDIDATOS NO REGISTRADOS
                    <tbody>
                        {dataToFill.votacionPartidosConDistribucion.map((item, index) => (
                            <tr key={index} className='border-dark border-1 table-stripped'>
                                <th scope="row">
                                    <img alt="" style={{height: "50px", width: "auto"}} className="imagen-candidato-movil" src={`https://computos2024.ine.mx/assets/img/partidos${item.emblemaPartido}`}/>
                                </th>
                                <td className='bg-info-subtle'>
                                    <p className="f17">{(item.total).toLocaleString()}</p>
                                </td>
                                <td>
                                    <p className="f17">{(item.porcentaje).toFixed(2)}%</p>
                                </td>
                                {/* ranking */}
                                <td><p className="f17">i</p></td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <div><h5>Cargando</h5></div>
                )}
                </table>
            </div>
            
    
                    <ReactECharts 
                        className='col'
                        option={{//FALTA MAPEAR EL COLOR. NO ENCONTRE EN QUE PARTE SE SETEA EL COLOR DE CADA SLICE DEL PIE (API:colorPartido)
                                tooltip: { trigger: 'item' },
                                series: [{
                                name: "", type: 'pie', radius: '65%',
                                data: dataToFill && dataToFill.votacionPartidosConDistribucion 
                                    ? dataToFill.votacionPartidosConDistribucion.map((item) => ({
                                                value: item.porcentaje, name: item.nombrePartido //DATA DE LA GRAFICA MAPEADA
                                    })) : [],
                                emphasis: {
                                    itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' },
                                            },
                                    }],
                                 }} 
                        style={{ height: '400px', width: '100%' }} 
                    />
    
   
        </div>
        </>
    )
}


export default PresidenciaPartido2024