const React = require("react");

function Layout({ children, user }) {
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
              <p>Welcome, {user.name}! <a href="/auth/signout">Sign out</a></p>
            ) : (
              <p><a href="/auth/signin">Login</a> | <a href="/auth/signup">Sign up</a></p>
            )}
            <hr />
          </header>

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
