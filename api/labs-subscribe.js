const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_LABS_AUDIENCE_ID = process.env.RESEND_LABS_AUDIENCE_ID || process.env.RESEND_AUDIENCE_ID;

/**
 * Lightweight Vercel serverless function to add contacts to the Labs audience.
 * Requires RESEND_API_KEY and RESEND_LABS_AUDIENCE_ID environment variables.
 */
export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', ['POST']);
    return response.status(405).json({ error: 'Method not allowed' });
  }

  if (!RESEND_API_KEY || !RESEND_LABS_AUDIENCE_ID) {
    console.error('Resend environment variables are missing');
    return response
      .status(500)
      .json({ error: 'Subscription service is not configured. Please try again later.' });
  }

  try {
    const { email } = request.body || {};

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return response.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const resendResponse = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        audience_id: RESEND_LABS_AUDIENCE_ID,
        unsubscribed: false,
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.json().catch(() => ({}));
      const errorMessage =
        errorBody?.message || errorBody?.error || 'Failed to add email to the labs audience.';

      // Resend returns 409 if the contact already exists in the audience
      if (resendResponse.status === 409) {
        return response
          .status(200)
          .json({ message: 'You’re already receiving Labs updates. Thanks for staying close!' });
      }

      console.error('Resend subscription error:', resendResponse.status, errorBody);
      return response.status(502).json({ error: errorMessage });
    }

    return response
      .status(200)
      .json({ message: 'Subscription confirmed. Welcome to the Labs signal.' });
  } catch (error) {
    console.error('Labs subscription error:', error);
    return response
      .status(500)
      .json({ error: 'We could not process your subscription. Please try again later.' });
  }
}

