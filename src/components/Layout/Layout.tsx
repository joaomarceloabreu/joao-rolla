'use client';

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { theme } from '@/lib/theme';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const MainContent = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 64px; /* Header height */
`;

const ContentWrapper = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainContent>
        <Header />
        <ContentWrapper>
          {children}
        </ContentWrapper>
        <Footer />
      </MainContent>
    </ThemeProvider>
  );
}