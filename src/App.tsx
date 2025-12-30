import { Outlet } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { AdminSidebar } from "./components/adminSidebar";

const App = () => {
  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AdminSidebar />

          <SidebarInset className="flex flex-1 flex-col">
            {/* <Header /> */}
            <div className="px-4 pt-2 md:hidden">
              <SidebarTrigger />
            </div>
            <main className="flex-1 pl-2">
              <Outlet />
            </main>
            {/* <Footer /> */}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
};

export default App;
