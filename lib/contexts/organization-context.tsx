'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useOrganizationStore } from '@/lib/stores/organization-store';

interface OrganizationContextType {
  organizationId: string | null;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};

interface OrganizationProviderProps {
  children: React.ReactNode;
}

export const OrganizationProvider: React.FC<OrganizationProviderProps> = ({ children }) => {
  const { user } = useAuthStore();
  const { organizationId, setOrganizationId } = useOrganizationStore();

  useEffect(() => {
    if (user?.organizationId && user.organizationId !== (organizationId ? parseInt(organizationId) : null)) {
      const orgId = user.organizationId.toString();
      setOrganizationId(orgId);
      localStorage.setItem('organizationId', orgId);
    }
  }, [user, organizationId, setOrganizationId]);

  const value = {
    organizationId,
  };

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
};