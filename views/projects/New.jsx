const React = require("react");
const Layout = require("../layouts/Layout");

function New({ user }) {
  return (
    <Layout user={user}>
      <h1>Create New Environmental Project</h1>
      <form action="/projects" method="POST" encType="multipart/form-data">
        <label>Title: <input type="text" name="title" required /></label><br />
        <label>Description: <textarea name="description" required /></label><br />
        <label>Location: <input type="text" name="location" required /></label><br />
        <label>Issue Type:
          <select name="issueType" required>
            <option value="air">Air</option>
            <option value="soil">Soil</option>
            <option value="marine">Marine</option>
          </select>
        </label><br />
        <label>Equipment Used: <input type="text" name="equipment" /></label><br />
        <label>Volunteer Slots: <input type="number" name="volunteerLimit" required min="1" /></label><br />
        {/* <label>Before Image: <input type="file" name="beforeImage" /></label><br />
        <label>After Image: <input type="file" name="afterImage" /></label><br /> */}
        <button type="submit">Create Project</button>
      </form>
    </Layout>
  );
}

module.exports = New;
