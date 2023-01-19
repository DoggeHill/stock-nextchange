import axios from 'axios';
import { Grid, h } from 'gridjs';
import { createChart } from './chart';
import { Modal } from 'bootstrap';
import { goodToast, badToast } from './toast';

/**
 * GridJS: https://gridjs.io/
 */

// vars
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
  itemListCategory: prefixItem + '/listCategory',
  itemCatById: prefixItem + '/findItemCategoryById/',
  editItem: prefixItem + '/editItem/',
  findItemById: prefixItem + '/findById/',
  delete: prefixItem + '/delete/'
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
          id: item.id,
          description: item.description,
          image: item.image,
          initial_price: item.initial_price,
          title: item.title,
          user: item.name
        };
        if (dto.initial_price && dto.initial_price > 0) {
          userArr.push(dto.user);
          priceArr.push(dto.initial_price);
          itemArr.push(dto);
        }
      }
    })
    .catch(function (error) {
      console.error(error);
    })
    .then(function () {
      console.log(itemArr);
      loadDataGrid();
      // handle no chart
      if (chart) {
        chart.destroy();
        chart = createChart(userArr, priceArr);
      } else {
        chart = createChart(userArr, priceArr);
      }
    });

  function loadDataGrid() {
    console.log(itemArr);
    document.getElementById('wrapper').innerHTML = '';
    const grid = new Grid({
      columns: [
        'Title',
        'User',
        'Initial_Price',
        'Description',
        {
          name: 'id',
          hidden: true
        },
        {
          name: 'Actions',
          formatter: (cell, row) => {
            return h(
              'a',
              {
                className:
                  'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
                onClick: () => editItem(row.cells[4].data)
              },
              'Edit'
            );
          }
        }
      ],
      data: itemArr
    })
      .render(document.getElementById('wrapper'))
      .updateConfig({
        data: itemArr
      })
      .forceRender();
  }
}

