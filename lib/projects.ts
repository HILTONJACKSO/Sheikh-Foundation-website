export interface Project {
  slug: string;
  title: string;
  description: string;
  area: string;
  status: 'Past Project' | 'Upcoming Project';
  image: string;
  btnLabel: string;
  content: string;
}

export const projects: Project[] = [
  {
    slug: "project-literacy",
    title: "School Furniture Donation",
    description: "Providing armchairs to local schools to ensure students have a comfortable and dignfied learning environment.",
    area: "Education",
    status: "Past Project",
    image: "/school_donation.jpg",
    btnLabel: "Read More",
    content: `
      <h2>Restoring Dignity in the Classroom</h2>
      <p>The Sheikh Kouyateh Foundation has donated armchairs to a local school where students were previously forced to sit on the ground during classes due to a lack of furniture.</p>
      
      <p>This timely intervention has provided students with a safe and comfortable learning environment, helping to restore dignity and improve concentration in the classroom. With the new armchairs, children can now participate in lessons more effectively, supporting better academic performance and overall well-being.</p>
      
      <blockquote>
        “No child should be denied a proper learning environment. By providing these armchairs, we are helping to create a space where children can learn with comfort, confidence, and hope,” the Foundation stated.
      </blockquote>

      <h2>Commitment to Education</h2>
      <p>Speaking on the initiative, the Foundation emphasized its commitment to education as a cornerstone of sustainable development. The Sheikh Kouyateh Foundation continues to support vulnerable communities across Liberia through targeted interventions in education, healthcare, and social development, ensuring that no child is left behind.</p>
    `
  },
  {
    slug: "maternal-health-drive",
    title: "$500k JFK Hospital Donation",
    description: "Strengthening Liberia's healthcare by donating over $500,000 in essential medical supplies to JFK Hospital.",
    area: "Healthcare",
    status: "Past Project",
    image: "/medical_donation.jpg",
    btnLabel: "Read More",
    content: `
      <h2>Expanding Healthcare Access</h2>
      <p>The Sheikh Kouyateh Foundation has reaffirmed its commitment to strengthening healthcare delivery in Liberia through the donation of over USD $500,000 worth of essential medical supplies to the John F. Kennedy (JFK) Medical Hospital in Monrovia.</p>
      
      <p>This significant contribution is aimed at improving patient care, supporting frontline health workers, and enhancing the hospital’s capacity to provide quality medical services to thousands of Liberians. The donated supplies include critical medical equipment and consumables designed to address urgent healthcare needs and improve service delivery across multiple departments.</p>
      
      <blockquote>
        “This donation reflects our belief that a stronger healthcare system saves lives, builds resilience, and creates a healthier future for Liberia,” the Foundation stated.
      </blockquote>

      <h2>Impact on Service Delivery</h2>
      <p>JFK Medical Hospital, Liberia’s largest referral hospital, plays a vital role in providing advanced medical care to citizens from across the country. The Foundation’s support is expected to significantly reduce shortages of essential supplies and improve overall patient outcomes.</p>
      
      <p>The Sheikh Kouyateh Foundation remains dedicated to supporting health, education, and community development initiatives across Liberia and beyond, working in partnership with institutions and stakeholders to create sustainable impact.</p>
    `
  },
  {
    slug: "womens-justice-program",
    title: "Women's Justice Program",
    description: "Advocating for legal rights and property ownership for vulnerable women in Liberia.",
    area: "Justice",
    status: "Past Project",
    image: "/project_3.png",
    btnLabel: "Read More",
    content: `
      <h2>Legal Advocacy</h2>
      <p>For many women in traditional communities, property rights and legal protection are often out of reach. Our program provides free legal aid and mediation services to protect women's rights.</p>
      
      <h2>Program Pillars</h2>
      <ul>
        <li>Land & Property Rights Education</li>
        <li>Domestic Violence Legal Support</li>
        <li>Mediation and Conflict Resolution</li>
      </ul>
      
      <p>We believe that justice is the foundation of a stable and prosperous community. By empowering women legally, we stabilize families and communities.</p>
    `
  },
  {
    slug: "youth-tech-hub",
    title: "Youth Tech Hub",
    description: "Building a vocational training center for coding, digital marketing, and software development in Monrovia.",
    area: "Technology",
    status: "Upcoming Project",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    btnLabel: "Learn More",
    content: `
      <h2>The Future is Tech</h2>
      <p>Located in the heart of Monrovia, the Youth Tech Hub will be a sanctuary for high-potential youth to learn industry-standard skills in software development and digital entrepreneurship.</p>
      
      <h2>Curriculum</h2>
      <p>The hub will offer 6-month intensive bootcamps followed by internship placements with local and international partners.</p>
    `
  }
];
