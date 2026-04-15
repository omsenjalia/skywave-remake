// Site Configuration
export interface SiteConfig {
  language: string;
  siteTitle: string;
  siteDescription: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  siteTitle: "Skywave Info Solutions - Web & Mobile App Development Company",
  siteDescription: "Skywave Info Solutions is a leading mobile app and web development company in Ahmedabad, India. We offer end-to-end IT services including AI solutions, blockchain, UI/UX design, and digital marketing.",
};

// Hero Section
export interface HeroConfig {
  backgroundText: string;
  heroImages: { src: string; alt: string; label: string }[];
  overlayText: string;
  brandName: string;
  navLinks: { label: string; href: string }[];
  rotatingWords: string[];
  subtext: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
}

export const heroConfig: HeroConfig = {
  backgroundText: "SKYWAVE",
  heroImages: [
    { src: "/images/hero/artificial-intelligence.png", alt: "Artificial Intelligence", label: "AI Solutions" },
    { src: "/images/hero/web-development.png", alt: "Web Development", label: "Web Dev" },
    { src: "/images/hero/digital-marketing.png", alt: "Digital Marketing", label: "Digital Marketing" },
    { src: "/images/hero/business-consultation.png", alt: "Business Consultation", label: "Consulting" },
  ],
  overlayText: "Innovate. Create. Elevate.",
  brandName: "Skywave",
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Solutions", href: "#solutions" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact", href: "#contact" },
  ],
  rotatingWords: ["Artificial Intelligence", "Web Development", "Mobile Apps", "Blockchain", "Cloud Solutions"],
  subtext: "Highly automated and AI-powered software development company focused on building scalable solutions that transform businesses.",
  ctaPrimary: "Get A Quote",
  ctaSecondary: "Schedule A Meeting",
  ctaSecondaryHref: "https://calendly.com/skywaveinfosolutions",
};

// Intro Grid Section (About Preview)
export interface PortfolioImage {
  src: string;
  alt: string;
}

export interface IntroGridConfig {
  titleLine1: string;
  titleLine2: string;
  description: string;
  portfolioImages: PortfolioImage[];
  accentText: string;
  stats: { value: number; suffix: string; label: string }[];
}

export const introGridConfig: IntroGridConfig = {
  titleLine1: "We Love &",
  titleLine2: "Know What We Do",
  description: "Skywave Info Solutions is a trusted IT services provider. We have a dedicated team that assists in bringing your dream project to life. Our services include designing, development, marketing and sales — helping transform business applications to meet future needs.",
  portfolioImages: [
    { src: "/images/about/grid-1.jpg", alt: "Our Process" },
    { src: "/images/about/grid-2.jpg", alt: "Our Team" },
    { src: "/images/about/grid-3.jpg", alt: "Innovation" },
    { src: "/images/about/grid-4.jpg", alt: "Design" },
    { src: "/images/about/grid-5.jpg", alt: "Development" },
  ],
  accentText: "Small or Big Business, We are there for you!",
  stats: [
    { value: 95, suffix: "%", label: "Customer Satisfaction" },
    { value: 50, suffix: "+", label: "Specialists" },
    { value: 26, suffix: "+", label: "Industries Served" },
    { value: 150, suffix: "+", label: "Successful Projects" },
  ],
};

// Featured Projects Section (Portfolio)
export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
}

export interface FeaturedProjectsConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  viewAllText: string;
  viewAllHref: string;
  viewProjectText: string;
  projects: Project[];
}

export const featuredProjectsConfig: FeaturedProjectsConfig = {
  subtitle: "Our Projects",
  titleRegular: "Our Portfolio",
  titleItalic: "Speaks Better",
  viewAllText: "View More",
  viewAllHref: "#portfolio",
  viewProjectText: "View Project",
  projects: [
    {
      id: 1,
      title: "Inductive Bible Study",
      category: "Mobile App",
      year: "2024",
      image: "/images/portfolio/inductive-bible-study.png",
      description: "A comprehensive bible study app with advanced search and annotations.",
    },
    {
      id: 2,
      title: "Bible For Me",
      category: "Mobile App",
      year: "2024",
      image: "/images/portfolio/bible-for-me.png",
      description: "Personal bible reading companion with daily plans and bookmarks.",
    },
    {
      id: 3,
      title: "All About My Doll",
      category: "E-Commerce",
      year: "2023",
      image: "/images/portfolio/all-about-my-doll.png",
      description: "Custom doll marketplace with personalized doll builder.",
    },
    {
      id: 4,
      title: "Asthme App",
      category: "Healthcare",
      year: "2023",
      image: "/images/portfolio/asthme.png",
      description: "Asthma management app with trigger tracking and medication reminders.",
    },
  ],
};

// Services Section
export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
  color: string;
}

