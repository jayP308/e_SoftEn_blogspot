const createPost = document.getElementById('dropdownMenu3');
const closePost = document.getElementById('submit-button1');

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

  document.querySelector('.dropdown1').addEventListener('click', logout);
  document.querySelector('.review-form').addEventListener('submit', reviewForm);