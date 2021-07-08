function MainHeader({title, subtitle, app_id, children}) {
  const header_id = `${app_id}__main-header` 

  return (
    <header id={`${header_id}`}>
      <div id={`${header_id}__title-wrapper`}>
        <h1 id={`${header_id}__title-wrapper__title`}>
          {title}          
        </h1>
        <h2 id={`${header_id}__title-wrapper__subtitle`}>
          {subtitle} 
        </h2>
      </div>
      {children}
    </header>
  );
}

export default MainHeader;