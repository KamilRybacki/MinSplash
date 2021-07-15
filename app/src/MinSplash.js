import './MinSplash.scss';

import MainHeader from './components/MainHeader';
import GeneralMenu from './components/GeneralMenu'

import { MinSplashBrowser } from './pages/MinSplashBrowser';

import AppFooter from './components/AppFooter'

const settings = {

  title: "MinSplash",
  subtitle: "Minimal Unsplash Browser"

}

function MinSplash() {  

  return (
    <>
      <div id={settings.title}>
        <MainHeader header_data={settings}>
          <button id={`main-menu-button`}>
            <div className='menu-button-triangle'></div>
            <span id='menu-button-text'>M E N U</span>
            <div className='menu-button-triangle'></div>
          </button>
        </MainHeader>
        <GeneralMenu/> {/* TODO */}
        <MinSplashBrowser settings={settings}/>
        <AppFooter title={settings.title}/>
      </div>
    </>
  );
}

export default MinSplash;
