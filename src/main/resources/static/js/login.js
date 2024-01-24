const form = document.getElementById('login-form');
const errorMsgDiv = document.getElementById('errorMsg');
const username = document.getElementById('emailUsername').value.trim();
const password = document.getElementById('password').value.trim();
const dataToSend = {
  usernameOrEmail: username,
  password: password,
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Send login request to server (Fetch API)
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Response data:', data);
      if (data.success) {
        // Store token securely in client-side storage
        localStorage.setItem('token', data.accessToken);
        // Redirect to protected page
        window.location.href = '/add-product.html';
      } else {
        errorMsgDiv.innerText = data.message;
      }
    })
    .catch(error => {
      errorMsgDiv.innerText = 'An error occurred: ' + error.message;
    });
});