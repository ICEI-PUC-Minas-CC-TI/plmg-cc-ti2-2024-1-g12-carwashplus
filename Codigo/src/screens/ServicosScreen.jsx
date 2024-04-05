import React, { useState, useEffect } from 'react';

const ServicosScreen = () => {
  const [localizacaoAtual, setLocalizacaoAtual] = useState(null);
  const [oficinasProximas, setOficinasProximas] = useState(['Oficina A', 'Oficina B']); // Simulação
  const [oficinaSelecionada, setOficinaSelecionada] = useState('');
  const [horariosDisponiveis, setHorariosDisponiveis] = useState(['09:00', '10:00']); // Simulação
  const [horarioSelecionado, setHorarioSelecionado] = useState('');

  useEffect(() => {
    obterLocalizacao();
  }, []);

  const obterLocalizacao = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocalizacaoAtual({ latitude, longitude });
        // Implementar a busca por oficinas próximas utilizando a localização
      },
      error => alert('Erro ao obter a localização: ' + error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Agendar Lavagem de Carro</h1>
      {localizacaoAtual && <p>Localização: {localizacaoAtual.latitude}, {localizacaoAtual.longitude}</p>}
      
      <select
        value={oficinaSelecionada}
        onChange={e => setOficinaSelecionada(e.target.value)}
        style={styles.select}
      >
        <option value="">Selecione uma oficina</option>
        {oficinasProximas.map(oficina => (
          <option key={oficina} value={oficina}>{oficina}</option>
        ))}
      </select>
      
      <select
        value={horarioSelecionado}
        onChange={e => setHorarioSelecionado(e.target.value)}
        style={styles.select}
      >
        <option value="">Selecione um horário</option>
        {horariosDisponiveis.map(horario => (
          <option key={horario} value={horario}>{horario}</option>
        ))}
      </select>

      <button onClick={() => alert(`Sua lavagem foi agendada para ${horarioSelecionado} na ${oficinaSelecionada}`)}>
        Agendar
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  select: {
    display: 'block',
    padding: '10px',
    margin: '10px 0',
    width: '100%',
  },
};

export default ServicosScreen;
