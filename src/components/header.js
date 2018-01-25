import { h } from "preact";
import { Link } from "preact-router/match";
import styled from "styled-components";
import logo from "../assets/logo.png";
import theme from "../style/theme";

const StyledHeader = styled.header`
  display: flex;
  padding: 16px ${theme.sidePadding};
  justify-content: space-between;
  align-items: center;

  img {
    height: 65px;
    @media only screen and (max-width: 600px) {
      height: 35px;
    }
  }

  nav {
    display: flex;
    flex-direction: column;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-column-gap: 24px;
  }

  a {
    text-decoration: none;
    text-transform: uppercase;
    color: var(--dark-font-color);

    &:visited: {
      color: var(--dark-font-color);
    }
  }
`;

export default function Header() {
  const lastYear = `${new Date().getFullYear() - 1}`;
  return (
    <StyledHeader>
      <Link activeClassName="active" href="/">
        <img src={logo} alt="MFT2 Logo" />
      </Link>
      <nav>
        <Link activeClassName="active" href="/">
          Home
        </Link>
        <Link activeClassName="active" href="/register">
          Register
        </Link>
        <Link activeClassName="active" href={`/results/${lastYear}`}>
          {lastYear}
        </Link>
      </nav>
    </StyledHeader>
  );
}
