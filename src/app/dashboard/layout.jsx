import DashNavbar from "@/components/Dashboard/DashNavbar";
import Sidebar from "@/components/Dashboard/Sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col bg-base-100 dark:bg-background">
      <DashNavbar />
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="w-full p-5">
          {children}
        </div>
      </div>
    </div>
  );
}
