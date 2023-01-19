import axios from 'axios';
import { Modal, Toast } from 'bootstrap';
import { Grid } from 'gridjs';
import * as bootstrap from 'bootstrap';

/**
 * GridJS: https://gridjs.io/
 */

// vars

const prefix = 'http://127.0.0.1:8000/api/auction';
const prefixItem = 'http://127.0.0.1:8000/api/item';
const prefixBid = 'http://127.0.0.1:8000/api/bid';
const urls = {
  auctionHouse: prefix + '/auctionHouse',
  auctionHouseCat: prefix + '/auctionsHouseCat',
  findAuctionHouseById: prefix + '/getAuctionHouseById/',
  itemList: prefixItem + '/list',
  bidList: prefixBid + '/list',
  stats: prefixBid + '/stats',
  itemById: prefixItem + '/findById/',
  itemByUserId: prefixItem + '/findByUserId/',
  bidByUserId: prefixBid + '/findByUserId/',
  bidByItemId: prefixBid + '/findByItemId/',
  maxBidByItemId: prefixBid + '/findMaxByItemId/',
  itemCatById: prefixItem + '/findItemCategoryById/'
};

let userId = 1;

export function loadUserDashboard() {
  window.addEventListener(
    'load',
    function () {
      initData();
    },
    false
  );
}

let itemArr = [];
let priceArr = [];
let bidArr = [];

function initData() {
  let statMin = document.getElementById('statMax');
  let statMax = document.getElementById('statMin');
  let statCount = document.getElementById('statCount');

  axios.get(urls['stats']).then(function (response) {
    statMin.innerHTML = response.data.min;
    statMax.innerHTML = response.data.max;
    statCount.innerHTML = response.data.count;
  });

  document.getElementById('userName').innerHTML =
    localStorage.getItem('userTitle');
  document.getElementById('userEmail').innerHTML =
    localStorage.getItem('userEmail');

  axios
    .get(urls['itemByUserId'] + userId)
    .then(function (response) {
      for (const item of response.data) {
        let dto = {
          description: item.description,
          image: item.image,
          initial_price: item.initial_price,
          title: item.title
        };
        priceArr.push(dto.initial_price);
        itemArr.push(dto);
      }
    })
    .catch(function (error) {
      console.error(error);
    })
    .then(function () {
      loadDataGrid();
    });

  axios
    .get(urls['bidByUserId'] + userId)
    .then(function (response) {
      for (const item of response.data) {
        console.log(item);
        let dto = {
          price: item.price,
          date: item.date
        };
        bidArr.push(dto);
      }
    })
    .catch(function (error) {
      console.error(error);
    })
    .then(function () {
      loadDataBidGrid();
    });
}

function loadDataGrid() {
  document.getElementById('wrapperItems').innerHTML = '';
  const grid = new Grid({
    columns: ['title', 'initial_price', 'description'],
    data: itemArr
  }).render(document.getElementById('wrapperItems'));
}

function loadDataBidGrid() {
  document.getElementById('wrapperBids').innerHTML = '';
  const grid = new Grid({
    columns: ['price', 'date'],
    data: bidArr
  }).render(document.getElementById('wrapperBids'));
}
