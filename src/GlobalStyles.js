import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    :root{
        --main-color: #181824;
        --secondary-color: #25273C;
        --border-text-color: #777A92;
        --title: 1.8rem;
        --text: 1.4rem;
        --border-color: hsl(234, 11%, 52%);
        --button-color: hsl(192, 100%, 67%);
        --check: hsl(280, 87%, 65%);
        --bar-size: 4.5rem;
        --text-color: hsl(236, 33%, 92%);
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Josefin Sans', sans-serif;
        color: white;
    }
    html {
        font-size: 62.5%;
    }
    body {
        background-color: var(--main-color);
        height: 100vh;
        width: 80vw;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items:center;
         }
    
      #root{
        width: 40rem;
      }
    
      @media (min-width: 600px){
        :root {
          --bar-size: 6.5rem;
        }
        #root{
          width: 50rem;
        }
      }

`;

export { GlobalStyles };
