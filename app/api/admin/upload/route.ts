import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  // Auth check
  const session = cookies().get('admin_session');
  if (!session || session.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.log('Upload error: No file in formData');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    console.log(`Processing upload: ${file.name} (${file.size} bytes)`);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    console.log(`Target directory: ${uploadDir}`);

    // Ensure directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
      console.log('Directory ensured');
    } catch (err) {
      console.log('Directory already exists or error:', err);
    }

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);
    console.log(`File written successfully to: ${filePath}`);

    const publicPath = `/uploads/${filename}`;

    return NextResponse.json({ url: publicPath });
  } catch (error: any) {
    console.error('Detailed Upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error.message || 'Unknown error' 
    }, { status: 500 });
  }
}
