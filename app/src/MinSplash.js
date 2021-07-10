import './MinSplash.scss';

import MainHeader from './components/MainHeader';
import GeneralMenu from './components/GeneralMenu'
import Terminal from './pages/Terminal'
import AppFooter from './components/AppFooter'

const settings = {
  title: "MinSplash",
  subtitle: "Minimal Unsplash Browser"
}

function MinSplash() {
  return (
    <div id={settings.title}>
      <MainHeader title={settings.title} subtitle={settings.subtitle} app_id={`${settings.title}`}>
        <button id={`main-menu-button`}>
          <div className='menu-button-triangle'></div>
          <span id='menu-button-text'>M E N U</span>
          <div className='menu-button-triangle'></div>
        </button>
      </MainHeader>
      <GeneralMenu app_id={`${settings.title}`}>

      </GeneralMenu>
      <Terminal title="Browser">
        <section id="categories-browser">
          <nav id='categories-list'>a</nav>
          <article id="category-preview">b</article>
        </section>
        <input type="text"id="command-line"/>
      </Terminal>
      <div id="current_photo"></div>
      <AppFooter title={settings.title}/>
    </div>
  );
}

export default MinSplash;
