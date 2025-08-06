const React = require('react');
const Layout = require('../layouts/Layout');

function Index(props) {
  return (
    <Layout token={props.token}>
      <h1>All Users</h1>
      <ul>
        {props.users.map((user) => (
          <li key={user._id}>
            <a href={`/users/${user._id}&token=${props.token}`}>{user.name} ({user.email})</a>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

module.exports = Index;
