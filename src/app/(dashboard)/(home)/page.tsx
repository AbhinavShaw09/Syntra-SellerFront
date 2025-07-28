"use client";

import {
  IconShoppingCart,
  IconBox,
  IconCategory,
  IconCurrencyDollar,
  IconDiscount2,
  IconCheck
} from "@tabler/icons-react";
import StatCard from "@/components/dashboard/stat-card";

export default function Page() {
  return (
    <div className="w-full max-w-screen-2xl mx-auto my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <StatCard
          title="Total Orders"
          value="2,345"
          delta="+5.4%"
          trending="up"
          icon={<IconShoppingCart size={16} />}
          footer="Orders increased this month"
          mutedText="Compared to last month"
        />
        <StatCard
          title="Total Products"
          value="178"
          delta="+2.1%"
          trending="up"
          icon={<IconBox size={16} />}
          footer="Inventory stable"
          mutedText="Last updated today"
        />
        <StatCard
          title="Categories"
          value="23"
          icon={<IconCategory size={16} />}
          mutedText="All categories loaded"
        />
        <StatCard
          title="Revenue"
          value="$12,500"
          delta="-3.2%"
          trending="down"
          icon={<IconCurrencyDollar size={16} />}
          footer="Revenue dropped"
          mutedText="Last 30 days"
        />
         <StatCard
          title="Coupons Created"
          value="60"
          delta="+15%"
          trending="up"
          icon={<IconDiscount2 size={16} />}
          footer="More coupons created"
          mutedText="Marketing campaign boost"
        />
        <StatCard
          title="Coupons Used"
          value="37"
          delta="+8.2%"
          trending="up"
          icon={<IconCheck size={16} />}
          footer="Redemption rate up"
          mutedText="Users engaging more"
        />
      </div>
    </div>
  );
}
