import styled from "styled-components";

const MY_WEBPAGE_LINK = "https://github.com/KamilRybacki";

const AppFootnoteWrapper = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 1px;
  left: 0;

  width: 100%;

  font-size: 50%;
  font-family: "Inconsolata"

  color: black;

  & > pre {

    display: flex;
    justify-content: center;
    align-items: center

  }

  & > span {

    font-size: 125%;
    font-weight: bold

  }

  & > a {

    font-weight: bolder; 
    letter-spacing: 1px

  }

`

function AppFooter({title}) {

  return (
    <AppFootnoteWrapper>
      <span>{title} </span>
      <pre> | by  </pre> 
      <a href={MY_WEBPAGE_LINK}> Kamil Rybacki</a> 
      <pre>  (2021)</pre>
    </AppFootnoteWrapper>
  )
}

export default AppFooter;