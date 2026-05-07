import fs from 'fs/promises';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  image: string;
}

const DATA_PATH = path.join(process.cwd(), 'data', 'posts.json');

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const fileContents = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find(post => post.slug === slug);
}

// Keep the static export for now to avoid breaking existing imports immediately,
// but we should update pages to use the async functions.
// NOTE: This will be empty in client components if not pre-fetched.
export const blogPosts: BlogPost[] = []; 

