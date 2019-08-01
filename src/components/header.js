import { h } from "preact";
import { Link } from "preact-router/match";
import style from "./header.less";
import logo from "../assets/logo.png";

export default function Header() {
  const yearsAgo = num => `${new Date().getFullYear() - num}`;
  return (
    <header class={style.header}>
      <Link activeClassName="active" href="/">
        <img class={style.logo} src={logo} alt="MFT2 Logo" />
      </Link>
      <nav>
        <Link activeClassName="active" href="/">
          Home
        </Link>
        <Link activeClassName="active" href="/register">
          Register
        </Link>
        <Link activeClassName="active" href={`/results/2018`}>
          2018
        </Link>
      </nav>
    </header>
  );
}
