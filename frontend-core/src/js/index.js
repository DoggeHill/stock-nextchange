/* eslint-disable no-case-declarations */

//? Vendor import
import * as bootstrap from 'bootstrap';
import axios from 'axios';
import Glide from '@glidejs/glide';
import 'particles.js/particles';
import FsLightbox from 'fslightbox';

//* Images
import logo from '../img/logo.svg';
import homeImage from '../img/exchange.png';
// logo
document.getElementById('logo').src = logo;

//* Stylesheets
import '../sass/main.scss';

import { loadAuctionHouses } from './auctionHouse';
import { loadAuctionHousesDetail } from './item';
import { loadUserDashboard } from './user';
import { loadItemById } from './bid';
import { createParticles } from './particle';
import { header } from './header';

//* General forms
import { createForms } from './form';
createForms();

//? Global vars
window.token = '';
window.userId = '';
window.userEmail = '';
window.userTitle = '';

const route = document.getElementsByTagName('body')[0].id;

if (route !== 'landingPage') {
  document.getElementById('userName').innerHTML = window.userTitle;
  document.getElementById('userEmail').innerHTML = window.userEmail;
}

//if (window.token == '') window.location = "home.html";

switch (route) {
  case 'landingPage':
    header();

    var glide = new Glide('#intro', {
      type: 'carousel',
      perView: 4,
      focusAt: 'center',
      breakpoints: {
        800: {
          perView: 2
        },
        480: {
          perView: 1
        }
      }
    });

    glide.mount();

    const particlesJS = window.particlesJS;

    particlesJS(createParticles());

    document.getElementById('stock-image').src = homeImage;

    let btnLogin = document.getElementById('login');
    btnLogin.addEventListener('click', function (e) {
      let bodyFormData = new FormData();
      bodyFormData.append(
        'email',
        document.getElementById('login-email').value
      );
      bodyFormData.append(
        'password',
        document.getElementById('login-password').value
      );

      console.log(bodyFormData);

      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/login',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(function (response) {
          window.token = response.data.access_token;
          getUserCredentials(document.getElementById('login-email').value);
        })
        .catch(function (error) {
          console.error(error);
        })
        .then(function () { });
    });

    break;

  case 'auctionHouse':
    loadAuctionHouses();
    break;
  case 'auctionHouseDetail':
    loadAuctionHousesDetail();
    break;
  case 'auctonBid':
    loadItemById(1);
    break;
  case 'user':
    loadUserDashboard();
    break;
}

function getUserCredentails(email) {
  axios
    .get('http://127.0.0.1:8000/user/findByEmail/' + email)
    .then(function (response) {
      window.userId = response.data.userId;
      window.userEmail = response.data.userEmail;
      window.userTitle = response.data.userTitle;
    });
    window.location = 'user.html';
}
