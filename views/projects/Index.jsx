const React = require("react");
const Layout = require("../layouts/Layout");

function Index({ projects, engineer }) {
  return (
    <Layout engineer={engineer}>
      <h1>Available Projects</h1>
      {projects.map((project) => (
        <div key={project._id} className="project-card">
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <a href={`/projects/${project._id}`}>View Details</a>
        </div>
      ))}
    </Layout>
  );
}


module.exports = Index;
