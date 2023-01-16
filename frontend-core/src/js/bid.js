import axios from 'axios';
import { Modal, Toast } from 'bootstrap';
import { Grid } from 'gridjs';

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
  itemById: prefixItem + '/findById/',
  bidByItemId: prefixBid + '/findByItemId/',
  maxBidByItemId: prefixBid + '/findMaxByItemId/'
};

//const auctionHouseSelect = document.getElementById('auctionHouseSelect');

const goodToast = new Toast(document.getElementById('toastGood'), null);
const badToast = new Toast(document.getElementById('toastBad'), null);

let itemArr = [];

export function loadItemBids() {
  axios
    .get(urls['bidList'])
    .then(function (response) {
      for (const item of response.data) {
        console.log(item);
        let dto = {
          description: item.description,
          image: item.image,
          initial_price: item.initial_price,
          title: item.title,
          user: item.user.name
        };

        itemArr.push(dto);
      }
    })
    .catch(function (error) {
      console.error(error);
      badToast.show();
    })
    .then(function () {
      goodToast.show();
      loadDataGrid();
    });

  console.log(itemArr);
}

function loadDataGrid() {
  const grid = new Grid({
    columns: ['title', 'user', 'initial_price', 'description'],
    data: itemArr
  }).render(document.getElementById('wrapper'));
}

export function loadItemById(id) {
  axios
    .get(urls['itemById'] + id)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
      badToast.show();
    })
    .then(function () {
      goodToast.show();
      refreshBids(id);
    });
}

function refreshBids(id) {
  const interval = setInterval(function () {
    axios
      .get(urls['bidByItemId'] + id)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
        badToast.show();
      })
      .then(function () {
        goodToast.show();
        refreshBids(id);
      });

      axios
      .get(urls['maxBidByItemId'] + id)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
        badToast.show();
      })
      .then(function () {
        goodToast.show();
        refreshBids(id);
      });

  }, 5000);
}
