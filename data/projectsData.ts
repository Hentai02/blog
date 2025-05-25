interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Portainer',
    description: `An Open Source GUI tool for containers that helps you to manage your dockerized application.
    It works with Kubernetes, Docker, Docker Swarm, and Azure ACI.`,
    // imgSrc: '/static/images/portainer.png',
    href: 'https://docs.portainer.io/',
  },
  {
    title: 'Web.dev',
    description: `Mesure performance of your website based on four criteria: 
    Performance, Accessibility, Best Practices, and SEO. Get tips to improve your user experience.`,

    href: 'https://web.dev/measure/',
  },
  {
    title: 'CI/CD Best Practices',
    description: `A list of best practices to follow when setting up a CI/CD pipeline for your next application.`,
    href: 'https://www.digitalocean.com/community/tutorials/an-introduction-to-ci-cd-best-practices',
  },
  {
    title: 'Draw.io',
    description: `draw.io is free online diagram software. You can use it as a flowchart maker, 
    network diagram software, to create UML online, as an ER diagram tool, to design database schema, 
    to build BPMN online, as a circuit diagram maker, and more. draw.io can import .vsdx, Gliffy™ and Lucidchart™ files .`,
    href: 'https://draw.io',
  },
  {
    title: 'Learnshell',
    description: `An interactive tutorial to learn to program with shell.`,
    href: 'https://www.learnshell.org/',
  },
  {
    title: 'icones',
    description: `Icon Explorer with Instant searching, powered by Iconify`,
    href: 'https://icones.js.org/',
  },
]

export default projectsData
