/* eslint-disable no-undef */


$(document).ready(() => {
  function getCookieUserId () {
    const cookie = document.cookie.split(';');
    const cookieUserId = cookie[0].split('=')[1];
    return cookieUserId;
  }
  console.log(getCookieUserId());


  $.ajax({
    method: 'GET',
    userId: {},
    url: '/favorites/'+getCookieUserId() // userId is hardcoded for now
  })
    .then((favorites) => {
      renderItemCards('.favorites-list', favorites);
    });
});
