/* eslint-disable no-undef */

$(document).ready(() => {
  $.ajax({
    method: 'GET',
    userId: {},
    url: 'http://localhost:8080/api/landing'
  })
    .then((featured) => {
      renderItemCards('.featured-items', featured);
    });

  $('#show-all-items').on('click', () => {
    window.location.href = "http://localhost:8080/api/items";
  });
});
