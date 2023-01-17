import axios from 'axios';
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
  itemCatById: prefixItem + '/findItemCategoryById/',
  createBid: prefixBid + '/createBid/'
};

const itemSelect = document.getElementById('itemSelect');
let itemId = localStorage.getItem('itemId') || 1;

let itemArr = [];

const itemTimer = document.getElementById('itemTimer');

export function initLoadItem() {
  window.addEventListener(
    'load',
    function () {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      axios
        .get(urls['itemList'])
        .then(function (response) {
          for (const item of response.data) {
            itemSelect.add(new Option(item.title, item.id));
          }
          itemSelect.addEventListener('change', function () {
            itemId = this.value;
            localStorage.setItem('itemId', itemId);
            window.location.reload();
          });
          loadItemById();
        })
        .catch(function (error) {
          console.error(error);
        })
        .then(function () {
          document.getElementById('userName').innerHTML =
            localStorage.getItem('userTitle');
          document.getElementById('useEmail').innerHTML =
            localStorage.getItem('userEmail');
        });
    },
    false
  );
}

export function loadItemById() {
  axios
    .get(urls['itemById'] + itemId)
    .then(function (response) {
      initData(response);
    })
    .catch(function (error) {
      console.error(error);
    })
    .then(function () {});
}

function initData(data) {
  let owner = document.getElementById('itemOwner');
  let dateStarted = document.getElementById('itemDateStarted');
  let dateFinish = document.getElementById('itemDateFinish');
  let itemImage = document.getElementById('item_image');
  let itemInitialPrice = document.getElementById('itemInitialPrice');
  let itemTitle = document.getElementById('itemTitle');

  owner.innerHTML = data.data.user_id;
  dateStarted.innerHTML = data.data.date_started;
  dateFinish.innerHTML = data.data.date_finish;
  itemImage.src = data.data.image;
  itemTitle.innerHTML = data.data.title;

  itemInitialPrice.innerHTML = data.data.initial_price;
  ///itemImage.innerHTML = data.data.image;

  specifyCatAuction(data.data.auction_house_id, data.data.item_category_id);

  // listeners
  let itemBidPlus = document.getElementById('itemBidPlus');
  let itemBidMinus = document.getElementById('itemBidMinus');
  let itemBidSubmit = document.getElementById('itemBidSubmit');
  let itemBidPrice = document.getElementById('itemBidPrice');

  itemBidSubmit.addEventListener(
    'click',
    function () {
      let bodyFormData = new FormData();
      bodyFormData.append(
        'price',
        +document.getElementById('itemBidPrice').innerHTML
      );
      bodyFormData.append('item_id', itemId);
      bodyFormData.append('user_id', 1);
      bodyFormData.append(
        'date',
        new Date().toISOString().slice(0, 19).replace('T', ' ')
      );

      axios({
        method: 'post',
        url: urls['createBid'],
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(function (response) {})
        .catch(function (error) {
          console.error(error);
        })
        .then(function () {});
    },
    false
  );

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
      document.getElementById(id).innerHTML =
        'EXPIRED!<br><h2 class="h2">Winner is Rodolfo Larson</h2>';

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
  let totalPrice = 0;
  axios
    .get(urls['bidList'])
    .then(function (response) {
      for (const item of response.data) {
        console.log(item);
        let dto = {
          price: item.price
        };
        totalPrice += item.price;
        itemArr.push(dto);
      }
      document.getElementById('itemTotalPrice').innerHTML = totalPrice;
    })
    .catch(function (error) {
      console.error(error);
    })
    .then(function () {
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

function refreshBids() {
  axios
    .get(urls['bidByItemId'] + itemId)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    })
    .then(function () {});

  axios
    .get(urls['maxBidByItemId'] + itemId)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    })
    .then(function () {});
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
