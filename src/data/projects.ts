export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  date: string;
}

export const projects: Project[] = [
  {
    slug: 'project-one',
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce app with cart, checkout, and payment integration.',
    thumbnail: '/images/project1.jpg',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project',
    featured: true,
    date: '2025-06',
  },
  {
    slug: 'project-two',
    title: 'AI Dashboard',
    description:
      'Real-time analytics dashboard for monitoring ML model performance.',
    thumbnail: '/images/project2.jpg',
    tags: ['React', 'D3.js', 'Python'],
    featured: true,
    date: '2025-03',
  },
  {
    slug: 'project-three',
    title: 'Task Management App',
    description:
      'Collaborative task manager with real-time updates and team features.',
    thumbnail: '/images/project3.jpg',
    tags: ['React', 'Node.js', 'Socket.io'],
    featured: true,
    date: '2024-11',
  },
  {
    slug: 'project-four',
    title: 'Weather App',
    description:
      'Beautiful weather app with location-based forecasts and animated visuals.',
    thumbnail: '/images/project4.jpg',
    tags: ['React', 'OpenWeather API', 'GSAP'],
    featured: false,
    date: '2024-08',
  },
  {
    slug: 'project-five',
    title: 'Portfolio V1',
    description:
      'My first portfolio website built with vanilla HTML, CSS, and JavaScript.',
    thumbnail: '/images/project5.jpg',
    tags: ['HTML', 'CSS', 'JavaScript'],
    featured: false,
    date: '2024-05',
  },
];
