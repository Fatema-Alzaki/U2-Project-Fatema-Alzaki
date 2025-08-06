const React = require("react");

function Layout({ children, user , token}) {
  return (
    <html>
      <head>
        <title>EcoFix Hub</title>
        <link rel="stylesheet" href="/styles.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div className="container">
          <header>
            <h1>🌱 EcoFix Hub</h1>
            {user ? (
              <p>Welcome, {user.name}! <a href="/auth/signup">Sign out</a></p>   
            ) : (
              <p><a href="/auth/signin">Login</a> | <a href="/auth/signup">Sign up</a></p>
            )}
            <hr />
          </header>
          {user &&
          <div className="dashboard-container">
            <nav style={{ textAlign: 'center', margin: '20px 0' }}>
              <a href={`/projects/?token=${token}`}>All Projects</a> |{" "}
              {/* <a href={`/dashboard/?token=${token}`}>Dashboard</a> |{" "} */}
              <a href={`/projects/new/?token=${token}`}>create Project</a> |{" "}
              <a href={`/projects/index/volunteered/?token=${token}`}>My Volunteered Projects</a> |{" "}
              <a href={`/projects/index/created/?token=${token}`}>My Created Projects</a> |{" "}
              <a href={`/auth/profile/?token=${token}`}>My Profile</a> {" "}
            </nav>
          </div>
          }
          {children}

          <footer style={{ marginTop: "2rem", textAlign: "center", fontSize: "0.8rem" }}>
            <hr />
            <p>EcoFix Hub © 2025 - Created by Fatema Alzaki</p>
          </footer>
        </div>
      </body>
    </html>
  );
}

module.exports = Layout;
