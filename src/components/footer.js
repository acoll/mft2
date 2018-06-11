import { h } from "preact";
import style from "./footer.less";
import logo from "../assets/logo.png";
import fbLogo from "../assets/fb-logo.png";

export default function Footer() {
  return (
    <footer class={style.footer}>
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
    </footer>
  );
}