export interface ServicesConfig {
  subtitle: string;
  titleLine1: string;
  titleLine2Italic: string;
  description: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  subtitle: "Our Services",
  titleLine1: "End to End",
  titleLine2Italic: "Solutions",
  description: "We offer end-to-end services and solutions for almost all industries. Dedicated teams or individual developers who work exclusively on your project.",
  services: [
    {
      iconName: "Smartphone",
      title: "App Development",
      description: "Native and cross-platform mobile applications built with cutting-edge technologies for iOS and Android.",
      color: "#0A84FF",
    },
    {
      iconName: "Globe",
      title: "Website Development",
      description: "Responsive, scalable web applications using modern frameworks like React, Angular, Vue and Next.js.",
      color: "#30D158",
    },
    {
      iconName: "Palette",
      title: "UI/UX Design",
      description: "User-centered design that creates engaging and intuitive digital experiences users love.",
      color: "#FF9F0A",
    },
    {
      iconName: "Search",
      title: "SEO Services",
      description: "Data-driven strategies to improve visibility and drive organic traffic growth for your business.",
      color: "#BF5AF2",
    },
    {
      iconName: "Blocks",
      title: "Odoo ERP",
      description: "Custom ERP solutions to streamline your business processes, operations, and workflows.",
      color: "#FF453A",
    },
    {
      iconName: "Link",
      title: "Blockchain",
      description: "Decentralized applications and smart contracts for secure, transparent transactions.",
      color: "#64D2FF",
    },
  ],
};

// Why Choose Me Section (Features & Stats)
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface FeatureCard {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface WhyChooseMeConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  statsLabel: string;
  stats: StatItem[];
  featureCards: FeatureCard[];
  wideImage: string;
  wideImageAlt: string;
  wideTitle: string;
  wideDescription: string;
}

export const whyChooseMeConfig: WhyChooseMeConfig = {
  subtitle: "Why Choose Us",
  titleRegular: "You Can",
  titleItalic: "Rely On Us",
  statsLabel: "By The Numbers",
  stats: [
    { value: 95, suffix: "%", label: "Customer Satisfaction" },
    { value: 50, suffix: "+", label: "Specialists in our team" },
    { value: 26, suffix: "+", label: "Industries Served" },
    { value: 150, suffix: "+", label: "Successful Projects" },
  ],
  featureCards: [
    {
      image: "/images/about/feature-1.jpg",
      imageAlt: "Make Real Differences",
      title: "Make Real Differences",
      description: "Our tailored solutions bring real changes to business processes, saving time and increasing ROI.",
    },
    {
      image: "/images/about/feature-2.jpg",
      imageAlt: "Hand Crafted Designs",
      title: "Hand Crafted Designs",
      description: "We specialize in handcrafted, unique designs for web and mobile applications.",
    },
  ],
  wideImage: "/images/about/feature-wide.jpg",
  wideImageAlt: "Our Team",
  wideTitle: "A Team of Experts",
  wideDescription: "Designers, developers, quality testers, and managers all working together for your project's success.",
};

// Testimonials Section
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}

export interface TestimonialsConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  testimonials: Testimonial[];
}

export const testimonialsConfig: TestimonialsConfig = {
  subtitle: "What They Say",
  titleRegular: "Client",
  titleItalic: "Stories",
  testimonials: [
    {
      id: 1,
      name: "David",
      role: "Business Owner",
      image: "/testimonial-1.jpg",
      quote: "Skywave team is easy to talk to and can finish work on time and with quality. Always ready to lend a helping hand!",
    },
    {
      id: 2,
      name: "Sarah",
      role: "Project Manager",
      image: "/testimonial-2.jpg",
      quote: "Working with Skywave has been amazing. Very knowledgeable and reliable in case of urgencies. Very patient with us throughout the project.",
    },
    {
      id: 3,
      name: "Henry",
      role: "CTO",
      image: "/testimonial-3.jpg",
      quote: "Skywave Info Solutions are excellent developers. I highly recommend their services. They provide top-notch code.",
    },
    {
      id: 4,
      name: "Michael",
      role: "Startup Founder",
      image: "/testimonial-4.jpg",
      quote: "My working experience with them is amazing. They respond to clients very fast and completed work before due time.",
    },
  ],
};

// Tech Stack Section
export interface TechCategory {
  name: string;
  technologies: string[];
}

export interface TechStackConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  categories: TechCategory[];
}

export const techStackConfig: TechStackConfig = {
  subtitle: "Technologies",
  titleRegular: "Tools &",
  titleItalic: "Platforms",
  categories: [
    {
      name: "Frontend",
      technologies: ["HTML", "CSS", "JavaScript", "Angular JS", "React JS", "Next JS", "Vue JS"],
    },
    {
      name: "Backend",
      technologies: ["Node JS", "PHP", "Java", "Python", "Express JS", "Nest JS"],
    },
    {
      name: "Mobile",
      technologies: ["React Native", "Swift", "Kotlin", "Xamarin", "Flutter", "Android"],
    },
    {
      name: "Database",
      technologies: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Oracle", "DynamoDB"],
    },
    {
      name: "Cloud",
      technologies: ["AWS", "Microsoft Azure", "Google Cloud Platform"],
    },
    {
      name: "DevOps",
      technologies: ["Docker", "Kubernetes", "Jenkins", "GitLab", "Gradle"],
    },
  ],
};

