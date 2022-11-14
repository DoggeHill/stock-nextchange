import axios from 'axios';
export function loadAuctionHouses() {
  console.log('auction houses');
  // Make a request for a user with a given ID
  axios
    .get('http://localhost:8000/api/auctionsHouses')
    .then(function (response) {
      // handle success
      console.log(response);
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

export function loadAuctionHousesCategories() {
  console.log('auction houses categories');
  // Make a request for a user with a given ID
  axios
    .get('http://localhost:8000/api/auctionsHousesCategories')
    .then(function (response) {
      // handle success
      console.log(response);
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
