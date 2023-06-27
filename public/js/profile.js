const createPost = document.getElementById('dropdownMenu3');
const closePost = document.getElementById('submit-button1');
const revealInfo = document.getElementById('dropdownMenu4');

function chooseProfileImage() {
    document.getElementById('profileImageInput').click();
  }
  
  async function uploadProfileImage(event) {
    const file = event.target.files[0];
    
    if (!file) {
      return;
    }
    
    const formData = new FormData();
    formData.append('profileImage', file);
    
    try {
      const response = await fetch('/api/users/updateProfileImage', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        document.getElementById('blank-profile').src = URL.createObjectURL(file);
        window.location.reload();
      } else {
        console.log('Failed to update profile image.');
      }
    } catch (error) {
      console.log('Error occurred while updating profile image:', error);
    }
  }

  const reviewForm = async (event) => {
    event.preventDefault();
  
    const topic = document.querySelector('#review-topic').value.trim();
    const description = document.querySelector('#review-description').value.trim();
    const postImage = document.querySelector('#postImage').files[0]; // Use 'files' instead of 'file'
  
    if (topic && description) {
      const formData = new FormData(); // Create a new FormData object
      formData.append('topic', topic); // Append form data
      formData.append('description', description);
      formData.append('postImage', postImage);
  
      try {
        const response = await fetch('/api/users/reviews', {
          method: 'POST',
          body: formData, // Pass the FormData object as the body
        });
  
        if (response.ok) {
          console.log('Review created!');
          document.getElementById('validation-message').textContent = 'Post Created Successfully!';
          document.location.replace('/feed');
        } else {
          // Handle error cases
          const errorMessage = await response.text();
          console.log(errorMessage);
          // Display an appropriate error message to the user
        }
      } catch (err) {
        console.log(err);
        // Handle any network or server errors
      }
    }
  };
  
revealInfo.addEventListener('click', () => {
  if(document.getElementById('game-title6').style.display === 'block') {
    document.getElementById('game-title6').style.display = 'none';
  } else {
    document.getElementById('game-title6').style.display = 'block';
  }
})

// event listener for when the create post button is click, the section will be displayed
createPost.addEventListener('click', () => {
  document.getElementById('game-title4').style.display = 'block';
});

// event listenerf or when the button clicked, the section for creating post disappears
closePost.addEventListener('click', () => {
  document.getElementById('game-title4').style.display = 'none';
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

  function previewImage(event) {
    const input = event.target;
    const preview = document.getElementById('imagePreview');
  
    if (input.files && input.files[0]) {
      const reader = new FileReader();
  
      reader.onload = function(e) {
        preview.src = e.target.result;
        preview.style.display = 'block'; // Show the preview image
      };
  
      reader.readAsDataURL(input.files[0]);
    } else {
      preview.src = '#';
      preview.style.display = 'none'; // Hide the preview image
    }
  }

  const deleteReview = async (event) => {
    event.preventDefault();
    const reviewId = event.target.dataset.reviewId;
  
    const response = await fetch(`/reviews/${reviewId}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      document.location.replace('/profile');
    }
  };

const deleteForms = document.querySelectorAll('.delete-review');
deleteForms.forEach(form => {
  form.addEventListener('submit', deleteReview);
});

const deleteButtons = document.querySelectorAll('.delete-button3');

const eachCommentClick = (event) => {
  event.preventDefault();
  
  const commentSection = event.target.parentNode.parentNode.querySelector('.form-group5');
  
  if (commentSection.style.display === 'block') {
    commentSection.style.display = 'none';
  } else {
    commentSection.style.display = 'block';
  }
};

deleteButtons.forEach(button => {
  button.addEventListener('click', eachCommentClick);
});

const commentForms = document.querySelectorAll('.form-group5');

commentForms.forEach(form => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const commentInput = form.querySelector('.comment-section1');
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


  document.querySelector('.dropdown1').addEventListener('click', logout);
  document.querySelector('.review-form').addEventListener('submit', reviewForm);