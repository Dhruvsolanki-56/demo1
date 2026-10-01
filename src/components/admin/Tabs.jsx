import React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";

/**
 * Sticky horizontal tab bar built on Radix Tabs (keyboard nav, ARIA roles
 * handled automatically). `tabs` is [{ value, label, icon? }]; render each
 * panel yourself as a child <RadixTabs.Content value="...">.
 */
export function TabsRoot({ value, onValueChange, tabs, children }) {
  return (
    <RadixTabs.Root value={value} onValueChange={onValueChange}>
      <RadixTabs.List className="sticky top-0 z-10 flex gap-1 overflow-x-auto border-b border-slate-200 bg-white/90 backdrop-blur px-1 -mx-1 sm:mx-0 sm:px-0">
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab.value}
            value={tab.value}
            className="group relative flex shrink-0 items-center gap-2 px-4 py-3 text-sm font-medium text-slate-500 transition-colors hover:text-primary-700 data-[state=active]:text-primary-700 focus-visible:outline-none"
          >
            {tab.icon && <tab.icon size={15} />}
            {tab.label}
            <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-transparent group-data-[state=active]:bg-primary-600" />
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {children}
    </RadixTabs.Root>
  );
}

export const TabPanel = RadixTabs.Content;
