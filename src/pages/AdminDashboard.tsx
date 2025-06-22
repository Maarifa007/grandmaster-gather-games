
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import AdminDashboard from '@/components/admin/AdminDashboard';

const AdminDashboardPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <main className="flex-1">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <SidebarTrigger />
            </div>
          </div>
          <AdminDashboard />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboardPage;
