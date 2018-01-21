import { h } from "preact";
import styled from "styled-components";
// import theme from "../style/theme.js";

// const { sidePadding, lightFontColor, darkBg } = theme;

// button {
// 	position: relative;
// 	font-size: 16px;
// 	padding: 16px 0px;
// 	background-color: rgba(236, 78, 28, 0.9);
// 	border: none;
// 	border-radius: 4px;
// 	box-shadow: inset -1px -1px 1px rgba(0, 0, 0, 0.25);
// 	display: grid;
// 	grid-template-columns: 1fr 1fr 1fr;

// 	.label {
// 	  /* grid-column: 2/3; */
// 	}

// 	.spinner {
// 	  /* grid-column: 3/4; */
// 	  transition: opacity 250ms ease-in;
// 	  &.active {
// 		opacity: 0;
// 	  }

// 	  &:after {
// 		content: " ";
// 		width: 1.5rem;
// 		height: 1.5rem;
// 		border-top-color: #444;
// 		border-left-color: #444;

// 		/* Additional spinner styles */
// 		animation: spinner 400ms linear infinite;
// 		border-bottom-color: transparent;
// 		border-right-color: transparent;
// 		border-style: solid;
// 		border-width: 2px;
// 		border-radius: 50%;
// 		box-sizing: border-box;
// 		display: inline-block;
// 		vertical-align: middle;
// 	  }
// 	}
//   }

const Button = styled.button`
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  padding: 16px 0px;
  background-color: rgba(236, 78, 28, 0.9);
  border: none;
  border-radius: 4px;
  box-shadow: inset -1px -1px 1px rgba(0, 0, 0, 0.25);

  > div {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    justify-items: center;
    align-items: center;

    @keyframes spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .label {
    }

    .spinner {
      transition: opacity 250ms ease-in;
      opacity: 0;

      &.active {
        opacity: 1;
      }

      /* Spinner size and color */
      width: 1.5rem;
      height: 1.5rem;
      border-top-color: #444;
      border-left-color: #444;

      /* Additional spinner styles */
      animation: spinner 400ms linear infinite;
      border-bottom-color: transparent;
      border-right-color: transparent;
      border-style: solid;
      border-width: 2px;
      border-radius: 50%;
    }
  }
`;

export default function ButtonWithSpinner({ children, spinning = false }) {
  return (
    <Button disabled={!!spinning}>
      <div>
        <div />
        <div className="label">{children}</div>
        <div className={`spinner ${spinning ? "active" : ""}`} />
      </div>
    </Button>
  );
}
