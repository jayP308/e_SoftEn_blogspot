const signupForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if(username && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if(response.ok) {
            document.getElementById('validation-message').textContent = 'Signed Up Successfully!';
            document.location.replace('/');
        }
    }
};

function showPassword() {
    var y = document.getElementById("password-signup");
    if (y.type === "password") {
      y.type = "text";
    } else {
      y.type = "password";
    }
  }

  document.querySelector('.signup-form').addEventListener('submit', signupForm);
