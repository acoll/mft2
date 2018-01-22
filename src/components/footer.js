import { h } from "preact";
import styled from "styled-components";
import theme from "../style/theme.js";
import logo from "../assets/logo.png";
import fbLogo from "../assets/fb-logo.png";

const { sidePadding, lightFontColor, darkBg } = theme;

const FooterStyle = styled.footer`
  background-color: ${darkBg};
  padding: 48px ${sidePadding};
  display: grid;
  grid-template-columns: auto 1fr auto 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  align-items: center;

  @media only screen and (max-width: 800px) {
    grid-template-columns: auto 1fr;
  }

  color: ${lightFontColor};

  img {
    height: 64px;
  }

  a {
    color: ${lightFontColor};
  }
`;

export default function Footer() {
  return (
    <FooterStyle>
      <div>
        <img src={logo} alt="MFT2 Logo" />
      </div>
      <div>
        <address>
          <strong>Event Location:</strong>
          <div>
            Department of Resources and
            <br />Economic Development,
            <br />Division of Parks and Recreation
          </div>
          <div>Mt. Monadnock</div>
          <div>Jaffrey, NH</div>
        </address>
      </div>
      <a href="https://www.facebook.com/MonadnockFullThrottle/">
        <img src={fbLogo} alt="Facebook Logo" />
      </a>
      <div>
        <p>
          Like and follow us on facebook to get updates about the race. If you
          have an questions send us a message on our facebook page.
        </p>
      </div>
    </FooterStyle>
  );
}
