import { BlogPost } from '@/data/blogs';

const BLOG_RSS_URL = 'https://prashsainidev.hashnode.dev/rss.xml';
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(BLOG_RSS_URL)}`;

/**
 * Fetches the latest blogs from Hashnode via a free RSS-to-JSON conversion API.
 * This completely bypasses the new Hashnode GraphQL Paid API restrictions
 * while providing live, up-to-date data.
 */
export async function fetchHashnodeBlogs(): Promise<BlogPost[]> {
  try {
    const response = await fetch(API_URL, {
      // Next.js App Router specific: Revalidate the cache every 1 hour (3600 seconds)
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error('RSS2JSON API returned an error status.');
    }

    // Map the external API data precisely to our internal BlogPost interface
    return data.items.map(
      (item: {
        description?: string;
        title: string;
        link: string;
        pubDate: string;
        thumbnail: string;
      }) => {
        // Strip HTML tags from description and limit length to make a clean 'brief'
        const cleanBrief = item.description?.replace(/<[^>]+>/g, '').substring(0, 160) + '...';

        return {
          title: item.title,
          brief: cleanBrief,
          slug: item.link.split('/').pop() || '',
          url: item.link,
          dateAdded: item.pubDate,
          coverImage: item.thumbnail,
        };
      }
    );
  } catch (error) {
    console.error('Error fetching live Hashnode blogs:', error);
    return []; // Return empty array on failure so UI can seamlessly fallback to static data
  }
}
