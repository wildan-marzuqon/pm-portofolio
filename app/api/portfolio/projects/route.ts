export async function GET() {
  return Response.json({
    filters: ['All', 'AI Product', 'System Analysis'],
    projects: [
      {
        title: 'AI Chatbot & Conversational AI Platform',
        description:
          'Automated customer support and collection system powered by NLP, reducing operational response times significantly.',
        badges: ['AI Product', 'NLP', 'Product Discovery'],
      },
      {
        title: 'Enterprise Business Operation System',
        description:
          'End-to-end digital transformation platform connecting multi-department workflows and automated reporting dashboards.',
        badges: ['System Analysis', 'Agile/Scrum', 'UX Strategy'],
      },
    ],
    skills: [
      'Product Management',
      'System Analysis',
      'Agile/Scrum',
      'Jira',
      'ClickUp',
      'Trello',
      'Notion',
      'Data Analytics',
      'User Experience (UX)',
    ],
  });
}
