import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { NavLink } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { TiIconCaretDown } from "./icons";

type SidebarItem =
  | {
      title: string;
      url: string | any;
      icon: any;
      children?: never;
    }
  | {
      title: string;
      icon: any;
      children: { title: string; url: string }[];
      url?: never;
    };

const items: SidebarItem[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Users",
    url: "/users",
    icon: Inbox,
  },
  {
    title: "Vendors",
    children: [
      { title: "Vendors", url: "/vendors" },
      { title: "Vendor Requests", url: "/vendor-requests" },
    ],
    icon: Calendar,
  },
  {
    title: "Payments",
    url: "/payments",
    icon: Search,
  },
  {
    title: "Contact Us",
    url: "/contact-us",
    icon: Settings,
  },
  {
    title: "Event Types",
    url: "/event-types",
    icon: Settings,
  },
];

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.title == "Vendors" ? (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuButton>
                            <Calendar />
                            <div className="w-full flex items-center justify-between">
                              <div>Vendors</div>
                              <div>
                                <TiIconCaretDown />
                              </div>
                            </div>
                          </SidebarMenuButton>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="min-w-[15rem]">
                          {item?.children?.map((item, index) => {
                            return (
                              <>
                                <SidebarMenuButton key={index} asChild>
                                  <NavLink to={item.url}>
                                    <DropdownMenuItem>
                                      {item.title}
                                    </DropdownMenuItem>
                                  </NavLink>
                                </SidebarMenuButton>
                                <DropdownMenuSeparator />
                              </>
                            );
                          })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      {/* <SidebarMenuButton asChild>
                        <NavLink to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton> */}
                    </>
                  ) : (
                    <SidebarMenuButton asChild>
                      <NavLink to={item?.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
