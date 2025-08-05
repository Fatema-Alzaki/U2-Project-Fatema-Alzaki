const React = require('react');
const Layout = require('../layouts/Layout');

function MyProjects({ projects, user }) {
  return (
    <Layout user={user}>
      <h1>My Created Projects</h1>

      {projects.length === 0 ? (
        <p>You haven't created any projects yet.</p>
      ) : (
        <ul>
          {projects.map(project => (
            <li key={project._id}>
              <a href={`/projects/${project._id}`}>{project.title}</a>
              <div>
                <a href={`/projects/${project._id}/edit`}>Edit</a> |{" "}
                <form
                  action={`/projects/${project._id}?_method=DELETE`}
                  method="POST"
                  style={{ display: 'inline' }}
                >
                  <button type="submit">Delete</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}

module.exports = MyProjects;