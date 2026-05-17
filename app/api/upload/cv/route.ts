import { NextRequest, NextResponse } from 'next/server';
import { supabase, CV_BUCKET, CV_MAX_BYTES } from '@/lib/storage/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { fileName, contentType, fileSize } = await req.json();

    if (!fileName || typeof fileName !== 'string') {
      return NextResponse.json({ error: 'fileName required' }, { status: 400 });
    }
    if (contentType !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }
    if (fileSize && fileSize > CV_MAX_BYTES) {
      return NextResponse.json(
        { error: 'CV exceeds 5 MB. Please compress it at ilovepdf.com before uploading.' },
        { status: 400 }
      );
    }

    const safe = fileName.replace(/[^a-z0-9._-]/gi, '_');
    const path = `cvs/${Date.now()}-${safe}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(CV_BUCKET)
      .createSignedUploadUrl(path);

    if (uploadError || !uploadData) {
      console.error('[upload/cv] signed upload url error', uploadError);
      return NextResponse.json({ error: 'Could not create upload URL' }, { status: 500 });
    }

    // Get a public URL for the CV (bucket must be public in Supabase)
    const { data: urlData } = supabase.storage
      .from(CV_BUCKET)
      .getPublicUrl(path);

    return NextResponse.json({
      uploadUrl: uploadData.signedUrl,
      accessUrl: urlData.publicUrl,
    });
  } catch (err) {
    console.error('[upload/cv] error', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
