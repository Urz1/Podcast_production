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
    slug: 'building-antifragile-organizations',
    episodeNumber: 47,
    title: 'Building Antifragile Organizations with Nassim Taleb',
    description: 'A deep dive into creating organizations that don\'t just survive chaos—they thrive in it. We explore the principles of antifragility and how to apply them to modern businesses.',
    summary: 'Learn how to build organizations that grow stronger from adversity. Nassim Taleb joins us to discuss antifragility, risk management, and why most businesses fail to prepare for uncertainty.',
    showNotes: `<h2>Episode Highlights</h2>
<ul>
<li>The difference between fragile, robust, and antifragile systems</li>
<li>Why most risk management strategies fail</li>
<li>Practical ways to introduce controlled stressors</li>
<li>Building redundancy without waste</li>
</ul>
<h2>Resources Mentioned</h2>
<ul>
<li><a href="#">Antifragile: Things That Gain from Disorder</a></li>
<li><a href="#">The Black Swan</a></li>
</ul>`,
    publishedAt: '2024-03-15T08:00:00Z',
    duration: 3420,
    audioUrl: '/audio/ep-47.mp3',
    videoUrl: 'https://youtube.com/watch?v=example1',
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
    title: 'The Future of Remote Leadership',
    description: 'How the best leaders are adapting to distributed teams and what it means for organizational culture.',
    summary: 'Explore the evolving landscape of remote work and leadership. We discuss communication strategies, building trust virtually, and maintaining culture across time zones.',
    showNotes: `<h2>Episode Highlights</h2>
<ul>
<li>Async vs sync communication best practices</li>
<li>Building psychological safety remotely</li>
<li>Tools and systems for distributed teams</li>
</ul>`,
    publishedAt: '2024-03-08T08:00:00Z',
    duration: 2880,
    audioUrl: '/audio/ep-46.mp3',
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
    title: 'From Failure to Fortune: Lessons from Serial Entrepreneurs',
    description: 'Three founders share their biggest failures and how those experiences led to their eventual success.',
    summary: 'Failure is often the best teacher. Join us as three successful entrepreneurs reveal their lowest moments and the lessons that transformed their approach to business.',
    showNotes: `<h2>Episode Highlights</h2>
<ul>
<li>The psychology of failure and recovery</li>
<li>Pattern recognition across multiple ventures</li>
<li>When to pivot vs when to persist</li>
</ul>`,
    publishedAt: '2024-03-01T08:00:00Z',
    duration: 3120,
    audioUrl: '/audio/ep-45.mp3',
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
    title: 'The AI Revolution: What Leaders Need to Know',
    description: 'Cutting through the hype to understand how AI will actually impact your business and leadership approach.',
    summary: 'AI is transforming every industry. We separate fact from fiction and provide a practical framework for leaders navigating this technological shift.',
    showNotes: `<h2>Episode Highlights</h2>
<ul>
<li>Real vs perceived AI capabilities</li>
<li>Preparing your team for AI integration</li>
<li>Ethical considerations and governance</li>
</ul>`,
    publishedAt: '2024-02-23T08:00:00Z',
    duration: 2760,
    audioUrl: '/audio/ep-44.mp3',
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
    title: 'Building Your Personal Board of Directors',
    description: 'How to cultivate a network of advisors who can guide your career and personal growth.',
    summary: 'Every successful person has a support system. Learn how to build your own personal board of directors for career guidance and accountability.',
    showNotes: `<h2>Episode Highlights</h2>
<ul>
<li>Identifying the right mentors and advisors</li>
<li>Structuring productive advisory relationships</li>
<li>Giving back as you grow</li>
</ul>`,
    publishedAt: '2024-02-16T08:00:00Z',
    duration: 2400,
    audioUrl: '/audio/ep-43.mp3',
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
    title: 'Deep Work in a Distracted World',
    description: 'Strategies for maintaining focus and producing your best work in an age of constant interruption.',
    summary: 'Cal Newport joins us to discuss the art of deep work, protecting your attention, and why the ability to focus is becoming a superpower.',
    showNotes: `<h2>Episode Highlights</h2>
<ul>
<li>The science of attention and focus</li>
<li>Creating rituals for deep work</li>
<li>Managing digital distractions</li>
</ul>`,
    publishedAt: '2024-02-09T08:00:00Z',
    duration: 3000,
    audioUrl: '/audio/ep-42.mp3',
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
