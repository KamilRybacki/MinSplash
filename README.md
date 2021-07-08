# MinSplash - minimalistic Unsplash content explorer

This project is the final part of CODE:ME Javascript course and focuses mainly on displaying data gathered via API
using React.js i.e. a purely Front-End assignment.

Here, a publicly available Unsplash API (https://unsplash.com/developers) has been chosen to request a curated set
of content, which in this case are collections of pictures following chosen themes. The User can then explore these
categories and view pictures individually, where additional data about a chosen file is displayed (No. downloads, likes, etc.)
and several sharing options are available (Facebook, Twitter, etc.)

# Project requirements (in Polish) 

Przy użyciu Unsplash API: https://unsplash.com/developers, napisz aplikację do przeglądania obrazów.

Aplikacja ma posiadać następujące widoki:

* **Lista sekcji**, zawierająca kilka wybranych sekcji z bazy zdjęć z miniaturami 10 najnowszych obrazów.
* **Sekcja**, wyświetlająca listę miniatur wszystkich dostępnych obrazów z danej sekcji (opcja: z infinite scrollem).
Użytkownik ma mieć możliwość wyboru sortowania: po najnowszych lub popularnych.
Po najechaniu myszą przy każdej miniaturze powinna pokazywać się liczba ściągnięć, lików oraz państwo (jeśli jest dostępne).
* **Pojedyncze zdjęcie**, wyświetlenie w dużym rozmiarze, wraz z dodatkowymi informacjami udostępnianymi przez api. Zdjęcie powinno się dać likować (opcja: sharować za pomocą Facebooka).

Aplikacja powinna zawierać routing i być responsywna. Zalecany stack technologiczny: ES6+, Node.js, React.js, React Router, Webpack, Babel, Styled Components lub Sass, inne wybrane przez developera.
Wszelkie dodatkowe pomysły są mile widziane.