const React = require("react");
const Layout = require("../layouts/Layout");

function Edit({ project, user }) {
  return (
    <Layout user={user}>
      <h1>Edit Project</h1>
      <form action={`/projects/${project._id}?_method=PUT`} method="POST" encType="multipart/form-data">
        <label>Title: <input type="text" name="title" defaultValue={project.title} /></label><br />
        <label>Description: <textarea name="description" defaultValue={project.description} /></label><br />
        <label>Location: <input type="text" name="location" defaultValue={project.location} /></label><br />
        <label>Issue Type:
          <select name="issueType" defaultValue={project.issueType}>
            <option value="air">Air</option>
            <option value="soil">Soil</option>
            <option value="marine">Marine</option>
          </select>
        </label><br />
        <label>Equipment Used: <input type="text" name="equipment" defaultValue={project.equipment} /></label><br />
        <label>Volunteer Slots: <input type="number" name="volunteerLimit" defaultValue={project.volunteerLimit} /></label><br />
        <label>Before Image: <input type="file" name="beforeImage" /></label><br />
        <label>After Image: <input type="file" name="afterImage" /></label><br />
        <button type="submit">Update Project</button>
      </form>
    </Layout>
  );
}

module.exports = Edit;
