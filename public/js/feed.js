const deleteButtons = document.querySelectorAll('.delete-button1');

const eachCommentClick = (event) => {
  event.preventDefault();
  
  const commentSection = event.target.parentNode.parentNode.querySelector('.form-group3');
  
  if (commentSection.style.display === 'block') {
    commentSection.style.display = 'none';
  } else {
    commentSection.style.display = 'block';
  }
};

deleteButtons.forEach(button => {
  button.addEventListener('click', eachCommentClick);
});

const commentForms = document.querySelectorAll('.form-group3');

commentForms.forEach(form => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const commentInput = form.querySelector('.comment-section');
    const comment = commentInput.value.trim();
    const reviewId = form.querySelector('[name="reviewId"]').value.trim(); // Retrieve the reviewId from the hidden input field
    
    if (comment && reviewId) {
      try {
        const response = await fetch('/api/users/comments', {
          method: 'POST',
          body: JSON.stringify({ comment, reviewId }), // Include the comment and reviewId in the request body
          headers: { 'Content-type': 'application/json' },
        });

        if (response.ok) {
          // Refresh the page to update the comments
          window.location.replace('/comments/' + reviewId);
        } else {
          // Handle the error case
          console.log('Error:', response.status);
        }
      } catch (err) {
        console.log(err);
      }
    }
    
    // Clear the comment input field
    commentInput.value = '';
  });
});

const viewCommentsButtons = document.querySelectorAll('.view-comments-button');

viewCommentsButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const reviewId = button.dataset.reviewId; // Retrieve the reviewId from the button's data attribute
    window.location.href = `/comments/${reviewId}`; // Navigate to the comments page for the specific review
  });
});

const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
        document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
  };

  document.querySelector('.dropdown2').addEventListener('click', logout);