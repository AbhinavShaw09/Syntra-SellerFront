"use client";

import * as React from "react";
import { FileText, Store, Settings, Boxes, Percent } from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  teams: [
    {
      name: "My Store",
      logo: Store,
    },
  ],
  navMain: [
    {
      title: "Catalogue",
      url: "#",
      icon: Boxes,
      isActive: true,
      items: [
        {
          title: "Products",
          url: "/catalogue/products",
        },
        {
          title: "Categories",
          url: "/catalogue/categories",
        },
      ],
    },
    {
      title: "Sales",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Orders",
          url: "/sales/orders",
        },
        {
          title: "Abandoned Orders",
          url: "/sales/abandoned-orders",
        },
      ],
    },
    {
      title: "Discounts",
      url: "#",
      icon: Percent,
      items: [
        {
          title: "Coupons",
          url: "/discounts/coupons",
        },
        {
          title: "Campains",
          url: "/discounts/campaigns",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "General",
          url: "/settings/general",
        },
        {
          title: "Billing",
          url: "/settings/billing",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
