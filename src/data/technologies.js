import { Code2, Database, Server, Wrench } from "lucide-react";

export const technologyGroups = [
  {
    category: "Frontend",
    icon: Code2,
    items: ["React", "Next.js", "JavaScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    icon: Server,
    items: ["Node.js", "NestJS", "Laravel"],
  },
  {
    category: "Database",
    icon: Database,
    items: ["PostgreSQL", "MySQL"],
  },
  {
    category: "Tools",
    icon: Wrench,
    items: ["Git", "Docker", "Cloud"],
  },
];
