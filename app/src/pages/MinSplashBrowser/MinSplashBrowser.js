import { useState, useEffect, useRef, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import styled from "styled-components"

import { unsplashFetch } from "../../utils/unsplash_api";

import CollectionPreview from "../CollectionPreview"

import PseudoConsole from "../../components/PseudoConsole"
import Terminal from "../Terminal"

import PhotoView from "../PhotoView"
import ListEntry from "../../components/ListEntry/ListEntry";

const fetchCollections = unsplashFetch("collections");

export const MinSplashBrowserContext = createContext();

export function MinSplashBrowser() {

	const console_ref = useRef();

	const [collections_page_content, setCurrentCollectionsPageContent] = useState();
	const [collections_page_index, setCollectionsPageIndex] = useState(1);
	const [collection_to_preview, setCollectionToPreview] = useState();

	const MinSplashBrowserContextValue = {

		console_ref,
		collection: collection_to_preview

	}

	useEffect( () => {

		fetchCollections(`?per_page=10&page=1`).then( data =>  { setCurrentCollectionsPageContent(data) }) 

	}, [])

	useEffect( () => {

		fetchCollections(`?per_page=10&page=${collections_page_index}`).then( data => { setCurrentCollectionsPageContent(data) }) 
		if(console_ref.current.state.text_field) {
			console_ref.current.insertCommand(`Collections page ${collections_page_index} fetched!`)
		}

	}, [collections_page_index] )

	const prepareListEntries = ( collections_data ) => {

		return collections_data.map( ({id, title, user, total_photos, published_at, description }) => {
			return (
			<li key={`${id}_link`} onClick = { () => {
				console_ref.current.insertCommand(`cd ~/collections/${id}`)
				setCollectionToPreview({ id, title, user, total_photos, published_at, description })
			} 
				}><ListEntry collection_id={id} collection_title={title}/></li>
			)
		})

	}

	const viewMoreCollections = (change) => {
		if(collections_page_index + change > 0){
			setCollectionsPageIndex(collections_page_index + change);
		}
	}

	function MinSplashBrowserWrapper ({children}) {

		const browser_key = `${Date.now()}_browser`

		return (
			<Router key={browser_key}>
				<MinSplashBrowserContext.Provider value={MinSplashBrowserContextValue}>
					{children}
				</MinSplashBrowserContext.Provider>
			</Router>
		);

	}

	return (
		<MinSplashBrowserWrapper>
			<Terminal title="Browser" id="main-terminal">
				<section id="categories-browser">
					<nav id='categories-list-wrapper'>
					<div id="categories-title">
						<span>FETCHED COLLECTIONS - PAGE {collections_page_index}</span>
						<img src="/images/category_open.svg" alt="Title icon"/>
					</div>
					<ul id="categories-list">
						{collections_page_content ? prepareListEntries(collections_page_content) : []}
						<li className="view-change-button-enabled" >
						<button onClick={() => {viewMoreCollections(1)}}> NEXT PAGE </button>
						</li>
						<li className={ collections_page_index !== 0 ? "view-change-button-enabled" : "view-change-button-disabled"} >
						<button onClick={() => {viewMoreCollections(-1)}} > PREV PAGE </button>
						</li>
					</ul>
					</nav>
					<article id="category-preview">
					<Switch>
						<Route exact path="/MinSplash/">
						<h1>Welcome to MinSplash!</h1>
						</Route>
						<Route exact path="/MinSplash/:collectionId">
						{ collection_to_preview ?  
							<CollectionPreview key={`${collection_to_preview.id}_${Date.now()}`}/> 
							: 
							""
						}
						</Route>
					</Switch>
					</article>
				</section>
				<PseudoConsole id="command-line" ref={console_ref}/>
			</Terminal>
			<Route path="/:collectionId/:photoId">
				<PhotoView console_ref={console_ref}/>
			</Route>
		</MinSplashBrowserWrapper>
	)
}