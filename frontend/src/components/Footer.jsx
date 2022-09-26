import React from "react";
const data = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© {data} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
