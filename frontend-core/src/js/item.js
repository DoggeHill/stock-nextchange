import axios from 'axios';
import { Modal, Toast } from 'bootstrap';
import { Grid } from 'gridjs';

/**
 * GridJS: https://gridjs.io/
 */

// vars

const prefix = 'http://127.0.0.1:8000/api/auction';
const prefixItem = 'http://127.0.0.1:8000/api/item';
const urls = {
  auctionHouse: prefix + '/auctionHouse',
  auctionHouseCat: prefix + '/auctionsHouseCat',
  findAuctionHouseById: prefix + '/getAuctionHouseById/',
  itemList: prefixItem + '/list'
};

const auctionHouseSelect = document.getElementById('auctionHouseSelect');

const goodToast = new Toast(document.getElementById('toastGood'), null);
const badToast = new Toast(document.getElementById('toastBad'), null);

export function loadAuctionHouseDetail() {
  loadAuctionHouses();
  let itemArr = [];

  axios
    .get(urls['itemList'])
    .then(function (response) {
      for (const item of response.data) {
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

  function loadDataGrid() {
    const grid = new Grid({
      columns: ['title', 'user', 'initial_price', 'description'],
      data: itemArr
    }).render(document.getElementById('wrapper'));
  }
}

export function loadAuctionHouses() {
  // Make a request for a user with a given ID
  axios
    .get(urls['auctionHouse'])
    .then(function (response) {
      for (const auctionHouse of response.data) {
        auctionHouseSelect.add(new Option(auctionHouse.title, auctionHouse.id));
      }
    })
    .catch(function (error) {
      console.error(error);
      badToast.show();
    })
    .then(function () {
      goodToast.show();
    });
}
