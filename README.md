# U2-Project-Fatema-Alzaki

# 🌱 EcoFix Hub – Environmental Repair Tracker

EcoFix Hub is a full-stack MVC application that empowers engineers to log, manage, and monitor **environmental repair projects**. It focuses on *restoring* what’s damaged — from oil spills to broken solar installations — and provides detailed insights into environmental recovery efforts.

---

## 📸 Preview
> _Add screenshots of your dashboard and project pages here once styled._

---

## 🧠 Project Summary

**EcoFix Hub** is designed for environmental engineers to:
- Register/login securely using JWT
- Create repair project entries
- Assign themselves to repairs (many-to-many relationship)
- Document project locations, pollution type, and tools used
- Upload field images (before/after cleanup)
- Track CO₂ mitigation, timelines, and site restorations
- View an analytics dashboard

> Ideal for NGOs, climate task forces, and eco-engineering students.

---

## 🔧 Core Features

| Category       | Details |
|----------------|---------|
| 🔐 Auth        | JWT-based authentication system (Register/Login) |
| 🧑‍🔧 Engineers | CRUD for engineers (specialty, location, availability) |
| 🔧 Projects    | CRUD for repair projects (air, soil, marine, etc.) |
| 📸 Media       | File uploads: before/after field images using `multer` |
| 📈 Dashboard   | Project counts, CO₂ saved, areas restored |
| 🧭 Routing     | Fully RESTful MVC routes (views + API) |
| 🧪 Testing     | Unit + integration tests with `Jest` and `Supertest` |

---

## 🧱 Tech Stack

### Backend:
- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/) (Authentication)
- [Multer](https://www.npmjs.com/package/multer) (Image uploads)

### Frontend:
- [JSX Views](https://reactjs.org/docs/introducing-jsx.html) (EJS-style JSX components)
- CSS (Custom + responsive)

### Testing:
- [Jest](https://jestjs.io/) (Unit Tests)
- [Supertest](https://www.npmjs.com/package/supertest) (API Testing)
- [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server)

---

## 🔃 Project Structure

```
eco-fix-hub/
├── models/               # Mongoose Models (User, Engineer, Project)
├── controllers/          # Separated by resource & type (api/data/view)
├── views/                # JSX view templates (engineers/projects/layouts)
├── routes/               # Main API & view routes
├── tests/                # Unit and integration tests
├── public/               # Static assets (styles, images)
├── app.js                # Express setup
├── server.js             # Server entry
├── .env                  # Environment config
└── README.md
```

---

## 🔗 Model Relationships

```
User ────┐
        ├──> Engineer ───< Project (many-to-many)
        └──> Project (createdBy)
```

Each **engineer** is linked to **many projects**. Each **project** may involve **multiple engineers**. Users can **create engineers and projects**.

---

## 📁 .env Example

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecofixhub
JWT_SECRET=your_jwt_secret
```

---

## 🧪 Testing Guide

We use **Jest** + **Supertest** with an in-memory MongoDB server.

| Test File           | Coverage                          |
|---------------------|-----------------------------------|
| `user.test.js`      | Auth (register/login)             |
| `engineer.test.js`  | Engineer model & endpoints        |
| `project.test.js`   | Project model & endpoints         |
| `integration.test.js` | Link engineer <-> project      |

Run tests with:

```bash
npm test
```

---

## 📊 Dashboard Features

- Total engineers involved
- Total projects completed
- Pollution type stats (air, soil, marine)
- Timeline of repairs
- Visual charts (optional: Chart.js or D3.js)

---

## 💡 Future Enhancements

- 🌍 Location map for project sites (Leaflet.js)
- 🔍 Search/filter by issue type, region, date
- 📨 Email notification system
- 📄 PDF/CSV project report downloads
- 📱 Responsive PWA frontend

---

## 🎓 Project Requirements Reference

This project meets all **Unit 2** core requirements:
- ✅ 2+ Mongoose Models
- ✅ JWT Authentication
- ✅ Full MVC Structure
- ✅ Styling with custom layout
- ✅ Unit + Integration Tests
- ✅ Creative, useful project idea

---
## 📜 License

This project is MIT Licensed. You’re free to fork, improve, or contribute.

---

## 👩‍💻 Author

Fatema Alzaki  
Software Engineering Immersive Fellow, General Assembly  
[LinkedIn](https://www.linkedin.com/) • [GitHub](https://github.com/)


