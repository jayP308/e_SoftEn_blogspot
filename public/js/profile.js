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
    
    if(topic && description) {
        const response = await fetch('/api/users/reviews', {
            method: 'POST',
            body: JSON.stringify({ topic, description }),
            headers: { 'Content-Type': 'application/json'},
        });

        if(response.ok) {
            console.log('review created!');
            document.getElementById('validation-message').textContent = 'Post Created Successfully!';
            document.location.replace('/profile');
        } else {
          // Handle error cases
          const errorMessage = await response.text();
          console.log(errorMessage);
          // Display an appropriate error message to the user
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
  
  document.querySelector('.dropdown1').addEventListener('click', logout);
  document.querySelector('.review-form').addEventListener('submit', reviewForm);