<p align="center">
  <img src="public/assets/logo.png" alt="EcoFix Hub Logo" width="150"/>
</p>

# 🌱 EcoFix Hub – Environmental Repair Tracker

EcoFix Hub is a full-stack MVC platform that empowers engineers to log, manage, and monitor **environmental repair projects**. It focuses on *restoring damaged ecosystems* — from oil spills to malfunctioning solar stations — by documenting, analyzing, and visualizing each restoration effort.

---

## 📸 Preview

> _Add project screenshots here (e.g., project cards, show pages, dashboard, etc.)_  
> *You can use `public/uploads/` images or add them to `public/assets`.*

---

## 🧠 Project Summary

**EcoFix Hub** enables environmental engineers and volunteers to:

- Securely register and login (JWT-based)
- Create repair project entries
- Assign themselves to projects (many-to-many)
- Track site type, equipment, issue severity
- Upload before/after field images (via Multer)
- Monitor CO₂ mitigation, timelines, and progress
- View a personalized dashboard of impact metrics

> Perfect for NGOs, climate restoration teams, and sustainability programs.

---

## 🔧 Core Features

| Category       | Description |
|----------------|-------------|
| 🔐 Auth        | JWT-secured routes and form-based login |
| 🧑‍🔧 Engineers | CRUD for engineers with location, expertise |
| 🔧 Projects    | CRUD for environmental projects |
| 🤝 Volunteer   | Join/leave project with capacity limits |
| 💬 Comments    | Authenticated comment system |
| 📸 Media       | Upload before/after images via `multer` |
| 📈 Dashboard   | Shows number of projects, engineers, impact |
| 🎨 Frontend    | Styled JSX views with layout, icons, and cards |
| 🧪 Testing     | Unit + integration tests (`Jest`, `Supertest`) |

---

## 🧱 Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (authentication)
- Multer (image upload)

**Frontend:**
- JSX Views (EJS-style JSX templates)
- Responsive layout using custom CSS

**Testing:**
- Jest for unit tests
- Supertest for API integration
- mongodb-memory-server for isolated test DB

---

## 📂 Project Structure

```
eco-fix-hub/
├── models/               # Mongoose schemas
├── controllers/          # apiController, dataController, viewController
│   ├── auth/
│   ├── engineers/
│   ├── projects/
│   └── users/
├── views/                # JSX pages for engineers/projects
│   ├── layouts/
├── routes/               # Web and API route definitions
├── public/               # styles.css, uploaded images, assets
├── tests/                # Jest + Supertest test files
├── app.js                # Main Express app
├── server.js             # Server entry point
└── .env
```

---

## 🔗 Data Relationships

```
User ────┐
        ├──> Engineer ───< Project (many-to-many)
        └──> Project (createdBy)
```

- **Users** can create **engineers** and **projects**
- **Engineers** and **Projects** are many-to-many
- Projects hold lists of **volunteers** and **comments**

---

## 📁 .env Example

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecofixhub
JWT_SECRET=super_secure_secret
```

---

## 🧪 Testing Overview

All models and endpoints are tested using Jest + Supertest:

| Test File            | Coverage                             |
|----------------------|--------------------------------------|
| `user.test.js`       | Register, login, token validation    |
| `engineer.test.js`   | CRUD operations for engineers        |
| `project.test.js`    | Project CRUD, volunteer limits       |
| `integration.test.js`| Relationship and auth flows          |

**Run tests:**
```bash
npm test
```

---

## 📊 Dashboard Features

- Total number of projects and engineers
- CO₂ saved (based on project metadata)
- Environmental impact by category (air/soil/water)
- Timeline of completed efforts
- [Optionally] integrate `Chart.js` for visuals

---

## 🧭 Navigation Links

- `/projects` → All Projects  
- `/projects/index/created` → My Created Projects  
- `/projects/index/volunteered` → My Volunteered Projects  
- `/projects/new` → Create New Project  
- `/auth/profile` → User Profile  
- `/dashboard` → Engineer Dashboard  

---

## 💡 Future Enhancements

- 🌍 Map-based project locator (Leaflet.js)
- 🧠 AI-based project classification by impact
- 📊 Charts & graphs on dashboard (Chart.js / D3.js)
- 📨 Email notifications
- 📁 CSV/PDF export for project summaries
- 📱 Convert to mobile PWA

---

## ✅ Meets Unit 2 Requirements

| Requirement                      | ✅ Done |
|----------------------------------|--------|
| At least 2 Mongoose models       | ✅      |
| Full MVC (controllers + views)   | ✅      |
| Auth using JWT                   | ✅      |
| Custom styling / layout          | ✅      |
| Tests with Jest + Supertest      | ✅      |
| File Upload with Multer          | ✅      |
| Many-to-many relationship        | ✅      |
| Personalized user dashboard      | ✅      |

---

## 👩‍💻 Author

**Fatema Alzaki**  
Software Engineering Immersive | General Assembly  
[GitHub](https://github.com/) • [LinkedIn](https://linkedin.com/)  

---

## 📜 License

This project is open source under the MIT License.