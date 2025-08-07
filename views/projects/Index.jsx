const React = require("react");
const Layout = require("../layouts/Layout");

function Index({ projects, engineer, token }) {
  return (
    <Layout engineer={engineer} token={token}>
      <h1>Available Projects</h1>

      <div className="project-grid">
        {projects.map((project) => (
          <div key={project._id} className="project-card">
            {project.beforeImage && (
              <img
                src={`/uploads/${project.beforeImage}`}
                alt={project.title}
                className="project-card-image"
              />
            )}

            <h3>{project.title}</h3>

            <p className="project-meta">
              📍 {project.location} <br />
              ⚙️ {project.issueType}
            </p>

            <p className="project-description">
              {project.description.length > 150
                ? `${project.description.slice(0, 150)}...`
                : project.description}
            </p>

            <a href={`/projects/${project._id}?token=${token}`}>🔍 View Details</a>
          </div>
        ))}
      </div>
      <a href={`/?token=${token}`}>homepage</a>

    </Layout>
  );
}

module.exports = Index;
