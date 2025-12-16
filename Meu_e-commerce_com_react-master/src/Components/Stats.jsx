const stats = [
  { label: 'Projetos entregues', value: 'Os resultados ainda não estão disponíveis' },
  { label: 'Clientes satisfeitos', value: 'Os resultados ainda não estão disponíveis' },
  { label: 'Anos de experiência', value: 'Os resultados ainda não estão disponíveis' },
];

function Stats() {
  return (
    <section id="resultados">
      <h2>Resultados em números</h2>
      <div className="stats">
        {stats.map((s, i) => (
          <div className="stat" key={i}>
            <h3>{s.value}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Stats;
