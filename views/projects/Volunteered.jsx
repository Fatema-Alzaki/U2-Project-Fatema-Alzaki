const React = require('react');
const Layout = require('../layouts/Layout');

function Volunteered({ projects, user, token }) {
  return (
    <Layout user={user} token={token}>
      <h1>My Volunteered Projects</h1>
      <a href={`/?token=${token}`}>homepage</a>

      {projects.length === 0 ? (
        <p>You haven't volunteered for any projects yet.</p>
      ) : (
        <ul>
          {projects.map(project => (
            <li key={project._id}>
              <a href={`/projects/${project._id}/?token=${token}`}>{project.title}</a> — {project.issueType} — {project.location}
              <p>Status: {project.status}</p>
              <p>{project.volunteers.length}/{project.volunteerLimit} volunteers</p>
            </li>
          ))}
        </ul>
        
      )}
    </Layout>
  );
}

module.exports = Volunteered;