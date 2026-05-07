import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';
import { BlogPost } from '@/lib/blog';

const DATA_PATH = path.join(process.cwd(), 'data', 'posts.json');

// Helper to check authentication
function isAuthenticated() {
  const session = cookies().get('admin_session');
  return session?.value === 'authenticated';
}

async function getPosts(): Promise<BlogPost[]> {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function savePosts(posts: BlogPost[]) {
  await fs.writeFile(DATA_PATH, JSON.stringify(posts, null, 2), 'utf8');
}

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const postData: BlogPost = await request.json();
    const posts = await getPosts();
    
    // Check if we are updating or creating
    const index = posts.findIndex(p => p.slug === postData.slug);
    
    if (index !== -1) {
      // Update existing
      posts[index] = postData;
    } else {
      // Create new
      posts.unshift(postData);
    }
    
    await savePosts(posts);
    return NextResponse.json({ success: true, post: postData });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save post' }, { status: 500 });
  }
}

// DELETE is handled by a sub-route or can be handled here with a search param
export async function DELETE(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    const posts = await getPosts();
    const filteredPosts = posts.filter(p => p.slug !== slug);
    
    await savePosts(filteredPosts);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
