const React = require("react");
const Layout = require("../layouts/Layout");

function Edit(props) {
  const {
    title,
    _id,
    description,
    location,
    issueType,
    equipment,
    volunteerLimit,
  } = props.project;

  return (
    <Layout user={props.user}>
      <h1>✏️ Edit {title}</h1>

      <form
        action={`/projects/${_id}?_method=PUT&token=${props.token}`}
        method="POST"
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label htmlFor="title">Project Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={title}
            placeholder="Enter project title..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Enter project description..."
            required
          >
            {description}
          </textarea>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={location}
            placeholder="Enter project location..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="issueType">Issue Type:</label>
          <select id="issueType" name="issueType" defaultValue={issueType} required>
            <option value="air">Air</option>
            <option value="soil">Soil</option>
            <option value="marine">Marine</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="equipment">Equipment Used:</label>
          <input
            type="text"
            id="equipment"
            name="equipment"
            defaultValue={equipment}
            placeholder="Enter equipment used..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="volunteerLimit">Volunteer Slots:</label>
          <input
            type="number"
            id="volunteerLimit"
            name="volunteerLimit"
            defaultValue={volunteerLimit}
            min="1"
            required
          />
        </div>

        {/* Uncomment if image upload is needed */}
        {/* 
        <div className="form-group">
          <label htmlFor="beforeImage">Before Image:</label>
          <input type="file" id="beforeImage" name="beforeImage" />
        </div>

        <div className="form-group">
          <label htmlFor="afterImage">After Image:</label>
          <input type="file" id="afterImage" name="afterImage" />
        </div>
        */}

        <div className="d-flex gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            💾 Update Project
          </button>
          <a href={`/projects/${_id}?token=${props.token}`} className="btn btn-secondary">
            ← Back to {title}
          </a>
        </div>
      </form>
    </Layout>
  );
}

module.exports = Edit;
