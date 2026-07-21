export function getProjectLinksConfig(category: string) {
  switch (category) {
    case 'Mobile Apps':
    case 'Desktop Apps':
      return { liveLabel: 'Release', githubLabel: 'View Code' };
    case 'UI/UX':
      return { liveLabel: 'View Design', githubLabel: 'Other Link' };
    case 'API':
      return { liveLabel: 'API Link', githubLabel: 'View Code' };
    case 'Open Source':
      return { liveLabel: 'Release', githubLabel: 'View Code' };
    case 'Web Apps':
    default:
      return { liveLabel: 'Live Demo', githubLabel: 'View Code' };
  }
}
