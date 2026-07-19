import { projects, Project } from "../data/portfolio";

export interface ProjectsContent {
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  list: Project[];
  caseStudyPreviewNote: string;
}

export const projectsContent: ProjectsContent = {
  hero: {
    badge: "Proof of work",
    title: "Credibility through execution.",
    description: "Every project listed here represents a real challenge solved, a technical system optimized, or an operational milestone achieved. No inflated marketing claims—just direct, verified solutions."
  },
  list: projects,
  caseStudyPreviewNote: "Learn how the initial challenges were addressed, the architectural steps, and what lessons were carried forward to ensure production security."
};
export { projects };
