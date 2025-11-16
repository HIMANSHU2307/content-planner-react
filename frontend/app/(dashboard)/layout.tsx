/**
 * Dashboard Layout
 * 
 * Layout wrapper for all dashboard pages.
 * Can be extended with navigation, sidebar, etc.
 */

import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

