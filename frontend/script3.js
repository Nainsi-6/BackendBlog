const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = signupForm.name.value;
  const email = signupForm.email.value;
  const password = signupForm.password.value;

  console.log('Form Data:', { name, email, password });

  try {
    const response = await fetch('http://localhost:5004/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      alert('Signup successful! You can now log in.');
      window.location.href = 'index.html'; // Redirect to login page
    } else {
      const data = await response.json();
      alert(data.message || 'Signup failed. Please try again.');
    }
  } catch (error) {
    console.error('Error signing up:', error);
    alert('An error occurred. Please try again.');
  }
});
