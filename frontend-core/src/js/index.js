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
import { goodToast, badToast } from './toast';

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
    glide();

    const particlesJS = window.particlesJS;
    particlesJS(createParticles());

    document.getElementById('stock-image').src = homeImage;

    document.getElementById('login').addEventListener('click', login);
    document.getElementById('register').addEventListener('click', register);
    //document.getElementById('logoutButton').addEventListener('click', logout);

    if (localStorage.getItem('userId')) {
      document.getElementById('sectionLogin').innerHTML =
        '<h2 class="h2">Hello 👋, ' +
        localStorage.getItem('userTitle') +
        '</h2><br><a href="/user.html">Dashboard</a>';
    }

    break;

  case 'auctionHouse':
    loadAuctionHouses();
    break;
  case 'auctionHouseDetail':
    loadAuctionHousesDetail();
    document.getElementById('sideMenu').addEventListener('click', function () {
      let menu = document.getElementById('panelMenu');
      menu.classList.toggle('hidden');
    });
    break;
  case 'auctonBid':
    document.getElementById('sideMenu').addEventListener('click', function () {
      let menu = document.getElementById('panelMenu');
      menu.classList.toggle('hidden');
    });
    initLoadItem(1);
    break;
  case 'user':
    loadUserDashboard();
    break;
  case 'itemDetail':
    initLoadItem();
    break;
}

async function getUserCredentials(email) {
  let bodyFormData = new FormData();
  bodyFormData.append('email', email);
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/user/findByEmail/?email=' + email,
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(function (response) {
    if (response.data.id) {
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('userEmail', response.data.email);
      localStorage.setItem('userTitle', response.data.name);
      document.getElementById('sectionLogin').innerHTML =
        '<h2 class="h2">Hello 👋, ' +
        localStorage.getItem('userTitle') +
        '</h2><br><a href="/user.html>Dashboard</a>"';
    } else {
      badToast('Error occured! Cannot get user Data');
    }
  });
}

function login() {
  let bodyFormData = new FormData();
  bodyFormData.append('email', document.getElementById('login-email').value);
  bodyFormData.append(
    'password',
    document.getElementById('login-password').value
  );

  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/login',
    data: bodyFormData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
    .then(function (response) {
      if (response.data.status === 'error') {
        badToast('Wrong credentails');
        document.getElementById('loginForm').reset();
      } else {
        goodToast('Logged in!');
        localStorage.setItem('token', response.data.access_token);
        let dataS = getUserCredentials(
          document.getElementById('login-email').value
        ).then((res) => {
          document.getElementById('loginForm').reset();
          //window.location = 'user.html';
        });
      }
    })
    .catch(function (error) {
      badToast('Error occured!');
      console.error(error);
    })
    .then(function () {});
}

function register() {
  let bodyFormData = new FormData();
  bodyFormData.append('email', document.getElementById('signup-email').value);
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
      goodToast('Logged in!');
      localStorage.setItem('token', response.data.access_token);
      let dataS = getUserCredentials(
        document.getElementById('login-email').value
      ).then((res) => {
        document.getElementById('signUpForm').reset();
        window.location = 'user.html';
      });
    })
    .catch(function (error) {
      badToast('Error occured!');
      console.error(error);
    })
    .then(function () {});
}

function glide() {
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
}

function logout() {}
