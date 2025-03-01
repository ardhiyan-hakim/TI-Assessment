import "/public/assets/components/Footer.scss";

import {
  FaFacebookF,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer>
      <div className="footer-details">
        <div className="company-details">
          <h1>LOGO</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non
            lectus eget massa dictum ornare in sed libero. Sed id varius quam.
            Cras iaculis ac massa et vulputate. Ut varius.
          </p>
        </div>
        <div className="menu-details">
          <div className="menu-details-property">
            <h3>Property</h3>
            <ul>
              <li>
                <a href="#">Property Category</a>
              </li>
              <li>
                <a href="#">Testimony</a>
              </li>
              <li>
                <a href="#">Download App</a>
              </li>
            </ul>
          </div>
          <div className="menu-details-about">
            <h3>About</h3>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">News and Events</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>
          <div className="menu-details-contacts">
            <h3>Contact Us</h3>
            <ul>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Send Feedback</a>
              </li>
              <li>
                <div className="socials">
                  <p>Socials</p>
                  <div className="socials-icons">
                    <div className="icon-container">
                      <FaFacebookF />
                    </div>
                    <div className="icon-container">
                      <FaLinkedin />
                    </div>
                    <div className="icon-container">
                      <FaTwitter />
                    </div>
                    <div className="icon-container">
                      <FaInstagram />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p>&copy; LOGO 2022</p>
    </footer>
  );
}
