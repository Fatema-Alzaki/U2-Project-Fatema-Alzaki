
const React = require('react');


function Home() {
  return (
       <section style={{ textAlign: "center", marginBottom: "1rem" }}>
            <img src="/images/ecofix-logo.png" alt="EcoFix Logo" style={{ width: '150px' }} />

            <p style={{ maxWidth: "700px", margin: "auto", fontSize: "1rem", lineHeight: "1.5" }}>
                                         <strong>EcoFix Hub</strong>
              is a purpose-driven environmental initiative that connects engineers,
              volunteers, and communities to collaborate on impactful sustainability projects.
              By facilitating skill-based volunteering, progress tracking, and transparent engagement,
              EcoFix Hub bridges the gap between technical expertise and urgent ecological challenges—empowering
              everyone to contribute toward a healthier planet.
            </p>
            </section>
  );
}

module.exports = Home;
