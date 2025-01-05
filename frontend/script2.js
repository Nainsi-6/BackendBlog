// document.getElementById('loginForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
  
//     const email = e.target.email.value;
//     const password = e.target.password.value;
  
//     const response = await fetch('/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });
  
//     const data = await response.json();
//     if (response.ok) {
//       localStorage.setItem('token', data.token);
//       window.location.href = '/blog';  // Redirect to blog after login
//     } else {
//       alert(data.message || 'Login failed');
//     }
//   });

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    const response = await fetch('http://localhost:5004/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Login successful');
      localStorage.setItem('token', data.token); // Save JWT token
      window.location.href = 'blog.html';       // Redirect to the blog page
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert('An error occurred. Please try again.');
  }
});



  
