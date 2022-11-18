// Vendor import
//TODO: import individually
import 'bootstrap';

console.log('nid o');

//import 'bootstrap/js/dist/dropdown';

// Images
import '../img/logo.svg';

// Stylesheets
import '../sass/main.scss';

// Modules
//import { hamburgerMenu } from './hamburger';
//hamburgerMenu();

//import { createChart } from './chart';
//createChart();

import { loadAuctionHouses, loadAuctionHousesCategories } from './auctionHouse';
loadAuctionHouses();
loadAuctionHousesCategories('categorySelect');


console.log('I am here');
