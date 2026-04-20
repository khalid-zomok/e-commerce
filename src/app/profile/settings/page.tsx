"use client";
import ChangePasswordCard from "@/app/_components/ChangePasswordCard/ChangePasswordCard";
import ProfileInformationCard from "@/app/_components/ProfileInformationCard/ProfileInformationCard";
import ProfileSidebar from "@/app/_components/ProfileSidebar/ProfileSidebar";


export default function SettingsPage() {
   

  return (
    <div className="mx-auto w-full p-6 bg-slate-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <ProfileSidebar />

        <main className="md:col-span-9">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              Account Settings
            </h1>
            <p className="text-slate-500">
              Update your profile information and change your password
            </p>
          </header>

          <section className="space-y-6">
            {/* Profile Information Card */}
            <ProfileInformationCard />

            {/* Change Password Card */}
            <ChangePasswordCard />
           
          </section>
        </main>
      </div>
    </div>
  );
}
