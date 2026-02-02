import {
  Balloon,
  Calendar,
  ChevronDown,
  CupSoda,
  DollarSign,
  Gem,
  Home,
  Image,
  MessageCircleQuestionMark,
  Star,
  UserRoundPen,
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
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { TiIconLogout } from "./icons";
import { toast } from "sonner";
import { tokenStorage } from "../helper/refreshToken";
import { useState } from "react";
import { Separator } from "./ui/separator";

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
  // {
  //   title: "Profile",
  //   url: "/profile",
  //   icon: UserRoundPen,
  // },
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
      { title: "Vendor Rejected", url: "/vendor-rejected" },
    ],
    icon: Calendar,
  },
  {
    title: "Event Types",
    url: "/event-types",
    icon: Balloon,
  },
  {
    title: "Product Types",
    url: "/product-types",
    icon: CupSoda,
  },
  {
    title: "Reviews",
    url: "/reviews",
    icon: Star,
  },
  {
    title: "Featured",
    children: [
      { title: "Banner", url: "/featured_banner" },
      { title: "Category", url: "/featured_category" },
      { title: "Products", url: "/featured_product" },
    ],
    icon: Image,
  },
  {
    title: "Pricing Settings",
    url: "/pricing_settings",
    icon: Gem,
  },
  {
    title: "Payments",
    url: "/payments",
    icon: DollarSign,
  },
  {
    title: "Contact Us",
    url: "/contact-us",
    icon: MessageCircleQuestionMark,
  },
];

const item = [
  {
    title: "Profile",
    url: "/profile",
    icon: UserRoundPen,
  },
];

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [openItem, setOpenItem] = useState<string | null>(null);

  const logoutHandler = () => {
    tokenStorage.clear();
    toast.success("Logout successfully...");
    navigate("/login");
  };

  return (
    <Sidebar className="border-r border-gray-200 ">
      <SidebarContent className="bg-gray-50 ">
        <SidebarGroup className="h-full">
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    <Collapsible
                      open={openItem === item.title}
                      onOpenChange={(isOpen) =>
                        setOpenItem(isOpen ? item.title : null)
                      }
                      className="group"
                    >
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
          <Separator className=" my-1.5 mt-auto" />
          <div className="">
            <SidebarMenu>
              {item.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`  ${
                      item.url === location.pathname && "text-orange-600"
                    }`}
                    asChild
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <Button
                onClick={logoutHandler}
                className="w-full mb-1"
                variant={"destructive"}
              >
                <TiIconLogout /> Logout
              </Button>
            </SidebarMenu>
          </div>
        </SidebarGroup>
      </SidebarContent>
      {/* <div className="w-full px-2">
        <Button
          onClick={logoutHandler}
          className="w-full mb-1"
          variant={"destructive"}
        >
          <TiIconLogout /> Logout
        </Button>
      </div> */}
    </Sidebar>
  );
}
