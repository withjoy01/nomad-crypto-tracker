import { createGlobalStyle } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import styled from "styled-components";

//브라우저의 기본설정을 없애는 코드
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
	font-weight: 300;
  font-family: "Roboto", sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height: 1.2;
}
a {
  text-decoration: none;
  color:inherit;
}
`;
//렌더링 될 때 전역 스코프에 스타일을 적용시켜줌

const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 20;

  width: 40px;
  height: 40px;
  border-radius: 50%;

  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.textColor};

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  }

  .material-symbols-outlined {
    font-size: 22px;
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
  }
`;

function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <>
        <GlobalStyle />

        <ToggleButton onClick={() => setIsDark((prev) => !prev)}>
          <span className="material-symbols-outlined">
            {isDark ? "light_mode" : "dark_mode"}
          </span>
        </ToggleButton>

        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </>
    </ThemeProvider>
  );
}

export default App;
