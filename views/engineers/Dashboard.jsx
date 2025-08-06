const React = require('react')
const Layout = require('../layouts/Layout')

function Dashboard({ engineer, projects, stats, token}) {
  return (
    <Layout engineer={engineer} token={token}>
      <h2>Welcome back, {engineer.name}</h2>

      <h3>Your Stats</h3>
      <ul>
        <li><strong>Projects Completed:</strong> {stats.completedProjects}</li>
        <li><strong>Pollution Mitigated:</strong> {stats.pollutionMitigated} tons</li>
        <li><strong>Time Saved:</strong> {stats.timeSaved} hrs</li>
      </ul>

      <h3>Ongoing Projects</h3>
      <ul>
        {projects.map(project => (
          <li key={project._id}>
            <strong>{project.title}</strong> - {project.issueType} | {project.status}
            <br />
            Location: {project.location} | Volunteers: {project.volunteers.length}/{project.volunteerLimit}
          </li>
        ))}
      </ul>
    </Layout>
  )
}

module.exports = Dashboard
