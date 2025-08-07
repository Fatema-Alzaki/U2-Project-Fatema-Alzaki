const React = require("react");
const Layout = require("../layouts/Layout");

function New({ user, token }) {
  return (
    <Layout user={user} token={token}>
      <h1>Create New Environmental Project</h1>
     <form action={`/projects?token=${token}`} method="POST" encType="multipart/form-data">
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

        <div className="form-group">
          <label htmlFor="beforeImage">Before Image:</label>
          <input type="file" name="beforeImage" id="beforeImage" accept="image/*" />
        </div>

        <div className="form-group">
          <label htmlFor="afterImage">After Image:</label>
          <input type="file" name="afterImage" id="afterImage" accept="image/*" />
        </div>

        <button type="submit">Create Project</button>
         <a href={`/?token=${token}`}>homepage</a>
      </form>
    </Layout>
  );
}

module.exports = New;
