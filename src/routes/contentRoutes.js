const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require("../controllers/crudController");

const router = express.Router();

// About
router.get("/about", getAll("about"));
router.get("/about/:id", getById("about"));
router.post("/about", authenticateToken, create("about", [
  "title",
  "description",
  "profile_image",
]));
router.put("/about/:id", authenticateToken, update("about", [
  "title",
  "description",
  "profile_image",
]));
router.delete("/about/:id", authenticateToken, remove("about"));

// Skills
router.get("/skills", getAll("skills"));
router.get("/skills/:id", getById("skills"));
router.post("/skills", authenticateToken, create("skills", [
  "name",
  "category",
  "level",
]));
router.put("/skills/:id", authenticateToken, update("skills", [
  "name",
  "category",
  "level",
]));
router.delete("/skills/:id", authenticateToken, remove("skills"));

// Projects
router.get("/projects", getAll("projects"));
router.get("/projects/:id", getById("projects"));
router.post("/projects", authenticateToken, create("projects", [
  "title",
  "description",
  "image_url",
  "technologies",
  "project_url",
  "github_url",
]));
router.put("/projects/:id", authenticateToken, update("projects", [
  "title",
  "description",
  "image_url",
  "technologies",
  "project_url",
  "github_url",
]));
router.delete("/projects/:id", authenticateToken, remove("projects"));

// Blogs
router.get("/blogs", getAll("blogs"));
router.get("/blogs/:id", getById("blogs"));
router.post("/blogs", authenticateToken, create("blogs", [
  "title",
  "slug",
  "content",
  "image_url",
  "published",
]));
router.put("/blogs/:id", authenticateToken, update("blogs", [
  "title",
  "slug",
  "content",
  "image_url",
  "published",
]));
router.delete("/blogs/:id", authenticateToken, remove("blogs"));

// Experience
router.get("/experience", getAll("experience"));
router.get("/experience/:id", getById("experience"));
router.post("/experience", authenticateToken, create("experience", [
  "company",
  "position",
  "description",
  "start_date",
  "end_date",
]));
router.put("/experience/:id", authenticateToken, update("experience", [
  "company",
  "position",
  "description",
  "start_date",
  "end_date",
]));
router.delete("/experience/:id", authenticateToken, remove("experience"));

// Testimonials
router.get("/testimonials", getAll("testimonials"));
router.get("/testimonials/:id", getById("testimonials"));
router.post("/testimonials", authenticateToken, create("testimonials", [
  "name",
  "role",
  "message",
  "image_url",
]));
router.put("/testimonials/:id", authenticateToken, update("testimonials", [
  "name",
  "role",
  "message",
  "image_url",
]));
router.delete("/testimonials/:id", authenticateToken, remove("testimonials"));

// Services
router.get("/services", getAll("services"));
router.get("/services/:id", getById("services"));
router.post("/services", authenticateToken, create("services", [
  "title",
  "description",
  "icon",
]));
router.put("/services/:id", authenticateToken, update("services", [
  "title",
  "description",
  "icon",
]));
router.delete("/services/:id", authenticateToken, remove("services"));

module.exports = router;