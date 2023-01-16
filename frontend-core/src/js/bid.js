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
  maxBidByItemId: prefixBid + '/findMaxByItemId/',
  itemCatById: prefixItem + '/findItemCategoryById/'
};

const goodToast = new Toast(document.getElementById('toastGood'), null);
const badToast = new Toast(document.getElementById('toastBad'), null);

let itemArr = [];

const itemTimer = document.getElementById('itemTimer');

export function loadItemById(id) {
  window.addEventListener(
    'load',
    function () {
      axios
        .get(urls['itemById'] + id)
        .then(function (response) {
          initData(response);
        })
        .catch(function (error) {
          console.error(error);
          badToast.show();
        })
        .then(function () {
          goodToast.show();
        });
    },
    false
  );
}

function initData(data) {
  let owner = document.getElementById('itemOwner');
  let dateStarted = document.getElementById('itemDateStarted');
  let dateFinish = document.getElementById('itemDateFinish');
  let itemImage = document.getElementById('itemImage');
  let itemInitialPrice = document.getElementById('itemInitialPrice');

  owner.innerHTML = data.data.user_id;
  dateStarted.innerHTML = data.data.date_started;
  dateFinish.innerHTML = data.data.date_finish;

  itemInitialPrice.innerHTML = data.data.initial_price;
  ///itemImage.innerHTML = data.data.image;

  specifyCatAuction(data.data.auction_house_id, data.data.item_category_id);

  // listeners
  let itemBidPlus = document.getElementById('itemBidPlus');
  let itemBidMinus = document.getElementById('itemBidMinus');
  let itemBidSubmit = document.getElementById('itemBidSubmit');
  let itemBidPrice = document.getElementById('itemBidPrice');

  itemBidPlus.addEventListener(
    'click',
    function () {
      let price = +itemBidPrice.innerHTML;
      price += 10;
      if (price > 100) return;
      itemBidPrice.innerHTML = price;
    },
    false
  );
  itemBidMinus.addEventListener(
    'click',
    function () {
      let price = +itemBidPrice.innerHTML;
      price -= 10;
      if (price < 10) return;
      itemBidPrice.innerHTML = price;
    },
    false
  );

  countDownTimer(data.data.date_finish, 'itemCountDown');
  loadItemBids();
  refreshBidsCaller();
}

function specifyCatAuction(cat, auction) {
  let auctionHouse = document.getElementById('itemAuctionHouse');
  let category = document.getElementById('itemCategory');

  axios.get(urls['findAuctionHouseById'] + auction).then(function (response) {
    auctionHouse.innerHTML = response.data.title;
  });

  axios.get(urls['itemCatById'] + auction).then(function (response) {
    category.innerHTML = response.data.title;
  });
}

function countDownTimer(dt, id) {
  var end = new Date(dt);

  var _second = 1000;
  var _minute = _second * 60;
  var _hour = _minute * 60;
  var _day = _hour * 24;
  var timer;

  function showRemaining() {
    var now = new Date();
    var distance = end - now;
    if (distance < 0) {
      clearInterval(timer);
      document.getElementById('itemBidSubmit').remove();
      document.getElementById(id).innerHTML = 'EXPIRED!';

      return;
    }
    var days = Math.floor(distance / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);

    document.getElementById(id).innerHTML = days + 'days ';
    document.getElementById(id).innerHTML += hours + 'hrs ';
    document.getElementById(id).innerHTML += minutes + 'mins ';
    document.getElementById(id).innerHTML += seconds + 'secs';
  }

  timer = setInterval(showRemaining, 1000);
}

function loadItemBids() {
  axios
    .get(urls['bidList'])
    .then(function (response) {
      for (const item of response.data) {
        console.log(item);
        let dto = {
          price: item.price
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

  return itemArr;
}

async function loadItemBidsArr() {
  let aItemArr = [];
  await axios.get(urls['bidList']).then(function (response) {
    for (const item of response.data) {
      console.log(item);
      let dto = {
        price: item.price
      };

      aItemArr.push(dto);
    }
  });

  return aItemArr;
}

function loadDataGrid() {
  console.log('arr ' + itemArr);
  const grid = new Grid({
    columns: ['price'],
    data: itemArr
  }).render(document.getElementById('wrapper'));

  let intervalId = window.setInterval(function () {
    // lets update the config
    console.log('here');
    let dataS = loadItemBidsArr().then((res) => {
      dataS = [{ price: 15 }];
      console.log(dataS);
      let data = grid
        .updateConfig({
          data: res
        })
        .forceRender();
    });
  }, 5000);
}

function refreshBids(id) {
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
    });
}

function refreshBidsCaller(id) {
  let x = 5;
  let intervalId = window.setInterval(function () {
    itemTimer.innerHTML = x;
    if (x-- == 0) {
      x = 5;
      itemTimer.innerHTML = 'Refreshing... ⏱️';
      refreshBids(id);
    }
  }, 1000);
}
