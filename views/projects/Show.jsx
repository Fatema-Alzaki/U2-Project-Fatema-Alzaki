const React = require('react')
const Layout = require('../layouts/Layout')

function Show({ project, engineer }) {
  const isFull = project.volunteers.length >= project.volunteerLimit

  return (
    <Layout engineer={engineer}>
      <h1>{project.title}</h1>

      <img src={`/images/${project.beforeImage}`} alt="Before" style={{ maxWidth: '300px' }} />
      <img src={`/images/${project.afterImage}`} alt="After" style={{ maxWidth: '300px' }} />

      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>Location:</strong> {project.location}</p>
      <p><strong>Issue Type:</strong> {project.issueType}</p>
      <p><strong>Equipment Used:</strong> {project.equipment}</p>
      <p><strong>Status:</strong> {project.status}</p>
      <p><strong>Timeline:</strong> {project.dateStarted} → {project.dateCompleted || 'Ongoing'}</p>

      <p>
        <strong>Volunteers:</strong> {project.volunteers.length} / {project.volunteerLimit} 
        {isFull && <span style={{ color: 'red', marginLeft: '10px' }}>FULL</span>}
      </p>

      {!isFull && (
        <form method="POST" action={`/projects/${project._id}/signup`}>
          <button type="submit">Join Project</button>
        </form>
      )}

      <hr />

      <h3>Comments</h3>
      <ul>
        {project.comments.length > 0 ? (
          project.comments.map((c) => (
            <li key={c._id}>
              <strong>{c.user?.name || 'Anonymous'}:</strong> {c.text}
            </li>
          ))
        ) : (
          <li>No comments yet</li>
        )}
      </ul>

      <form method="POST" action={`/projects/${project._id}/comments`}>
        <textarea name="text" placeholder="Leave a comment..." rows="3" cols="40" required></textarea>
        <br />
        <button type="submit">Post</button>
      </form>
    </Layout>
  )
}

module.exports = Show
