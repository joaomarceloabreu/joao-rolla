'use client';

import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  useMediaQuery,
  useTheme,
  Box
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import styled from 'styled-components';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const StyledAppBar = styled(AppBar)`
  background: rgba(10, 10, 10, 0.95) !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #333;
  transition: all 0.3s ease;
  
  &.scrolled {
    background: rgba(10, 10, 10, 0.98) !important;
    box-shadow: 0 8px 32px rgba(229, 87, 34, 0.15) !important;
  }
`;

const Logo = styled(Typography)`
  background: linear-gradient(135deg, #E55722 0%, #F4A842 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900 !important;
  font-size: 1.8rem !important;
  letter-spacing: -0.02em;
  cursor: pointer;
`;

const NavButton = styled(Button)`
  color: #fff !important;
  font-weight: 500 !important;
  text-transform: none !important;
  font-size: 1rem !important;
  padding: 8px 16px !important;
  border-radius: 8px !important;
  transition: all 0.3s ease !important;
  
  &:hover {
    background: rgba(229, 87, 34, 0.1) !important;
    color: #E55722 !important;
  }
`;

const MobileDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    background: #000000;
    width: 280px;
    padding: 20px;
    border-right: 1px solid #333;
  }
`;

const navItems = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/about' },
  { label: 'Música', href: '/music' },
  { label: 'Galeria', href: '/gallery' },
  { label: 'Loja', href: '/shop' },
  { label: 'Contato', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const isScrolled = window.scrollY > 50;
        setScrolled(isScrolled);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Logo variant="h6">João Rolla</Logo>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <Link href={item.href} style={{ width: '100%', textDecoration: 'none' }}>
              <ListItemText 
                primary={item.label} 
                sx={{ 
                  textAlign: 'center',
                  color: 'white',
                  py: 1,
                  '&:hover': {
                    color: '#E55722'
                  }
                }} 
              />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="fixed" className={scrolled ? 'scrolled' : ''}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Logo variant="h6">João Rolla</Logo>
            </motion.div>
          </Link>

          {mounted && isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : mounted ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <NavButton>{item.label}</NavButton>
                  </motion.div>
                </Link>
              ))}
            </Box>
          ) : (
            <Box sx={{ width: 40, height: 40 }} />
          )}
        </Toolbar>
      </StyledAppBar>

      <MobileDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </MobileDrawer>
    </>
  );
}