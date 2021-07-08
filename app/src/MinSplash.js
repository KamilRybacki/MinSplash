import './MinSplash.scss';

import MainHeader from './components/MainHeader';
import GeneralMenu from './components/GeneralMenu'
// import AppFooter from './components/AppFooter'

const settings = {
  title: "MinSplash",
  subtitle: "Minimal Unsplash Browser"
}

function MinSplash() {
  return (
    <div id={settings.title}>
      <MainHeader title={settings.title} subtitle={settings.subtitle} app_id={`${settings.title}`}>
        <button id={`${settings.title}__menu_button`}/>
      </MainHeader>
      <GeneralMenu app_id={`${settings.title}`}>
        
      </GeneralMenu>
    </div>
  );
}

export default MinSplash;
