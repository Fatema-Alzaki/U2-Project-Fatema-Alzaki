const React = require('react');
const Layout = require('../layouts/Layout');

function Edit(props) {
  const { user } = props;

  return (
    <Layout>
      <h1>Edit User</h1>
      <form action={`/users/${user._id}?_method=PUT`} method="POST">
        <label>
          Name: <input type="text" name="name" defaultValue={user.name} required />
        </label>
        <br />
        <label>
          Email: <input type="email" name="email" defaultValue={user.email} required />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </Layout>
  );
}

module.exports = Edit;
