const CAL_API_KEY = process.env.CAL_API_KEY;
const CAL_API_BASE_URL = process.env.CAL_API_BASE_URL || 'https://api.cal.com/v2';
const CAL_USERNAME = process.env.CAL_USERNAME || 'signalxstudio';

const mapEventType = (eventType) => ({
  id: eventType.id,
  title: eventType.title,
  slug: eventType.slug,
  description: eventType.description,
  length: eventType.length,
  bookingUrl: `https://cal.com/${CAL_USERNAME}/${eventType.slug}`,
  hidden: eventType.hidden,
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!CAL_API_KEY) {
    console.error('[cal-event-types] Missing CAL_API_KEY');
    return res
      .status(500)
      .json({ error: 'Scheduling service is not configured. Please try again later.' });
  }

  try {
    const response = await fetch(`${CAL_API_BASE_URL}/event-types`, {
      headers: {
        Authorization: `Bearer ${CAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error('[cal-event-types] Cal.com API error:', response.status, errorText);
      return res
        .status(502)
        .json({ error: 'Unable to load scheduling availability. Please try again soon.' });
    }

    const data = await response.json();
    const eventTypeGroups = data?.data?.eventTypeGroups ?? [];

    const eventTypes = eventTypeGroups
      .flatMap((group) => group?.eventTypes || [])
      .filter((eventType) => !eventType.hidden)
      .map(mapEventType);

    return res.status(200).json({ eventTypes });
  } catch (error) {
    console.error('[cal-event-types] Unexpected error:', error);
    return res
      .status(500)
      .json({ error: 'Unable to load scheduling availability. Please try again later.' });
  }
}

