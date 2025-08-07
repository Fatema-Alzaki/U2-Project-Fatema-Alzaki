const React = require('react');
const Layout = require('../layouts/Layout');

function Show({ project, engineer, token }) {
  const isFull = project.volunteers.length >= project.volunteerLimit;

  return (
    <Layout engineer={engineer} token={token}>
      <h1>{project.title}</h1>

      {/* {project.beforeImage && (
        <img src={`/images/${project.beforeImage}`} alt="Before" style={{ maxWidth: '300px' }} />
      )}
      {project.afterImage && (
        <img src={`/images/${project.afterImage}`} alt="After" style={{ maxWidth: '300px' }} />
      )} */}
      <div className="image-gallery">
        {project.beforeImage && (
          <img
            src={`/uploads/${project.beforeImage}`}
            alt="Before"
            className="project-image"
          />
        )}
        {project.afterImage && (
          <img
            src={`/uploads/${project.afterImage}`}
            alt="After"
            className="project-image"
          />
        )}
      </div>


      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>Location:</strong> {project.location}</p>
      <p><strong>Issue Type:</strong> {project.issueType}</p>
      <p><strong>Equipment Used:</strong> {project.equipment}</p>
      <p><strong>Status:</strong> {project.status}</p>
      <p><strong>Timeline:</strong> {project.dateStarted} → {project.dateCompleted || 'Ongoing'}</p>

      {/* 🔘 Action Buttons */}
      <div className="action-buttons">
        <a href={`/projects?token=${token}`} className="btn btn-secondary">
          ← Back to All Projects
        </a>
        <a href={`/projects/${project._id}/edit?token=${token}`} className="btn btn-danger">
          ✏️ Edit Project
        </a>
      </div>
      <p>
        <strong>Volunteers:</strong> {project.volunteers.length} / {project.volunteerLimit}
        {isFull && <span style={{ color: 'red', marginLeft: '10px' }}>FULL</span>}
      </p>

      {!isFull && (
        <form method="POST" action={`/projects/${project._id}/volunteer/?token=${token}`}>
          <button type="submit" className="btn btn-success">Volunteer For Project</button>
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

      <form method="POST" action={`/projects/${project._id}/comments/?token=${token}`}>
        <textarea
          name="text"
          placeholder="Leave a comment..."
          rows="3"
          cols="40"
          required
        ></textarea>
        <br />
        <button type="submit" className="btn btn-primary">Post</button>
      </form>
      {/* 👕 Custom Styling */}
      <style>
        {`
          .show-container {
            max-width: 700px;
            margin: auto;
            padding: 20px;
            text-align: center;
          }
          .project-title {
            font-size: 2rem;
            margin-bottom: 15px;
          }
          .image-gallery {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 20px 0;
            flex-wrap: wrap;
          }
          .project-image {
            max-width: 300px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          }
          .action-buttons {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 20px 0;
            flex-wrap: wrap;
          }
          .btn {
            padding: 10px 15px;
            border-radius: 5px;
            text-decoration: none;
            color: white;
            font-weight: bold;
          }
          .btn-secondary {
            background-color: #4caf50;
          }
          .btn-danger {
            background-color: #d9534f;
          }
          .btn-success {
            background-color: #28a745;
            margin-top: 10px;
          }
          .btn-primary {
            background-color: #007bff;
            margin-top: 10px;
          }
        `}
      </style>
    </Layout>
  );
}


module.exports = Show;
