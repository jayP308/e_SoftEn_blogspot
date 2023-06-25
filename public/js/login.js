const loginForm = async (event) => {
    event.preventDefault();
    
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if(username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json'},
        });

        if(response.ok) {
            document.getElementById('validation-message').textContent = 'Logged In Successfully!';
            document.location.replace('/feed');
        } else {
            document.getElementById('validation-message').textContent = 'Incorrect Username or Password! Please Try Again!';
            return;
        }
    }
};

function showPassword() {
    var y = document.getElementById("password-login");
    if (y.type === "password") {
      y.type = "text";
    } else {
      y.type = "password";
    }
  }

  document.querySelector('.login-form').addEventListener('submit', loginForm);