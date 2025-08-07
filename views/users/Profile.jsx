const React = require('react');
const Layout = require('../layouts/Layout');

function Profile(props) {
  const { user } = props;

  return (
    <Layout token={props.token}>
      <h1>Your Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* You can expand this with impact stats, volunteer info, etc. */}
    </Layout>
    
  );
}

module.exports = Profile;
