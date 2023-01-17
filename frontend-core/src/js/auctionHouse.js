import axios from 'axios';
import { Modal, Toast } from 'bootstrap';

// vars
const auctionHouseRow = document.getElementById('auctionHouseRow');

const prefix = 'http://127.0.0.1:8000/api/auction';
const urls = {
  auctionHouse: prefix + '/auctionHouse',
  auctionHouseCat: prefix + '/auctionsHouseCat',
  findAuctionHouseById: prefix + '/getAuctionHouseById/'
};

export function loadAuctionHouses() {
  document.getElementById('userName').innerHTML = localStorage.getItem('userTitle');
  document.getElementById('userName').innerHTML = localStorage.getItem('userEmail');
  // listeners
  listeners();

  // Make a request for a user with a given ID
  axios
    .get(urls['auctionHouse'])
    .then(function (response) {
      auctionHouseRow.innerHTML = '';
      for (const auctionHouse of response.data) {
        auctionHouseRow.innerHTML += `
        <div class="col-lg-4 auction_house">
              <div class="auction_house__pull-up card">
                <div class="photo">
                  <img src="${auctionHouse.image}" alt="" srcset="" />
                </div>
                <div class="auction_house__content">
                  <a href="auction-house.html?${auctionHouse.id}">
                    <h2 class="auction_house__heading">${auctionHouse.title}</h2>
                  </a>
                  <span class="auction_house__type"><b>Type:</b> ${auctionHouse.auction_house_category.title}</span>
                  <span class="auction_house__description"><b>Description:</b> ${auctionHouse.description}</span>
                  <span class="auction_house__location"><b>Location:</b> ${auctionHouse.location}</span>
                  <a class="auction_house__button btn-text btn-text__arrow" editId="${auctionHouse.id}" href="javascript:void(0)">Edit</a>
                </div>
              </div>
            </div>
      `;
      }

      document.querySelectorAll('.auction_house__button').forEach((button) => {
        button.addEventListener('click', () => editAuctionHouse(button));
      });
    })
    .catch(function (error) {
      console.error(error);
    })
    .then(function () {});
}

export function loadAuctionHousesCategories(
  selector,
  callbackSelect,
  callBack = () => {}
) {
  // vars
  const selectAuctionHouseCat = document.getElementById(selector);
  // remove old elements
  selectAuctionHouseCat.innerHTML = '';
  // Make a request for a user with a given ID
  axios
    .get(urls['auctionHouseCat'])
    .then(function (response) {
      // handle success
      for (const auctionHouseCat of response.data) {
        selectAuctionHouseCat.add(
          new Option(auctionHouseCat.title, auctionHouseCat.id)
        );
      }
      // selectAuctionHouseCat.addEventListener('change', (event) => {
      //   loadAuctionHousesCategory(event.target.value);
      // });
      selectAuctionHouseCat.addEventListener('change', callbackSelect);
      callBack();
    })
    .catch(function (error) {
      console.error(error);
    });
}

function loadAuctionHousesCategory(categoryId) {
  axios
    .get('http://localhost:8000/api/auctionHousesCat/' + categoryId)
    .then(function (response) {
      // handle success
    })
    .catch(function (error) {
      // handle error
      console.err(error);
    });
}

function listeners() {
  document.getElementById('closeModal').addEventListener('click', function () {
    let myModalEl = document.getElementById('exampleModal');
    var modal = Modal.getInstance(myModalEl);
    modal.hide();
  });

  document
    .getElementById('createAuctionHouseModal')
    .addEventListener('click', createNewAuctionHousModal, false);

  document
    .getElementById('createAuctionHouse')
    .addEventListener('click', createNewAuctionHouse, false);
}

function sendCreateNewAuctionHouseCategory() {
  let payload = { title: 'John Doe', type: 'gardener' };
  axios
    .post('http://localhost:8000/api/auctionHousesCat/', payload)
    .then(function (response) {})
    .catch(function (error) {
      // handle error
      console.err(error);
    });
}

function createNewAuctionHousModal(event) {
  event.preventDefault();
  document.getElementById('newAuctionHoue').reset();
  loadAuctionHousesCategories('createNewAuctionHouseCatModal');

  const myModal = new Modal(document.getElementById('exampleModal'), null);
  myModal.show();
}

function createNewAuctionHouse(event) {
  const id = document.getElementById('createNewAuctionHouseId').value;
  const name = document.getElementById('createNewAuctionHouseName').value;
  const category = document.getElementById(
    'createNewAuctionHouseCatModal'
  ).value;
  const location = document.getElementById(
    'createNewAuctionHouseLocation'
  ).value;
  const imageUrl = document.getElementById('createNewAuctionHouseImage').value;
  const description = document.getElementById(
    'createNewAuctionHouseDescription'
  ).value;

  if (!name || !category || !location) {
    alert('Name, type, location or category is empty!');
  } else if (description.length > 2000) {
    alert('Description too long');
  }

  let bodyFormData = new FormData();
  bodyFormData.append('id', +id);
  bodyFormData.append('title', name);
  bodyFormData.append('image', imageUrl);
  bodyFormData.append('location', location);
  bodyFormData.append('auction_house_category_id', category);
  bodyFormData.append('description', description);

  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/auction/auctionHouse',
    data: bodyFormData,
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(function (response) {
    // handle success
    loadAuctionHouses();
    var myModalEl = document.getElementById('exampleModal');
    var modal = Modal.getInstance(myModalEl);
    modal.hide();

    document.getElementById('createNewForm').reset();
  });
}

function editAuctionHouse(button) {
  const buttonId = button.getAttribute('editid');

  axios
    .get(urls['findAuctionHouseById'] + buttonId)
    .then(function (response) {
      document.getElementById('createNewAuctionHouseId').value =
        response.data.id;
      document.getElementById('createNewAuctionHouseName').value =
        response.data.title;
      document.getElementById('createNewAuctionHouseImage').value =
        response.data.image;
      document.getElementById('createNewAuctionHouseLocation').value =
        response.data.location;
      document.getElementById('createNewAuctionHouseDescription').value =
        response.data.description;

      loadAuctionHousesCategories(
        'createNewAuctionHouseCatModal',
        null,
        function () {
          document.getElementById('createNewAuctionHouseCatModal').value =
            response.data.auction_house_category_id;
        }
      );

      const myModal = new Modal(document.getElementById('exampleModal'), null);
      myModal.show();

      document
        .getElementById('deleteAuctionHouse')
        .addEventListener('click', function () {
          axios
            .get(
              'http://localhost:8000/api/auction/deleteAuctionHouse/' + buttonId
            )
            .then(function (response) {
              loadAuctionHouses();
              var myModalEl = document.getElementById('exampleModal');
              var modal = Modal.getInstance(myModalEl);
              modal.hide();

              document.getElementById('createNewForm').reset();
              document.getElementById('auctionHouseEdit').style.display =
                'none';
            });
        });
    })
    .catch(function (error) {
      console.error(error);
    });
}
