import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
	:root {
		--color-brand: #1ed760;
		--color-brand-press: #169C46;
		
		--color-black: #121212;
		--color-highlight: #1a1a1a;
		--color-press: #000;
		
		--color-gray: #b3b3b3;
		--color-text-sub: #a7a7a7;
	}

  * {
    margin: 0;
    padding: 0;

    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: "Montserrat", sans-serif, monospace;
    font-size: 16px;
    color: var(--color-gray);
    background-color: #000;
  }
  
  a,
  a:link,
  a:visited {
	  color: inherit;
	  text-decoration: none;
  }
  
  button {
    border: 0;
  }
  
  ul {
	  width: 20rem;
	  list-style: none;
  }
`;
export default GlobalStyles;
