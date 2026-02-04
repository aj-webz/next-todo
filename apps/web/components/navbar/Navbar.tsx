"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@workspace/ui/components/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";

function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className={`text-sm font-medium transition ${
          active
            ? "text-blue-600 font-semibold"
            : "text-neutral-700 hover:text-blue-600"
        }`}
      >
        {label}
      </Link>
    </NavigationMenuLink>
  );
}

export default function Navbar() {
  return (
    <header className="h-16 w-full border-b bg-white px-9 flex items-center justify-between">
      <span className="text-lg font-semibold tracking-tight text-neutral-900">
        WORK <span className="text-blue-600">TRACKER</span>
      </span>

      <div className="flex items-center gap-10">
        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <NavLink href="/dashboard" label="Dashboard" />
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink
                href="/manage"
                label="Manage"
              />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full hover:bg-neutral-100 p-1 transition">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar.png" alt="Ajay" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2 text-destructive">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
