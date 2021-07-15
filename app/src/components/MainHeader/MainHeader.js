import { useContext } from "react";
import { MinSplashContext } from '../../MinSplash'

function MainHeader({header_data, children}) {

  const header_id = `${header_data.title}__main-header` 

  return (
    <header id={`${header_id}`}>
      <div id={`${header_id}__title-wrapper`}>
        <h1 id={`${header_id}__title-wrapper__title`}>
          {header_data.title}          
        </h1>
        <h2 id={`${header_id}__title-wrapper__subtitle`}>
          {header_data.subtitle} 
        </h2>
      </div>
      {children || ""}
    </header>
  );
}

export default MainHeader;