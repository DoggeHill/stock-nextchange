import axios from 'axios';
import { Grid } from 'gridjs';
import { createChart } from './chart';

/**
 * GridJS: https://gridjs.io/
 */

// vars
// TODO:
let auctionHouseId = 1;
let chart;

const prefix = 'http://127.0.0.1:8000/api/auction';
const prefixItem = 'http://127.0.0.1:8000/api/item';
const urls = {
  auctionHouse: prefix + '/auctionHouse',
  auctionHouseCat: prefix + '/auctionsHouseCat',
  findAuctionHouseById: prefix + '/getAuctionHouseById/',
  findItemByAuctionHouseId: prefixItem + '/findByAuctionHouseId/',
  itemList: prefixItem + '/list',
  itemCatById: prefixItem + '/findItemCategoryById/'
};

const auctionHouseSelect = document.getElementById('auctionHouseSelect');

export function loadAuctionHouseDetail() {
  initData();
  let itemArr = [];
  let userArr = [];
  let priceArr = [];

  axios
    .get(urls['findItemByAuctionHouseId'] + auctionHouseId)
    .then(function (response) {
      for (const item of response.data) {
        let dto = {
          description: item.description,
          image: item.image,
          initial_price: item.initial_price,
          title: item.title,
          user: item.name
        };
        userArr.push(dto.user);
        priceArr.push(dto.initial_price);

        itemArr.push(dto);
      }
    })
    .catch(function (error) {
      console.error(error);
    })
    .then(function () {
      loadDataGrid();
      if (chart) {
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
          dataset.data.pop();
        });
        chart.data.labels.push(userArr);
        chart.data.datasets.forEach((dataset) => {
          dataset.data.push(priceArr);
        });
        chart.update();
      } else {
        // handle no chart
        chart = createChart(userArr, priceArr);
      }
    });

  function loadDataGrid() {
    document.getElementById('wrapper').innerHTML = '';
    const grid = new Grid({
      columns: ['title', 'user', 'initial_price', 'description'],
      data: itemArr
    }).render(document.getElementById('wrapper')).forceRender();
  }
}

function initData() {
  const title = document.getElementById('auctionHouseName');
  const description = document.getElementById('auctionHouseDescription');
  const location = document.getElementById('auctionHouseLocation');
  const dateCreated = document.getElementById('auctionHouseDateCreated');
  const itemCat = document.getElementById('auctionHouseCategory');
  const image = document.getElementById('auctionHouseImage');

  console.log(image);

  axios
    .get(urls['findAuctionHouseById'] + auctionHouseId)
    .then(function (response) {
      console.log(response);
      title.innerHTML = response.data.title;
      description.innerHTML = response.data.description;
      location.innerHTML = response.data.location;
      dateCreated.innerHTML = response.data.created_at;
      image.src = response.data.image;
    });

  axios.get(urls['itemCatById'] + auctionHouseId).then(function (response) {
    itemCat.innerHTML = response.data.title;
  });
}

export function loadAuctionHousesDetail() {
  // Make a request for a user with a given ID
  axios
    .get(urls['auctionHouse'])
    .then(function (response) {
      for (const auctionHouse of response.data) {
        auctionHouseSelect.add(new Option(auctionHouse.title, auctionHouse.id));
      }
      auctionHouseSelect.addEventListener('change', function () {
        auctionHouseId = this.value;
        loadAuctionHouseDetail();
      });
      loadAuctionHouseDetail();
    })
    .catch(function (error) {
      console.error(error);
    })
    .then(function () {});
}
