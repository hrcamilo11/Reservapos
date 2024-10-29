'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import ReserVapos from '@/components/ReserVapos';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ReserVapos />
    </ThemeProvider>
  );
}
