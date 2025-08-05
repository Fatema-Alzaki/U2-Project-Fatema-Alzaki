const React = require('react')
const Layout = require('../layouts/Layout')

function SignIn(props) {
  return (
    <Layout>
      <div className="form-container">
        <h2>Login to EcoFix Hub</h2>
        <form action={`/auth/signin?token=${props.token}`} method="POST">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />

          <button type="submit">Login</button>
        </form>
        <p>New here? <a href="/auth/signup">Create an account</a></p>
      </div>
    </Layout>
  )
}

module.exports = SignIn