function initData() {
  const title = document.getElementById('auctionHouseName');
  const description = document.getElementById('auctionHouseDescription');
  const location = document.getElementById('auctionHouseLocation');
  const dateCreated = document.getElementById('auctionHouseDateCreated');
  const itemCat = document.getElementById('auctionHouseCategory');
  const image = document.getElementById('auctionHouseImage');

  document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('newAuctionHoue').reset();
    let myModalEl = document.getElementById('exampleModal');
    var modal = Modal.getInstance(myModalEl);
    modal.hide();
  });

  document.getElementById('userName').innerHTML =
    localStorage.getItem('userTitle');
  document.getElementById('userEmail').innerHTML =
    localStorage.getItem('userEmail');

  document.getElementById('new-item').addEventListener('click', addNewItem);

  document
    .getElementById('createItem')
    .addEventListener('click', createNewItem, false);

  document
    .getElementById('deleteItem')
    .addEventListener('click', deleteItem, false);

  axios
    .get(urls['findAuctionHouseById'] + auctionHouseId)
    .then(function (response) {
      title.innerHTML = response.data.title;
      description.innerHTML = response.data.description;
      location.innerHTML = response.data.location;
      dateCreated.innerHTML = response.data.created_at;
      image.src = response.data.image;
    });

  axios.get(urls['itemCatById'] + auctionHouseId).then(function (response) {
    console.log(response.data);
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

function editItem(item) {
  let name = document.getElementById('createItemname');
  let itemId = document.getElementById('createItemId');
  let initialPrice = document.getElementById('createItemInitialPrice');
  let imageUrl = document.getElementById('createItemImageUrl');
  let description = document.getElementById('createItemDescription');
  let auctionHouse = document.getElementById('auctionHouseSelect');
  let categoryItem = document.getElementById('createItemCategroy');
  let dateStarted = document.getElementById('createItemDateStarted');
  let dateFinish = document.getElementById('createItemDateFinish');
  let user = localStorage.getItem('userId');
  axios
    .get(urls['findItemById'] + item)
    .then(function (response) {
      if (response.data.user_id != localStorage.getItem('userId')) {
        badToast('This is not your item');
        return;
      }
      itemId.value = response.data.id;
      initialPrice.value = response.data.initial_price;
      imageUrl.value = response.data.image;
      description.value = response.data.description;
      name.value = response.data.title;
      categoryItem.value = response.data.item_category_id;
      dateStarted.value = response.data.date_started;
      dateFinish.value = response.data.date_finish;

      initialPrice.disabled = true;
      dateStarted.disabled = true;
      dateFinish.disabled = true;
      categoryItem.disabled = true;

      const myModal = new Modal(document.getElementById('exampleModal'), null);
      myModal.show();
    })
    .catch(function (error) {
      badToast(error);
      console.error(error);
    });
}

function addNewItem() {
  const categoryItem = document.getElementById('createItemCategroy');

  axios.get(urls['itemListCategory']).then(function (response) {
    for (const itemCat of response.data) {
      categoryItem.add(new Option(itemCat.title, itemCat.id));
    }
  });

  const myModal = new Modal(document.getElementById('exampleModal'), null);
  myModal.show();
}

function deleteItem() {
  const id = document.getElementById('createItemId').value;
  if (!id) {
    badToast('Item not selected');
    return;
  }
  axios({
    method: 'get',
    url: urls['delete'] + id
  })
    .then(function () {
      // handle success
      let myModalEl = document.getElementById('exampleModal');
      let modal = Modal.getInstance(myModalEl);
      modal.hide();
      goodToast('Item deleted!');
      document.getElementById('newAuctionHoue').reset();
      loadAuctionHouseDetail();
    })
    .catch(function (error) {
      badToast(error);
      console.error(error);
    })
    .then(function () {});
}

function createNewItem(event) {
  let toDate = new Date();
  let bodyFormData = new FormData();

  const id = document.getElementById('createItemId').value;

  const name = document.getElementById('createItemname').value;
  const initialPrice = document.getElementById('createItemInitialPrice').value;
  const imageUrl = document.getElementById('createItemImageUrl').value;
  const description = document.getElementById('createItemDescription').value;
  const auctionHouse = document.getElementById('auctionHouseSelect').value;
  const categoryItem = document.getElementById('createItemCategroy').value;
  const dateStarted = document.getElementById('createItemDateStarted').value;
  const dateFinish = document.getElementById('createItemDateFinish').value;

  if (id) {
    bodyFormData.append('id', +id);
    bodyFormData.append('title', name);
    bodyFormData.append('image', imageUrl);
    bodyFormData.append('description', description);
  } else {
    if (initialPrice < 0 || initialPrice > 100000) {
      badToast('Price range is (10-10000');
    } else if (!name) {
      badToast('Name is required');
    } else if (new Date(dateStarted).getTime() <= toDate.getTime()) {
      badToast('Min date is today!');
    } else if (
      new Date(dateStarted).getTime() > new Date(dateFinish).getTime()
    ) {
      badToast('Finish date is after start Date!');
    } else {
      // bodyFormData.append('id', +id);
      bodyFormData.append('title', name);
      bodyFormData.append('initial_price', +initialPrice);
      bodyFormData.append('image', imageUrl);
      bodyFormData.append('description', description);
      bodyFormData.append('auction_house_id', auctionHouse);
      bodyFormData.append('item_category_id', categoryItem);
      bodyFormData.append('date_started', dateStarted);
      bodyFormData.append('date_finish', dateFinish);
      bodyFormData.append('user_id', localStorage.getItem('userId'));
    }
  }
  axios({
    method: 'post',
    url: urls['editItem'],
    data: bodyFormData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
    .then(function () {
      // handle success
      let myModalEl = document.getElementById('exampleModal');
      let modal = Modal.getInstance(myModalEl);
      modal.hide();
      goodToast('Item created!');
      document.getElementById('newAuctionHoue').reset();
    })
    .catch(function (error) {
      badToast(error);
      console.error(error);
    })
    .then(function () {});
}
