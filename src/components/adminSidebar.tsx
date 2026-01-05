import {
  Balloon,
  Calendar,
  ChevronDown,
  Home,
  IndianRupee,
  MessageCircleQuestionMark,
  Users,
} from "lucide-react";
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
import { NavLink, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

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
    icon: Users,
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
    title: "Event Types",
    url: "/event-types",
    icon: Balloon,
  },
  {
    title: "Payments",
    url: "/payments",
    icon: IndianRupee,
  },
  {
    title: "Contact Us",
    url: "/contact-us",
    icon: MessageCircleQuestionMark,
  },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    <Collapsible className="group">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon />
                          <span className="flex-1">{item.title}</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="pl-8 pt-1 space-y-1">
                        {item.children.map((child) => (
                          <SidebarMenuButton
                            key={child.title}
                            asChild
                            size="sm"
                          >
                            <NavLink
                              className={
                                child.url === location.pathname
                                  ? "text-orange-600"
                                  : "text-base"
                              }
                              to={child.url}
                            >
                              <span>{child.title}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <NavLink
                        className={
                          item.url === location.pathname
                            ? "text-orange-600"
                            : "text-base"
                        }
                        to={item.url}
                      >
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
