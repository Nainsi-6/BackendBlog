const BASE_URL = 'http://localhost:5003';

// Signup
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert('Signup successful! Please login.');
        window.location.href = 'index.html';
      } else {
        alert('Signup failed. Try again.');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  });
}

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const result = await res.json();
        localStorage.setItem('token', result.token);
        alert('Login successful!');
        window.location.href = 'blog.html';
      } else {
        alert('Login failed. Check your credentials.');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  });
}
