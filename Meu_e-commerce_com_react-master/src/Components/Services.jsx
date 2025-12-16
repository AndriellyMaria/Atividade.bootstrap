const services = [
  { title: 'Biscuit', desc: 'Peças personalizadas feitas em biscut, desde porta-joias á personagens customizados.' },
  { title: 'Crochê/Tricô/Bordado', desc: 'Tapetes, bolsas, lenços, camisetas e muito mais.' },
  { title: 'Cerâmica', desc: 'Peças como vasos, incensários, utensílios domésticos e até itens decorativos como esculturas.' },
];

function Services() {
  return (
    <section id="serviços">
      <h2>Produtos</h2>
      <div className="services">
        {services.map((s, i) => (
          <div className="service" key={i}>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Services;
