export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "new-school-liberia",
    title: "New School Opens in Rural Liberia",
    date: "Dec 15, 2025",
    excerpt: "Providing education to over 500 children who previously had no access to formal schooling in the heart of rural Bong county.",
    category: "Education",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop",
    content: `
      <h2>A Milestone for Education</h2>
      <p>The Sheikh Kouyateh Foundation is proud to announce the completion of its latest educational facility. Located in a remote sector where children previously walked over 10km to reach the nearest school, this new center provides a modern learning environment for over 500 students.</p>
      
      <p>Equipped with solar-powered classrooms, a dedicated computer lab, and a clean water well, the school aims to be a hub for community development as well as academic excellence.</p>
      
      <h2>Community Inclusion</h2>
      <p>Beyond the classroom, we've integrated adult literacy programs for the local community, ensuring that the impact of education ripples through every generation in the village.</p>
    `
  },
  {
    slug: "womens-justice-results",
    title: "Women's Justice Initiative Results",
    date: "Jan 05, 2026",
    excerpt: "A summary of our achievements in advocating for property rights and legal protection for vulnerable women across three counties.",
    category: "Justice",
    image: "https://images.unsplash.com/photo-1574607383476-f517f260d30b?q=80&w=800&auto=format&fit=crop",
    content: `
      <h2>Fighting for the Vulnerable</h2>
      <p>In the past year, our Women's Justice Initiative has provided free legal aid to over 120 women facing property disputes and domestic challenges. By partnering with local law firms, we've ensured that justice is not a privilege of the few.</p>
      
      <p>Our focus has been on educating women about their existing rights under Liberian law, empowering them to take charge of their futures and protect their families' inheritances.</p>
      
      <h2>Moving Forward</h2>
      <p>We are currently expanding our mediation services to include community-based conflict resolution, reducing the burden on the formal court system while providing immediate relief to those in need.</p>
    `
  },
  {
    slug: "sustainable-farming-hope",
    title: "Sustainable Farming: A New Hope",
    date: "Nov 22, 2025",
    excerpt: "How local cooperatives are changing the economic landscape of rural communities through modern agricultural practices.",
    category: "Development",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
    content: `
      <h2>The Foundation of Growth</h2>
      <p>Agriculture is the backbone of the rural economy. Our sustainable farming initiative provides farmers with high-yield seeds, modernized irrigation tools, and training in climate-resilient crop rotation.</p>
      
      <p>By forming cooperatives, local farmers are now able to pool resources and access larger markets, significantly increasing average household income in participating villages.</p>
    `
  },
  {
    slug: "healthcare-drive-barriers",
    title: "Healthcare Drive: Breaking Barriers",
    date: "Dec 30, 2025",
    excerpt: "Our recent mission to provide primary care services and essential vaccines to remote villages across the border regions.",
    category: "Health",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop",
    content: `
      <h2>Healthcare for All</h2>
      <p>Access to basic medical care should not be determined by geography. Our mobile health units recently completed a 2-week circuit through five border villages, providing immunizations, prenatal checkups, and malaria treatments.</p>
      
      <p>We documented a 30% increase in clinic attendance following our community outreach efforts, showing that awareness is just as critical as the medical supplies themselves.</p>
    `
  }
];
