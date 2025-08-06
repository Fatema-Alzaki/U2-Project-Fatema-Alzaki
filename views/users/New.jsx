const React = require('react');
const Layout = require('../layouts/Layout');

function New(props) {
  return (
    <Layout token={props.token}>
      <h1>Create New User</h1>
      <form action="/auth/signup&token=${props.token}" method="POST">
        <label>
          Name: <input type="text" name="name" required />
        </label>
        <br />
        <label>
          Email: <input type="email" name="email" required />
        </label>
        <br />
        <label>
          Password: <input type="password" name="password" required />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </Layout>
  );
}

module.exports = New;
