/* eslint-disable no-undef */

$(document).ready(() => {
  $.ajax({
    method: 'GET',
    url: '/favorites/6' // userId is hardcoded for now
  })
    .then((favorites) => {
      renderItemCards('.favorites-list', favorites);
    });
});
