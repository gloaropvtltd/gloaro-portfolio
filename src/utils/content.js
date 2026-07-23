import { sql } from "@/utils/db";
import { projects as staticProjects } from "@/data/projects";
import { products as staticProducts } from "@/data/products";
import { testimonials as staticTestimonials } from "@/data/testimonials";
import { faqs as staticFaqs } from "@/data/faqs";
import { services as staticServices } from "@/data/services";
import { industries as staticIndustries } from "@/data/industries";
import { technologyGroups as staticTechnologyGroups } from "@/data/technologies";
import { processSteps as staticProcessSteps } from "@/data/process";
import { whyChooseUs as staticWhyChooseUs } from "@/data/whyChooseUs";
import { footerSocialLinks as staticSocialLinks } from "@/data/footerLinks";

function withIds(items) {
  return items.map((item, index) => ({ id: index + 1, ...item }));
}

export async function getProjects() {
  try {
    const rows = await sql`SELECT * FROM projects ORDER BY sort_order ASC, id ASC`;
    if (rows.length === 0) return withIds(staticProjects);
    return rows;
  } catch {
    return withIds(staticProjects);
  }
}

export async function getProducts() {
  try {
    const rows = await sql`SELECT * FROM products ORDER BY sort_order ASC, id ASC`;
    if (rows.length === 0) return withIds(staticProducts);
    return rows;
  } catch {
    return withIds(staticProducts);
  }
}

export async function getProductById(id) {
  try {
    const [row] = await sql`SELECT * FROM products WHERE id = ${id}`;
    if (row) return row;
  } catch {
    // fall through to static fallback below
  }
  return withIds(staticProducts).find((item) => String(item.id) === String(id)) ?? null;
}

export async function getTestimonials() {
  try {
    const rows = await sql`SELECT * FROM testimonials ORDER BY sort_order ASC, id ASC`;
    if (rows.length === 0) return withIds(staticTestimonials);
    return rows;
  } catch {
    return withIds(staticTestimonials);
  }
}

export async function getFaqs() {
  try {
    const rows = await sql`SELECT * FROM faqs ORDER BY sort_order ASC, id ASC`;
    if (rows.length === 0) return withIds(staticFaqs);
    return rows;
  } catch {
    return withIds(staticFaqs);
  }
}

export async function getServices() {
  try {
    const rows = await sql`SELECT * FROM services ORDER BY sort_order ASC, id ASC`;
    if (rows.length === 0) return withIds(staticServices);
    return rows;
  } catch {
    return withIds(staticServices);
  }
}

export async function getIndustries() {
  try {
    const rows = await sql`SELECT * FROM industries ORDER BY sort_order ASC, id ASC`;
    if (rows.length === 0) return withIds(staticIndustries);
    return rows;
  } catch {
    return withIds(staticIndustries);
  }
}

export async function getTechnologyGroups() {
  try {
    const rows = await sql`SELECT * FROM technology_groups ORDER BY sort_order ASC, id ASC`;
    if (rows.length === 0) return withIds(staticTechnologyGroups);
    return rows;
  } catch {
    return withIds(staticTechnologyGroups);
  }
}

export async function getProcessSteps() {
  try {
    const rows = await sql`SELECT * FROM process_steps ORDER BY sort_order ASC, id ASC`;
    if (rows.length === 0) return withIds(staticProcessSteps);
    return rows;
  } catch {
    return withIds(staticProcessSteps);
  }
}

export async function getWhyChooseUs() {
  try {
    const rows = await sql`SELECT * FROM why_choose_us ORDER BY sort_order ASC, id ASC`;
    if (rows.length === 0) return withIds(staticWhyChooseUs);
    return rows;
  } catch {
    return withIds(staticWhyChooseUs);
  }
}

export async function getSocialLinks() {
  try {
    const rows = await sql`SELECT * FROM social_links ORDER BY sort_order ASC, id ASC`;
    if (rows.length === 0) return withIds(staticSocialLinks);
    return rows;
  } catch {
    return withIds(staticSocialLinks);
  }
}
