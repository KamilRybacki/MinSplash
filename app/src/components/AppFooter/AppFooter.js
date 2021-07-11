import './style.scss'

const MY_WEBPAGE_LINK = "https://github.com/KamilRybacki";


function AppFooter({title}) {
  return (
    <span id="app-footnote-wrapper">
    <pre id="app-footnote-title">{title} </pre>
    <pre> | by  </pre> 
    <a href={MY_WEBPAGE_LINK} id="app-footnote-link">Kamil Rybacki</a> 
    <pre>  (2021)</pre>
    </span>  
  )
}

export default AppFooter;