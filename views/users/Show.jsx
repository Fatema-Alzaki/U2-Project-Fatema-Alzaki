const React = require('react');
const Layout = require('../layouts/Layout');

function Show(props) {
  const { user } = props;

  return (
    <Layout token={props.token}>
      <h1>User Details</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <a href={`/users/${user._id}/edit`}>Edit Profile</a>

      <form action={`/users/${user._id}?_method=DELETE&token=${props.token}`} method="POST" style={{ marginTop: '10px' }}>
        <button type="submit">Delete User</button>
      </form>
    </Layout>
  );
}

module.exports = Show;
