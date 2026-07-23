import { neon } from "@neondatabase/serverless";
import { projects } from "../src/data/projects.js";
import { products } from "../src/data/products.js";
import { testimonials } from "../src/data/testimonials.js";
import { faqs } from "../src/data/faqs.js";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Run with: node --env-file=.env.local scripts/seed.js");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const iconByProductIndex = ["workflow", "analytics", "inventory"];

async function seedProjects() {
  for (const [index, project] of projects.entries()) {
    await sql.query(
      `INSERT INTO projects (title, category, description, tags, link, featured, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        project.title,
        project.category,
        project.description,
        project.tags,
        project.link,
        Boolean(project.featured),
        index,
      ]
    );
  }
}

async function seedProducts() {
  for (const [index, product] of products.entries()) {
    await sql.query(
      `INSERT INTO products (icon, status, title, tagline, description, highlights, link, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        iconByProductIndex[index] ?? "workflow",
        product.status,
        product.title,
        product.tagline,
        product.description,
        product.highlights,
        product.link,
        index,
      ]
    );
  }
}

async function seedTestimonials() {
  for (const [index, testimonial] of testimonials.entries()) {
    await sql.query(
      `INSERT INTO testimonials (name, role, company, review, rating, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        testimonial.name,
        testimonial.role,
        testimonial.company,
        testimonial.review,
        testimonial.rating,
        index,
      ]
    );
  }
}

async function seedFaqs() {
  for (const [index, faq] of faqs.entries()) {
    await sql.query(
      `INSERT INTO faqs (question, answer, sort_order) VALUES ($1, $2, $3)`,
      [faq.question, faq.answer, index]
    );
  }
}

const [{ count: projectCount }] = await sql.query("SELECT COUNT(*)::int AS count FROM projects");
if (projectCount > 0) {
  console.log("Tables already have data — skipping seed to avoid duplicates.");
  process.exit(0);
}

await seedProjects();
await seedProducts();
await seedTestimonials();
await seedFaqs();

console.log("Seed complete.");
