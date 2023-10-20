import './Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Información</h3>
          <ul>
            <li><a href="#">Ayuda</a></li>
            <li><a href="#">Contáctanos</a></li>
            <li><a href="#">Términos y Condiciones</a></li>
            <li><a href="#">Política de Privacidad</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Servicios</h3>
          <ul>
            <li><a href="#">Envíos</a></li>
            <li><a href="#">Devoluciones</a></li>
            <li><a href="#">Vender en Línea</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Redes Sociales</h3>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3></h3>
          <img  className='descarga-app' src='./src/ecomerce.png' alt="Descarga la App" />
        </div>
      </div>
      <div className="footer-bottom">
  <p>&copy; 2023 <span className="large-letter">Ecomerce-</span><span className="orange-text">Santi-Program-Pro-</span> Todos los derechos reservados.</p>
</div>


    </footer>
  );
};

export default Footer;
