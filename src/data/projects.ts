export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  tags: string[];
  category: 'Webpages' | 'UI/UX Design' | 'Mobile Applications';
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  date: string;
}

export const projects: Project[] = [
  {
    slug: 'project-one',
    title: 'CodeReflex-LandingPage',
    description:
      'Daily micro-questions that keep your coding skills sharp, without coding sessions.',
    thumbnail: './CodereflexLogo.png',
    tags: ['React.js', 'CSS', 'Typescript'],
    category: 'Webpages',
    liveUrl: 'https://codereflex.netlify.app/',
    githubUrl: 'https://github.com/abdalla980/CodeReflex-Landing-page',
    featured: true,
    date: '2025-06',
  },
  {
    slug: 'project-two',
    title: 'Online English Teaching',
    description:
      'A personalized English learning website for a English Language Coach.',
    thumbnail: '/img_4.png  ',
    tags: ['React', 'Typescript', 'CSS'],
    category: 'Webpages',
    liveUrl: "https://englishwithahmed.netlify.app/",
    githubUrl: "https://github.com/abdalla980/Online-English-Teaching",
    featured: true,
    date: '2025-03',
  },
  {
    slug: 'project-three',
    title: '8zoneStore',
    description:
      "Designed and developed a responsive e-commerce website for a client, leveraging React.js and modern libraries to deliver a seamless user experience and address real-world business needs.",
    thumbnail: '/img_2.png',
    tags: ['React', 'Typescript', 'CSS'],
    githubUrl: 'https://github.com/abdalla980/8zone-store',
    liveUrl:"https://8zonestore.netlify.app/",
    category: 'Webpages',
    featured: true,
    date: '2024-11',
  },
  {
    slug: 'project-four',
    title: 'Atmosfair-Redesign ',
    description:
      'Atmosfair is a German non-profit organization that actively contributes to CO₂ mitigation by promoting, developing and financing renewable energies in over 20 countries worldwide. ',
    thumbnail: './atmosfairLogo.png',
    tags: ['Figma','UI/UX Design'],
    liveUrl:'https://www.behance.net/gallery/231106545/Atmosfair-Website-Redesign',
    category: 'UI/UX Design',
    featured: false,
    date: '2024-08',
  },
  {
    slug: 'project-five',
    title: 'CodeReflex',
    description:
        'Daily micro-questions that keep your coding skills sharp, without coding sessions.',
    thumbnail: './CodeReflex.png',
    tags: ['Dart', 'Flutter', 'CSS'],
    category: 'Mobile Applications',
    featured: false,
    date: '2024-05',
  },
  {
    slug: 'project-five',
    title: "Coco's Marketing Application",
    description: " A collaborative project built to help businesses and creators improve their marketing by managing social media, requesting websites, and tracking performance — all from one dashboard.",
    thumbnail: './coco3.png',
    tags: ['Dart', 'Flutter', 'CSS'],
    category: 'Mobile Applications',
    featured: false,
    date: '2024-05',
  },
  {
    slug: 'project-five',
    title: "Deutsch Genie",
    description:'An mobile application Design for a german language mobile application, made to make german learning more enjoyable',
    thumbnail: './DeutschGenie.png',
    tags: ['Figma','UI/UX Design'],
    category: 'UI/UX Design',
    featured: false,
    date: '2024-05',
  },
];
