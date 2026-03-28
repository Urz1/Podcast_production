/**
 * Mock Data for Development
 * Provides realistic test data for all domain models
 */

import type {
  Episode,
  Topic,
  Host,
  PodcastShow,
  NewsletterCTA,
  TranscriptBlock,
  ChapterMarker,
  PlatformLink,
} from '@/types/domain';

export const mockHosts: Host[] = [
  {
    id: 'host-1',
    name: 'Sarah Chen',
    role: 'Host & Founder',
    bio: 'Sarah is a former tech executive turned podcast host, passionate about exploring the intersection of technology, leadership, and human potential.',
    avatarUrl: '/images/hosts/sarah.svg',
    socialLinks: {
      twitter: 'https://twitter.com/sarahchen',
      linkedin: 'https://linkedin.com/in/sarahchen',
      website: 'https://sarahchen.com',
    },
  },
  {
    id: 'host-2',
    name: 'Marcus Johnson',
    role: 'Co-Host',
    bio: 'Marcus brings 15 years of entrepreneurship experience and a unique perspective on building resilient businesses and teams.',
    avatarUrl: '/images/hosts/marcus.svg',
    socialLinks: {
      twitter: 'https://twitter.com/marcusj',
      linkedin: 'https://linkedin.com/in/marcusjohnson',
    },
  },
];

export const mockTopics: Topic[] = [
  {
    id: 'topic-1',
    slug: 'leadership',
    name: 'Leadership',
    description: 'Insights on leading teams, organizations, and driving meaningful change.',
    episodeCount: 24,
    color: '#2563eb',
  },
  {
    id: 'topic-2',
    slug: 'technology',
    name: 'Technology',
    description: 'Exploring how technology shapes our world and the future of innovation.',
    episodeCount: 18,
    color: '#7c3aed',
  },
  {
    id: 'topic-3',
    slug: 'entrepreneurship',
    name: 'Entrepreneurship',
    description: 'Stories and strategies from founders building the next generation of companies.',
    episodeCount: 32,
    color: '#059669',
  },
  {
    id: 'topic-4',
    slug: 'mindset',
    name: 'Mindset',
    description: 'Developing mental frameworks for success, resilience, and personal growth.',
    episodeCount: 15,
    color: '#dc2626',
  },
  {
    id: 'topic-5',
    slug: 'productivity',
    name: 'Productivity',
    description: 'Systems, tools, and habits for getting more done with less stress.',
    episodeCount: 12,
    color: '#ca8a04',
  },
  {
    id: 'topic-6',
    slug: 'career',
    name: 'Career',
    description: 'Navigating career transitions, growth, and professional development.',
    episodeCount: 20,
    color: '#0891b2',
  },
];

export const mockPlatformLinks: PlatformLink[] = [
  { platform: 'spotify', url: 'https://spotify.com/show/unshakable-base', label: 'Spotify' },
  { platform: 'apple', url: 'https://podcasts.apple.com/unshakable-base', label: 'Apple Podcasts' },
  { platform: 'youtube', url: 'https://youtube.com/@unshakablebase', label: 'YouTube' },
  { platform: 'rss', url: 'https://unshakablebase.com/feed.xml', label: 'RSS Feed' },
  { platform: 'overcast', url: 'https://overcast.fm/unshakable-base', label: 'Overcast' },
];

const generateTranscript = (episodeNum: number): TranscriptBlock[] => [
  {
    id: `t-${episodeNum}-1`,
    timestamp: 0,
    speaker: 'Sarah Chen',
    text: 'Welcome back to Unshakable Base. Today we have an incredible guest joining us to discuss building resilient systems and teams.',
  },
  {
    id: `t-${episodeNum}-2`,
    timestamp: 15,
    speaker: 'Marcus Johnson',
    text: "That's right, Sarah. I've been looking forward to this conversation for weeks. The insights we're going to uncover today are truly transformative.",
  },
  {
    id: `t-${episodeNum}-3`,
    timestamp: 32,
    speaker: 'Sarah Chen',
    text: "Let's dive right in. Can you tell us about your journey and what led you to focus on resilience as a core principle?",
  },
  {
    id: `t-${episodeNum}-4`,
    timestamp: 45,
    speaker: 'Guest',
    text: "Absolutely. It started about ten years ago when I faced what I thought was an insurmountable challenge. My company had just lost its biggest client, and we were on the brink of shutting down.",
  },
  {
    id: `t-${episodeNum}-5`,
    timestamp: 78,
    speaker: 'Guest',
    text: "That experience taught me that resilience isn't about avoiding failure—it's about building systems that can adapt and recover quickly when things go wrong.",
  },
];

