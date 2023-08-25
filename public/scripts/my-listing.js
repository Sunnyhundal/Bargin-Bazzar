/* eslint-disable no-undef */

$(document).ready(() => {
  const cookie = document.cookie && document.cookie.split(';');
  const userId = cookie && cookie[0].split('=')[1];

  $.ajax({
    method: 'GET',
    userId: {},
    url: `http://localhost:8080/api/items/mylisting/${userId}`
  })
    .then((items) => {
      renderItemCards('.my-listing', items, true);
    });
});
