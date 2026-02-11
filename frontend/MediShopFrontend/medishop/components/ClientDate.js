// components/ClientDate.jsx
'use client';

import { useEffect, useState } from 'react';

export default function ClientDate({ dateString, format = 'date' }) {
  const [formatted, setFormatted] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const date = new Date(dateString);
      
      let formattedDate;
      if (format === 'date') {
        // Match the formatDate function exactly
        formattedDate = new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          timeZone: 'UTC',
        }).format(date);
      } else if (format === 'datetime') {
        formattedDate = new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: 'UTC',
        }).format(date);
      }
      
      setFormatted(formattedDate);
    }
  }, [dateString, format, isClient]);

  // Return empty during SSR to prevent hydration mismatch
  if (!isClient) {
    return <span className="inline-block w-16 h-4 bg-gray-200 animate-pulse rounded"></span>;
  }

  return <span>{formatted}</span>;
}