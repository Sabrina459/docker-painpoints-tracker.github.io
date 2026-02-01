export interface PainPoint {
  id: string;
  title: string;
  description: string;
  severity: 'High' | 'Very High' | 'Medium-High';
  userTypes: string[];
  category: string;
  upvotes: number;
  redditQuote: string;
  redditSource: string;
  affectedUsers: number; // estimated number based on description
}

export const painPoints: PainPoint[] = [
  {
    id: '1',
    title: 'Networking instability after Docker updates',
    description: 'Docker updates breaking networking (overlay network, bridge, host connectivity after upgrades)',
    severity: 'High',
    userTypes: ['Intermediate-advanced users', 'Linux users', 'Production users', 'Swarm users'],
    category: 'Networking',
    upvotes: 34,
    redditQuote: 'Docker-CE update breaking networking?',
    redditSource: 'https://www.reddit.com/r/docker/comments/1itvg36',
    affectedUsers: 850
  },
  {
    id: '2',
    title: 'Files/Volumes permission & mounting issues',
    description: 'Volume not showing as "in use", permission denied, NFS/local mount issues',
    severity: 'High',
    userTypes: ['macOS users', 'Mixed OS hosts', 'Self-hosting users', 'Home lab users'],
    category: 'Volumes',
    upvotes: 13,
    redditQuote: 'Over Confidence … permissions',
    redditSource: 'https://www.reddit.com/r/selfhosted/comments/1f1atyf',
    affectedUsers: 720
  },
  {
    id: '3',
    title: 'Volume corruption / data loss',
    description: 'Persistent storage issues leading to data corruption and loss',
    severity: 'Very High',
    userTypes: ['Database users', 'Stateful service users', 'Cross-host volume users'],
    category: 'Volumes',
    upvotes: 8,
    redditQuote: 'Volume corruption reports in forums',
    redditSource: 'https://www.reddit.com/r/selfhosted/comments/1f1atyf/over_confidence_or_how_i_borked_my_docker_volumes/?',
    affectedUsers: 320
  },
  {
    id: '4',
    title: 'Steep learning curve & documentation confusion',
    description: 'Confusion between concepts (volumes vs bind mounts, compose vs run etc.)',
    severity: 'Medium-High',
    userTypes: ['Beginners', 'New container developers', 'Team workflow users'],
    category: 'Documentation',
    upvotes: 27,
    redditQuote: 'People using bind mounts vs named volumes, because they found named volumes confusing',
    redditSource: 'https://redlib.jeikobu.net/r/docker?',
    affectedUsers: 1200
  },
  {
    id: '5',
    title: 'Unexpected behavior changes in updates',
    description: 'Docker updates breaking unexpectedly with version releases causing behavior changes',
    severity: 'High',
    userTypes: ['Intermediate-advanced users', 'Frequent updaters', 'Production users'],
    category: 'Updates',
    upvotes: 34,
    redditQuote: 'Docker Container has not internet access anymore',
    redditSource: 'https://www.reddit.com/r/docker/comments/1iyj6xb',
    affectedUsers: 680
  }
];

// Mock trend data for major Docker releases
export const trendData = [
  { release: 'v20.10', date: '2020-12', Networking: 45, Volumes: 38, Documentation: 52, Updates: 28 },
  { release: 'v23.0', date: '2023-02', Networking: 52, Volumes: 45, Documentation: 48, Updates: 35 },
  { release: 'v24.0', date: '2023-05', Networking: 67, Volumes: 58, Documentation: 44, Updates: 42 },
  { release: 'v25.0', date: '2024-01', Networking: 85, Volumes: 72, Documentation: 40, Updates: 68 },
  { release: 'v26.0', date: '2024-06', Networking: 78, Volumes: 68, Documentation: 38, Updates: 55 },
  { release: 'v27.0', date: '2024-09', Networking: 72, Volumes: 62, Documentation: 35, Updates: 48 }
];

export const severityColors = {
  'Very High': '#ef4444', // red-500
  'High': '#f97316', // orange-500
  'Medium-High': '#eab308' // yellow-500
};

export const categoryColors = {
  'Networking': '#0db7ed', // Docker blue
  'Volumes': '#384d54', // Docker dark blue-gray
  'Documentation': '#06b6d4', // cyan-500
  'Updates': '#8b5cf6' // violet-500
};