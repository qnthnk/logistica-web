import React, { useState, useContext } from 'react';
import { Context } from '../js/store/appContext';
import Navbar from '../components/Navbar';
import './Legislacion.css';

const Legislacion = () => {
  // Estado para la consulta, la respuesta y para mostrar un loading mientras se "busca"
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const { actions } = useContext(Context);

  // Handler para el botón "Enviar"
  const handleEnviar = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer(''); // Limpiamos cualquier respuesta anterior

    try {
      const simulatedResponse = await actions.askOpenAi(question);
      if (!simulatedResponse) {
        alert("Algo salió mal");
        return;
      }
      setAnswer(simulatedResponse);
    } catch (error) {
      console.error(error);
      setAnswer("Error al obtener la respuesta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="saber_mas_general d-flex flex-column align-items-center">
      <Navbar />
      <div className="saber-mas-container container my-4">
        <div className="saber-mas-content">
          <h2 className="text-center">Legislación</h2>
          <p className="text-center">
            Busca información relacionada con candidaturas y elecciones en México. Escribe tu consulta y presiona "Enviar" para obtener la legislación relevante.
          </p>
          <div className="form-group my-3">
            <textarea
              className="form-control"
              rows="4"
              placeholder="Escribe tu consulta aquí..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></textarea>
          </div>
          <div className="text-center">
            <button 
              className="btn btn-primary" 
              onClick={handleEnviar} 
              disabled={loading}
            >
              {loading ? <i className="fa fa-spinner fa-spin"></i> : "Enviar"}
            </button>
          </div>
          {answer && (
            <div className="answer-box mt-4 p-3 border rounded bg-light">
              <h4>Respuesta:</h4>
              <p>{answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Legislacion;
