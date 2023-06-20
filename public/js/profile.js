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
      } else {
        console.log('Failed to update profile image.');
      }
    } catch (error) {
      console.log('Error occurred while updating profile image:', error);
    }
  }