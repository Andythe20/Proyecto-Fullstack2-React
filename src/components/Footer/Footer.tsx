import {
  IoLogoYoutube,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoLinkedin,
} from "react-icons/io";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <h3 className="text-center">
        No olvides seguirnos en nuestras redes sociales!!
      </h3>

      <ul className="social-icons d-flex flex-wrap justify-content-center">
        <li className="icon-element">
          <a
            href="https://www.youtube.com/@CocinaAbiertaDuocUC"
            target="_blank"
            className="icon"
          >
            <IoLogoYoutube size={28} />
          </a>
        </li>
        <li className="icon-element">
          <a
            href="https://www.facebook.com/DuocUC"
            target="_blank"
            className="icon"
          >
            <IoLogoFacebook size={28} />
          </a>
        </li>
        <li className="icon-element">
          <a
            href="https://www.instagram.com/duocuc_cl"
            target="_blank"
            className="icon"
          >
            <IoLogoInstagram size={28} />
          </a>
        </li>
        <li className="icon-element">
          <a href="https://x.com/DuocUC" target="_blank" className="icon">
            <IoLogoTwitter size={28} />
          </a>
        </li>

        <li className="icon-element">
          <a
            href="https://www.linkedin.com/company/duocuc"
            target="_blank"
            className="icon"
          >
            <IoLogoLinkedin size={28} />
          </a>
        </li>
      </ul>

      <ul className="menu">
        <p className="texto">@2025 OnlyFlans | Todos los derechos reservados</p>
      </ul>

      <ul>
        <Link className="btn btnBrown rounded-pill px-4 font-lato" to="/creditos">Ver Créditos</Link>
      </ul>

    </footer>
  );
}

export default Footer;
