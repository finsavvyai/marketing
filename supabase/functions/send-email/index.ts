import { Resend } from 'npm:resend@1.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface FormData {
  name: string;
  email: string;
  company: string;
  pipelines: string;
  platforms: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const formData: FormData = await req.json();
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

    const { data, error } = await resend.emails.send({
      from: 'PipeWarden Beta <beta@pipewarden.com>',
      to: ['info@pipewarden.com'],
      subject: 'New Beta Program Application',
      html: `
        <h2>New Beta Application</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Company:</strong> ${formData.company}</p>
        <p><strong>Number of Pipelines:</strong> ${formData.pipelines}</p>
        <p><strong>CI/CD Platforms:</strong> ${formData.platforms}</p>
      `,
    });

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});