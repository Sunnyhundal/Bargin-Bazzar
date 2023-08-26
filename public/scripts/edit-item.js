document.addEventListener('DOMContentLoaded', function() {
  const deleteBtn = document.getElementById('deleteBtn');
  if (deleteBtn) {
      deleteBtn.addEventListener('click', function(e) {
          e.preventDefault(); // prevent default action, which might submit the form

          // Grabbing the item's id from the form's action attribute
          const itemId = document.querySelector('form').action.split('/').pop();

          // Send DELETE request to the server
          fetch(`/items/${itemId}`, {
              method: 'DELETE',
          })
          .then(response => response.json())
          .then(data => {
              console.log(data.message);
              
              // Add the item's ID to local storage
              const deletedItems = JSON.parse(localStorage.getItem("deletedItems") || "[]");
              deletedItems.push(itemId);
              localStorage.setItem("deletedItems", JSON.stringify(deletedItems));

              // Redirect to the landing page after deleting
              window.location.href = "http://localhost:8080/";
          })
          .catch(error => {
              console.error('Error:', error);
          });
      });
  }
});