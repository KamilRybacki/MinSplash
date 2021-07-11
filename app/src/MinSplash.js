import './MinSplash.scss';

import MainHeader from './components/MainHeader';
import GeneralMenu from './components/GeneralMenu'

import Terminal from './pages/Terminal';
import PseudoConsole from './components/PseudoConsole';

import AppFooter from './components/AppFooter'

import { unsplashFetch } from './utils/unsplash_api';
import { useState, useEffect, useRef } from 'react';

const settings = {
  title: "MinSplash",
  subtitle: "Minimal Unsplash Browser"
}

const fetchCollections = unsplashFetch("collections");

function MinSplash() {

  const consoleRef = useRef(null);

  const [current_collections_data, setCurrentCollectionsData] = useState()

  useEffect( () => {

    fetchCollections("?per_page=10").then( data => { setCurrentCollectionsData(data) }) 

  }, [])

  useEffect( () => {

    if(consoleRef.current.state.text_field) {
      consoleRef.current.insertCommand("Collections fetched!")
    }

  }, [current_collections_data] )

  const prepareListEntries = ( collections_data ) => {

    return collections_data.map( (collection) => {

      return(
        <div key={`${collection.id}`}><img src="./images/category_entry.svg"/><button >{collection.title}</button></div>
      )
    })

  }

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
          <nav id='categories-list'>{
            current_collections_data ? prepareListEntries(current_collections_data) : []
          }</nav>
          <article id="category-preview"></article>
        </section>
        <PseudoConsole id="command-line" ref={consoleRef}/>
      </Terminal>
      <div id="current_photo"></div>
      <AppFooter title={settings.title}/>
    </div>
  );
}

export default MinSplash;
