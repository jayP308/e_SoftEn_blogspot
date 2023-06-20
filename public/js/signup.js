const signupForm = async (event) => {
  event.preventDefault();

  const firstName = document.querySelector('#firstName-signup').value.trim();
  const lastName = document.querySelector('#lastName-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (firstName && lastName && username && email && password) {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profileImage', document.querySelector('#profileImage').files[0]);

    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      document.getElementById('validation-message').textContent = 'Signed Up Successfully!';
      document.location.replace('/profile');
    }
  }
};

function showPassword() {
  var y = document.getElementById('password-signup');
  if (y.type === 'password') {
    y.type = 'text';
  } else {
    y.type = 'password';
  }
}

document.querySelector('.signup-form').addEventListener('submit', signupForm);

