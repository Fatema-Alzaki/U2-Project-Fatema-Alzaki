const React = require("react");
const Layout = require("../layouts/Layout");

function Index({ projects, user }) {
  return (
    <Layout user={user}>
      <h1>EcoFix Projects</h1>
      <a href="/projects/new">+ New Project</a>
      <ul>
        {projects.map(project => (
          <li key={project._id}>
            <a href={`/projects/${project._id}`}>{project.title}</a> – {project.issueType} – {project.location}
            <p>Status: {project.status}</p>
            <p>{project.volunteers.length}/{project.volunteerLimit} volunteers</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

module.exports = Index;
