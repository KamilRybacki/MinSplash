const footnote_style = {

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  position: "fixed",
  bottom: "0",

  width: "100%",

  fontSize: "50%"

}

function AppFooter({title}) {
  return (
    <span style={footnote_style}>{title} | by Kamil Rybacki 2021</span>  
  )
}

export default AppFooter;