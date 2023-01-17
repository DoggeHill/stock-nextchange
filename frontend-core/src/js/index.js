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
import { initLoadItem } from './bid';
import { createParticles } from './particle';
import { header } from './header';

//* General forms
import { createForms } from './form';
createForms();

//? Global vars

const route = document.getElementsByTagName('body')[0].id;

if (route !== 'landingPage') {
  document.getElementById('userName').innerHTML = window.userTitle;
  document.getElementById('userEmail').innerHTML = window.userEmail;
}

if (!window.location.href.includes('home') && !localStorage.getItem('token'))
  window.location = 'home.html';

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
          localStorage.setItem('token', response.data.access_token);
          getUserCredentials(document.getElementById('login-email').value);
        })
        .catch(function (error) {
          console.error(error);
        })
        .then(function () {});
    });

    let btnRegister = document.getElementById('register');
    btnRegister.addEventListener('click', function (e) {
      let bodyFormData = new FormData();
      bodyFormData.append(
        'email',
        document.getElementById('signup-email').value
      );
      bodyFormData.append(
        'password',
        document.getElementById('signup-password').value
      );

      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/register',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(function (response) {
          localStorage.setItem('token', response.data.access_token);
          //getUserCredentials(document.getElementById('login-email').value);
          window.location = 'user.html';
        })
        .catch(function (error) {
          console.error(error);
        })
        .then(function () {});
    });

    break;

  case 'auctionHouse':
    loadAuctionHouses();
    break;
  case 'auctionHouseDetail':
    loadAuctionHousesDetail();
    break;
  case 'auctonBid':
    initLoadItem(1);
    break;
  case 'user':
    loadUserDashboard();
    break;
  case 'itemDetail':
    initLoadItem();
    break;
}

function getUserCredentials(email) {
  let bodyFormData = new FormData();
  bodyFormData.append('email', email);
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/user/findByEmail/',
    data: bodyFormData,
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(function (response) {
    localStorage.setItem('userId', response.data.userId);
    localStorage.setItem('userEmail', response.data.userEmail);
    localStorage.setItem('userTitle', response.data.userTitle);
  });
}
