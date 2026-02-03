import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
