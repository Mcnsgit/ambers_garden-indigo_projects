// notion-utils.js
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

async function ensureNotionDatabase() {
  if (NOTION_DATABASE_ID && process.env.NODE_ENV!== 'production') {
    return NOTION_DATABASE_ID;
  }

  try {
    const response = await notion.databases.create({
      parent: { page_id: NOTION_DATABASE_ID },
      title: [
        {
          type: 'text',
          text: {
            content: 'Subscriber Database',
          },
        },
      ],
      properties: {
        'First Name': { title: {} },
        'Last Name': { rich_text: {} },
        Email: { email: {} },
        Consent: { checkbox: {} },
        'Subscription Date': { date: {} },
      },
    });

    console.log('Created Notion database:', response.id);
    return response.id;
  } catch (error) {
    console.error('Error creating Notion database:', error.message);
    throw new Error('Failed to create Notion database');
  }
}

export { ensureNotionDatabase };