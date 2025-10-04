import React, { type ReactNode, useEffect } from 'react';
import {
  useLockBodyScroll,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarMobileSidebarLayout from '@theme/Navbar/MobileSidebar/Layout';
import NavbarMobileSidebarHeader from '@theme/Navbar/MobileSidebar/Header';
import NavbarMobileSidebarPrimaryMenu from '@theme/Navbar/MobileSidebar/PrimaryMenu';
import NavbarMobileSidebarSecondaryMenu from '@theme/Navbar/MobileSidebar/SecondaryMenu';

export default function NavbarMobileSidebar(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  useLockBodyScroll(mobileSidebar.shown);

  // Handle Android back button
  useEffect(() => {
    if (!mobileSidebar.shown) return;

    // Push a new history state when sidebar opens
    window.history.pushState({ mobileSidebar: true }, '');

    const handlePopState = (e: PopStateEvent) => {
      if (mobileSidebar.shown) {
        e.preventDefault();
        mobileSidebar.toggle();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      // Clean up history state if sidebar is still open
      if (window.history.state?.mobileSidebar) {
        window.history.back();
      }
    };
  }, [mobileSidebar.shown, mobileSidebar.toggle]);

  if (!mobileSidebar.shouldRender) {
    return null;
  }

  return (
    <NavbarMobileSidebarLayout
      header={<NavbarMobileSidebarHeader />}
      primaryMenu={<NavbarMobileSidebarPrimaryMenu />}
      secondaryMenu={<NavbarMobileSidebarSecondaryMenu />}
    />
  );
}
