import axios from 'axios';
import { Modal, Toast, Popover } from 'bootstrap';

// vars
const auctionHouseRow = document.getElementById('auctionHouseRow');

export function loadAuctionHouses() {

  // do not load on all the pages
  if(location.pathname.split("/").slice(-1) != 'auctionHouse' ) return;

  document.getElementById('auctionHouseEdit').style.display = 'none';

  // listeners
  listeners();

  // Make a request for a user with a given ID
  axios
    .get('http://localhost:8000/api/auctionsHouses')
    .then(function (response) {
      auctionHouseRow.innerHTML = '';
      for (const auctionHouse of response.data) {
        auctionHouseRow.innerHTML += `
        <div class="col-lg-4 auction_house">
              <div class="auction_house__pull-up">
                <div class="photo">
                  <img src="https://picsum.photos/150/150" alt="" srcset="" />
                </div>
                <div class="auction_house__content">
                  <h2 class="auction_house__heading">${auctionHouse.title}</h2>
                  <span class="auction_house__type"><b>Type:</b> ${auctionHouse.type}</span>
                  <span class="auction_house__description"><b>Description:</b> ${auctionHouse.description}</span>
                  <span class="auction_house__location"><b>Location:</b> ${auctionHouse.location}</span>
                  <a class="auction_house__button btn-text btn-text__arrow" editId="${auctionHouse.id}" href="javascript:void(0)">Details</a>
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
      // handle error
      console.log(error);
    })
    .then(function () {
      console.log('executed');
      // always executed
    });
}

export function loadAuctionHousesCategories(selector, callbackSelect, callBack) {
  console.log('auction houses categories');

  // vars
  const selectAuctionHouseCat = document.getElementById(selector);
  // remove old elements
  selectAuctionHouseCat.innerHTML = '';
  // Make a request for a user with a given ID
  axios
    .get('http://localhost:8000/api/auctionsHousesCat')
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
      // handle error
      // TODO: error handler
      console.log(error);
    })
    .then(function () {
      console.log('executed');
      // always executed
    });
}

function loadAuctionHousesCategory(categoryId) {
  console.log('auction houses category detail');

  axios
    .get('http://localhost:8000/api/auctionsHousesCat/' + categoryId)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      // TODO: error handler
      console.log(error);
    })
    .then(function () {
      console.log('executed');
      // always executed
    });
}

function listeners() {
  // document
  //   .getElementById('createAuctionHouseCategory')
  //   .addEventListener('click', sendCreateNewAuctionHouseCategory, false);

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
    .post('http://localhost:8000/api/auctionsHousesCat/', payload)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      // TODO: error handler
      console.log(error);
    })
    .then(function () {
      console.log('executed');
      // always executed
    });
}

function createNewAuctionHousModal(event) {
  event.preventDefault();
  loadAuctionHousesCategories('createNewAuctionHouseCatModal');
  const myModal = new Modal(document.getElementById('exampleModal'), null);
  myModal.show();
}

function createNewAuctionHouse(event) {
  const name = document.getElementById('createNewAuctionHouseName').value;
  const type = document.getElementById('createNewAuctionHouseType').value;
  const category = document.getElementById(
    'createNewAuctionHouseCatModal'
  ).value;
  const location = document.getElementById(
    'createNewAuctionHouseLocation'
  ).value;
  const description = document.getElementById(
    'createNewAuctionHouseDescription'
  ).value;

  if (!name || !type || !category || !location) {
    alert("Name, type, location or category is empty!");
  } else if (description.length > 2000) {
    alert("Description too long");
  } 

  const payLoad = {
    id: 0,
    title: name,
    type: type,
    location: location,
    auction_house_category_id: category,
    description: description,
    auctions: null
  };

  axios
    .post('http://localhost:8000/api/auctionsHouse/', payLoad)
    .then(function (response) {
      // handle success
      console.log(response);

      loadAuctionHouses();
      var myModalEl = document.getElementById('exampleModal');
      var modal = bootstrap.Modal.getInstance(myModalEl);
      modal.hide();

      document.getElementById('createNewForm').reset();

    })
    .catch(function (error) {
      // handle error
      // TODO: error handler
      console.log(error);
    })
    .then(function () {
      console.log('executed');
      // always executed
    });
}

function editAuctionHouse(button) {

  document.getElementById('auctionHouseEdit').style.display = 'block';

  const buttonId = button.getAttribute('editid');

  axios
    .get('http://localhost:8000/api/getAuctionHouseById/' + buttonId)
    .then(function (response) {
      document.getElementById('editNewAuctionHouseName').value =
        response.data.title;
      document.getElementById('editNewAuctionHouseType').value =
        response.data.type;
      document.getElementById('editNewAuctionHouseLocation').value =
        response.data.location;
      document.getElementById('editNewAuctionHouseDescription').value =
        response.data.description;

      loadAuctionHousesCategories('editNewAuctionHouseCat', null,  function () {
        console.log('here');
        document.getElementById('editNewAuctionHouseCat').value = response.data.auction_house_category_id;
      });

      // handle success
      console.log(response);

      document
        .getElementById('deleteAuctionHouse')
        .addEventListener('click', function () {
          axios
            .get('http://localhost:8000/api/deleteAuctionHouse/' + buttonId)
            .then(function (response) {
              document.getElementById('auctionHouseEdit').style.display = 'none';
              loadAuctionHouses();
            });
        });

      document
        .getElementById('editAuctionHouse')
        .addEventListener('click', function () {
          const payLoad = {
            id: +buttonId,
            title:document.getElementById('editNewAuctionHouseName').value,
            type: document.getElementById('editNewAuctionHouseType').value,
            location:  document.getElementById('editNewAuctionHouseLocation').value,
            auction_house_category_id: document.getElementById('editNewAuctionHouseCat').value ,
            description: document.getElementById('editNewAuctionHouseDescription').value,
            auctions: null
          };
          axios
            .post('http://localhost:8000/api/auctionsHouse/', payLoad)
            .then(function (response) {
              // handle success
              console.log(response);

              loadAuctionHouses();
            });
        });
    })
    .catch(function (error) {
      // handle error
      // TODO: error handler
      console.log(error);
    })
    .then(function () {
      console.log('executed');
      // always executed
    });
}
