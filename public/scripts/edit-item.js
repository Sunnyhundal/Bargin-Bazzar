document.addEventListener('DOMContentLoaded', function() {
  const deleteBtn = document.getElementById('deleteBtn');
  if (deleteBtn) {
      deleteBtn.addEventListener('click', function() {
          
          // Grabbing the item's id from the form's action attribute
          const itemId = document.querySelector('form').action.split('/').pop();

          // Add the item's ID to local storage
          const deletedItems = JSON.parse(localStorage.getItem("deletedItems") || "[]");
          deletedItems.push(itemId);
          localStorage.setItem("deletedItems", JSON.stringify(deletedItems));

          // Redirect to the landing page after "deleting"
          window.location.href = "http://localhost:8080/";
      });
  }
});