// FAQ Section (CTA Section)
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  ctaText: string;
  ctaButtonText: string;
  ctaHref: string;
  faqs: FAQItem[];
}

export const faqConfig: FAQConfig = {
  subtitle: "Get In Touch",
  titleRegular: "Let Us Improve",
  titleItalic: "Your Business",
  ctaText: "Need an awesome team with great skills and years of industrial experience to skyrocket your business? Let us connect and build together a perfect place for your customers.",
  ctaButtonText: "Get A Quote",
  ctaHref: "#contact",
  faqs: [
    {
      id: "1",
      question: "What services does Skywave offer?",
      answer: "We offer comprehensive IT services including mobile app development, web development, UI/UX design, SEO services, Odoo ERP development, and blockchain solutions.",
    },
    {
      id: "2",
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity. A simple website may take 2-4 weeks, while complex applications can take 3-6 months. We provide detailed timelines during consultation.",
    },
    {
      id: "3",
      question: "Do you offer ongoing support?",
      answer: "Yes, we provide comprehensive post-launch support and maintenance packages to ensure your application runs smoothly and stays up-to-date.",
    },
    {
      id: "4",
      question: "What is your development process?",
      answer: "We follow an Agile methodology with iterative sprints. This includes discovery, design, development, testing, deployment, and ongoing maintenance phases.",
    },
    {
      id: "5",
      question: "Do you work with startups?",
      answer: "Absolutely! We love working with startups and offer flexible engagement models. We can help you build an MVP, scale your product, or provide dedicated development teams.",
    },
  ],
};

// Footer Section
export interface SocialLink {
  iconName: string;
  href: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  logoText: string;
  contactLabel: string;
  email: string;
  phone: string;
  locationText: string;
  navigationLabel: string;
  navLinks: FooterLink[];
  socialLabel: string;
  socialLinks: SocialLink[];
  tagline: string;
  copyright: string;
  bottomLinks: FooterLink[];
  servicesLabel: string;
  servicesLinks: FooterLink[];
  solutionsLabel: string;
  solutionsLinks: FooterLink[];
  hireLabel: string;
  hireLinks: FooterLink[];
}

export const footerConfig: FooterConfig = {
  logoText: "SKYWAVE",
  contactLabel: "Contact Us",
  email: "info@skywaveinfosolutions.com",
  phone: "(+91) 94277-22776",
  locationText: "Ahmedabad, India",
  navigationLabel: "Know Us",
  navLinks: [
    { label: "Testimonials", href: "#testimonials" },
    { label: "Careers", href: "#careers" },
    { label: "Blog", href: "#blog" },
    { label: "FAQ", href: "#faq" },
  ],
  socialLabel: "Follow Us",
  socialLinks: [
    { iconName: "Facebook", href: "https://www.facebook.com/SkywaveInfoSolutions/", label: "Facebook" },
    { iconName: "Instagram", href: "https://www.instagram.com/skywave_infosolutions/", label: "Instagram" },
    { iconName: "Twitter", href: "https://twitter.com/SkywavePvt", label: "Twitter" },
    { iconName: "Linkedin", href: "https://in.linkedin.com/company/skywave-infotech", label: "LinkedIn" },
    { iconName: "Youtube", href: "https://www.youtube.com/@skywaveinfosolutionspvtltd7949", label: "YouTube" },
  ],
  tagline: "Innovate. Create. Elevate.",
  copyright: "© 2026 Skywave Info Solutions Pvt. Ltd. All rights reserved.",
  bottomLinks: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms and Conditions", href: "#terms" },
    { label: "Disclaimer", href: "#disclaimer" },
  ],
  servicesLabel: "Services",
  servicesLinks: [
    { label: "App Development", href: "#services" },
    { label: "Website Development", href: "#services" },
    { label: "UI/UX Design", href: "#services" },
    { label: "SEO Services", href: "#services" },
    { label: "Odoo ERP", href: "#services" },
    { label: "Blockchain", href: "#services" },
  ],
  solutionsLabel: "Solutions",
  solutionsLinks: [
    { label: "GPS Tracking", href: "#solutions" },
    { label: "IoT Solutions", href: "#solutions" },
    { label: "Beacon Solutions", href: "#solutions" },
    { label: "Healthcare", href: "#solutions" },
    { label: "Chatbot", href: "#solutions" },
    { label: "Voice Enabled", href: "#solutions" },
  ],
  hireLabel: "Hire Resources",
  hireLinks: [
    { label: "Android Developers", href: "#hire" },
    { label: "iOS Developers", href: "#hire" },
    { label: "React Developers", href: "#hire" },
    { label: "PHP Developers", href: "#hire" },
    { label: "Laravel Developers", href: "#hire" },
    { label: "Shopify Developers", href: "#hire" },
  ],
};
