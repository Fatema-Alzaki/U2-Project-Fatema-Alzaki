const React = require('react')
const Layout = require('../layouts/Layout')

function SignUp() {
  return (
    <Layout>
      <div className="form-container">
        <h2>Register to EcoFix Hub</h2>
        <form action="/auth/signup" method="POST">
          <label htmlFor="name">Full Name</label>
          <input type="text" name="name" required />

          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />

          <label htmlFor="specialty">Specialty</label>
          <input type="text" name="specialty" placeholder="e.g., Marine Engineer" />

          <label htmlFor="region">Region</label>
          <input type="text" name="region" placeholder="e.g., Bahrain" />

          <label htmlFor="experience">Years of Experience</label>
          <input type="number" name="experience" min="0" />

          <button type="submit">Create Account</button>
        </form>
        <p>Already have an account? <a href="/auth/signin">Sign in</a></p>
      </div>
    </Layout>
  )
}

module.exports = SignUp
