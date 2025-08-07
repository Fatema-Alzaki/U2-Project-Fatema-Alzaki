const React = require('react');
const Layout = require('../layouts/Layout');

function MyProjects({ projects, user, token}) {
  return (
    <Layout user={user} token={token}>
      <h1>My Created Projects</h1>

      {projects.length === 0 ? (
        <p>You haven't created any projects yet.</p>
      ) : (
        <ul>
          {projects.map(project => (
            <li key={project._id}>
              <a href={`/projects/${project._id}/?token=${token}`}>{project.title}</a>
              <div>
                <a href={`/projects/${project._id}/edit/?token=${token}`}>Edit</a> |{" "}
               <form
  action={`/projects/${project._id}?_method=DELETE&token=${token}`}
  method="POST"
  style={{ display: 'inline' }}
>

                  <button type="submit">🗑️ Delete Project </button>
                  
                </form>
              </div>
            </li>
          ))}
        </ul>
      )} <a href={`/?token=${token}`}>homepage</a>
    </Layout>
  );
}

module.exports = MyProjects;