const generateChapters = (episodeNum: number): ChapterMarker[] => [
  { id: `ch-${episodeNum}-1`, title: 'Introduction', timestamp: 0, description: 'Welcome and guest introduction' },
  { id: `ch-${episodeNum}-2`, title: 'The Origin Story', timestamp: 120, description: 'How it all began' },
  { id: `ch-${episodeNum}-3`, title: 'Key Challenges', timestamp: 540, description: 'Overcoming major obstacles' },
  { id: `ch-${episodeNum}-4`, title: 'Lessons Learned', timestamp: 1200, description: 'Insights and takeaways' },
  { id: `ch-${episodeNum}-5`, title: 'Practical Advice', timestamp: 1800, description: 'Actionable strategies' },
  { id: `ch-${episodeNum}-6`, title: 'Wrap Up', timestamp: 2400, description: 'Final thoughts and next steps' },
];

export const mockEpisodes: Episode[] = [
  {
    id: 'ep-1',
    slug: 'sam-altman-openai-gpt4-agi',
    episodeNumber: 47,
    title: 'Sam Altman: OpenAI CEO on GPT-4, ChatGPT, and the Future of AI',
    description: 'Sam Altman is the CEO of OpenAI, the company behind GPT-4, ChatGPT, and DALL-E. We discuss the profound implications of AGI and the future of humanity.',
    summary: 'A deep conversation with Sam Altman on the development of GPT-4, the challenges of AI alignment, and what the world looks like after AGI is achieved.',
    showNotes: `<h2>Episode Highlights</h2>
<ul>
<li>The timeline for AGI and its potential impact</li>
<li>GPT-4 capabilities and limitations</li>
<li>The psychological toll of leading OpenAI</li>
<li>Balancing safety and rapid deployment</li>
</ul>
<h2>Resources Mentioned</h2>
<ul>
<li><a href="#">OpenAI Research Papers</a></li>
<li><a href="#">GPT-4 Technical Report</a></li>
</ul>`,
    publishedAt: '2024-03-15T08:00:00Z',
    duration: 8636,
    audioUrl: '/audio/ep-47.mp3',
    videoUrl: 'https://youtube.com/watch?v=L_Guz73e6fw',
    coverImageUrl: '/images/episodes/ep-47.jpg',
    topics: [mockTopics[0], mockTopics[2], mockTopics[3]],
    hosts: mockHosts,
    transcript: generateTranscript(47),
    chapters: generateChapters(47),
    platformLinks: mockPlatformLinks,
    featured: true,
  },
  {
    id: 'ep-2',
    slug: 'future-of-remote-leadership',
    episodeNumber: 46,
    title: 'John Carmack: Doom, Quake, VR, AGI, Programming, and Aliens',
    description: 'John Carmack is a legendary programmer, co-founder of id Software, and former Consulting CTO of Oculus VR. We delve deep into the art of programming, the mechanics of AGI, and the limits of computing.',
    summary: 'A 5-hour technical masterclass with John Carmack, covering the engineering behind groundbreaking video games, virtual reality, and the pursuit of general artificial intelligence.',
    showNotes: `<h2>Episode Highlights</h2>
<ul>
<li>The early days of game engine programming</li>
<li>Optimizing reality for VR</li>
<li>The path to Artificial General Intelligence</li>
</ul>`,
    publishedAt: '2022-08-08T08:00:00Z',
    duration: 18000,
    audioUrl: '/audio/ep-46.mp3',
    videoUrl: 'https://youtube.com/watch?v=I845O57ZSy4',
    coverImageUrl: '/images/episodes/ep-46.jpg',
    topics: [mockTopics[0], mockTopics[1], mockTopics[4]],
    hosts: [mockHosts[0]],
    transcript: generateTranscript(46),
    chapters: generateChapters(46),
    platformLinks: mockPlatformLinks,
    featured: true,
  },
  {
    id: 'ep-3',
    slug: 'from-failure-to-fortune',
    episodeNumber: 45,
    title: 'Elon Musk: War, AI, Aliens, Politics, Physics, and Humanity',
    description: 'Elon Musk is CEO of X, xAI, SpaceX, Tesla, Neuralink, and The Boring Company. A wide-ranging conversation on civilization\'s biggest questions.',
    summary: 'Elon discusses the existential risks of AI, his motivations for acquiring Twitter (now X), the urgency of becoming a multi-planetary species, and the nature of consciousness.',
    showNotes: `<h2>Episode Highlights</h2>
<ul>
<li>The founding vision of xAI and Grok</li>
<li>Engineering challenges of Starship</li>
<li>Free speech and the digital town square</li>
</ul>`,
    publishedAt: '2024-03-01T08:00:00Z',
    duration: 7200,
    audioUrl: '/audio/ep-45.mp3',
    videoUrl: 'https://youtube.com/watch?v=Kbk9BiPhm7o',
    coverImageUrl: '/images/episodes/ep-45.jpg',
    topics: [mockTopics[2], mockTopics[3], mockTopics[5]],
    hosts: mockHosts,
    transcript: generateTranscript(45),
    chapters: generateChapters(45),
    platformLinks: mockPlatformLinks,
  },
  {
    id: 'ep-4',
    slug: 'ai-revolution-what-leaders-need-to-know',
    episodeNumber: 44,
    title: 'MrBeast: Future of YouTube, Twitter, TikTok, and Instagram',
    description: 'Jimmy Donaldson, known as MrBeast, is the most subscribed individual creator on YouTube. We discuss his relentless drive and the science of virality.',
    summary: 'MrBeast breaks down his content creation philosophy, the extreme sacrifices required to be number one, and his philanthropic visions for the future.',
    showNotes: `<h2>Episode Highlights</h2>
<ul>
<li>Analyzing retention and thumbnail psychology</li>
<li>The early days of obsessive YouTube studying</li>
<li>Balancing exponential growth with sanity</li>
</ul>`,
    publishedAt: '2024-02-23T08:00:00Z',
    duration: 5400,
    audioUrl: '/audio/ep-44.mp3',
    videoUrl: 'https://youtube.com/watch?v=Z3_PwvvfxIU',
    coverImageUrl: '/images/episodes/ep-44.jpg',
    topics: [mockTopics[1], mockTopics[0], mockTopics[4]],
    hosts: [mockHosts[1]],
    transcript: generateTranscript(44),
    chapters: generateChapters(44),
    platformLinks: mockPlatformLinks,
  },
  {
    id: 'ep-5',
    slug: 'building-your-personal-board-of-directors',
    episodeNumber: 43,
    title: 'Sam Altman: OpenAI, GPT-5, Sora, Board Saga, and Ilya Sutskever',
    description: 'Sam Altman returns to discuss the turbulence at OpenAI, the release of Sora, and the highly anticipated future of GPT-5.',
    summary: 'In this follow-up interview, Sam opens up about the drama behind his temporary firing from OpenAI, the immense capabilities of their new text-to-video AI, and what AGI truly looks like.',
    showNotes: `<h2>Episode Highlights</h2>
<ul>
<li>Reflections on the OpenAI board crisis</li>
<li>The technical breakthroughs behind Sora</li>
<li>Navigating the geopolitics of artificial intelligence</li>
</ul>`,
    publishedAt: '2024-03-18T08:00:00Z',
    duration: 7200,
    audioUrl: '/audio/ep-43.mp3',
    videoUrl: 'https://youtube.com/watch?v=jvqFAi7vkBc',
    coverImageUrl: '/images/episodes/ep-43.jpg',
    topics: [mockTopics[5], mockTopics[3], mockTopics[0]],
    hosts: mockHosts,
    transcript: generateTranscript(43),
    chapters: generateChapters(43),
    platformLinks: mockPlatformLinks,
  },
  {
    id: 'ep-6',
    slug: 'deep-work-in-a-distracted-world',
    episodeNumber: 42,
    title: 'Andrew Huberman: Relationships, Drama, Betrayal, and Truth',
    description: 'Andrew Huberman is a neurobiologist at Stanford University and host of the Huberman Lab Podcast. We discuss the complexities of human relationships.',
    summary: 'Exploring the biological and psychological underpinnings of why we bond, why we betray, and how humans navigate truth and deception in social hierarchies.',
    showNotes: `<h2>Episode Highlights</h2>
<ul>
<li>The neuroscience of pair bonding</li>
<li>Dealing with betrayal and repairing trust</li>
<li>The role of truth in long-term satisfaction</li>
</ul>`,
    publishedAt: '2024-02-09T08:00:00Z',
    duration: 5200,
    audioUrl: '/audio/ep-42.mp3',
    videoUrl: 'https://youtube.com/watch?v=PB2OEGXmnKU',
    coverImageUrl: '/images/episodes/ep-42.jpg',
    topics: [mockTopics[4], mockTopics[3]],
    hosts: [mockHosts[0]],
    transcript: generateTranscript(42),
    chapters: generateChapters(42),
    platformLinks: mockPlatformLinks,
  },
];

export const mockShow: PodcastShow = {
  name: 'Unshakable Base',
  tagline: 'Building foundations that last',
  description: 'Unshakable Base is a podcast about building resilient careers, organizations, and lives. Each week, we explore the principles, practices, and mindsets that help leaders and creators thrive in an uncertain world.',
  coverImageUrl: '/images/podcast-cover.jpg',
  hosts: mockHosts,
  platformLinks: mockPlatformLinks,
  totalEpisodes: 47,
  categories: ['Business', 'Entrepreneurship', 'Self-Improvement'],
  language: 'en',
  explicit: false,
};

export const mockNewsletterCTA: NewsletterCTA = {
  id: 'newsletter-1',
  title: 'Get the Weekly Digest',
  description: 'Join 15,000+ leaders who receive our weekly insights on building resilient careers and organizations.',
  buttonText: 'Subscribe',
  placeholderText: 'Enter your email',
};
