function GeneralMenu({app_id, children}) {

	const menu_id = `${app_id}__general-menu`;

	return (
		<nav id={menu_id}>
			{children}
		</nav>
	);
}

export default GeneralMenu;