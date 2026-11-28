'use client';

import React from 'react';
import type { Role } from '@/types/auth.types';
import { useSession } from '@/lib/auth-client';

interface RoleGuardProps {
  allowedRoles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Declarative component for conditional rendering based on user role.
 * Hides children if the authenticated user's role is not in `allowedRoles`.
 */
export function RoleGuard({ allowedRoles, children, fallback = null }: RoleGuardProps) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return null;
  }

  const userRole = (session?.user as { role?: Role } | undefined)?.role;

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
