import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Menu,
  UserCircle2,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";

const patientNavItems = [
  { href: "/patient/home", label: "Dashboard" },
  {
    label: "My Health",
    href: "/patient/health",
    children: [
      {
        href: "/patient/records",
        label: "Medical Records",
        description: "View and manage your medical history and prescriptions.",
      },
      {
        href: "/patient/reports",
        label: "Reports & Tests",
        description: "Access your lab test reports and upload new ones.",
      },
      {
        href: "/patient/appointments",
        label: "Appointments",
        description: "Track and manage your upcoming doctor appointments.",
      },
    ],
  },
  {
    label: "AI Tools",
    href: "/patient/ai-tools",
    children: [
      {
        href: "/patient/symptom-checker",
        label: "AI Symptom Checker",
        description: "Get AI-based insights for your health symptoms.",
      },
      {
        href: "/patient/chat-doctor",
        label: "Chat with Doctor",
        description: "Consult your doctor online securely and instantly.",
      },
    ],
  },
  { href: "/patient/contact", label: "Support" },
  { href: "/find-a-doctor", label: "Doctors" },
];

export function PatientNavbar() {
  const { pathname } = useLocation();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/30 shadow-sm backdrop-blur-xl",
        "bg-gradient-to-r from-blue-100 via-white to-sky-50",
        "dark:from-slate-900 dark:via-slate-950 dark:to-blue-950"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-6 md:px-12">
        {/* === Logo === */}
        <Link to="/patient/home" className="flex items-center gap-2 group">
          <Stethoscope className="h-6 w-6 text-primary transition-transform group-hover:scale-110 group-hover:rotate-6" />
          <span className="text-lg font-extrabold bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 bg-clip-text text-transparent">
            SmartHealth | Patient
          </span>
        </Link>

        {/* === Desktop Navigation === */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {patientNavItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                {item.children ? (
                  <>
                    <NavigationMenuTrigger
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-blue-600",
                        pathname.startsWith(item.href)
                          ? "text-blue-600"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {item.children.map((child) => (
                          <ListItem
                            key={child.label}
                            to={child.href}
                            title={child.label}
                          >
                            {child.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link to={item.href}>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-sm font-medium transition-colors hover:text-blue-600 hover:underline underline-offset-4",
                        pathname === item.href
                          ? "text-blue-600"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* === Desktop User Section === */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="outline"
            asChild
            className="rounded-xl border-blue-300 hover:bg-blue-100/30 text-blue-700 dark:border-blue-700 dark:hover:bg-blue-900/30"
          >
            <Link to="/patient/profile">
              <UserCircle2 className="mr-2 h-4 w-4" />
              My Profile
            </Link>
          </Button>
          <Button
            asChild
            className="rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-sky-500 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all"
          >
            <Link to="/logout">Logout</Link>
          </Button>
        </div>

        {/* === Mobile Menu === */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-gradient-to-br from-sky-50 via-white to-blue-50 dark:from-slate-900 dark:to-blue-950 backdrop-blur-lg border-l"
            >
              <div className="flex flex-col">
                {/* Mobile Logo */}
                <div className="mb-6 flex items-center gap-2">
                  <Stethoscope className="h-6 w-6 text-blue-600" />
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                    SmartHealth | Patient
                  </span>
                </div>

                {/* Mobile Nav Links */}
                <nav className="flex flex-col">
                  {patientNavItems.map((item) =>
                    item.children ? (
                      <Accordion
                        key={item.label}
                        type="single"
                        collapsible
                        className="w-full"
                      >
                        <AccordionItem
                          value={item.label}
                          className="border-b-0"
                        >
                          <AccordionTrigger className="py-3 text-base font-medium text-foreground hover:text-blue-600 hover:no-underline">
                            {item.label}
                          </AccordionTrigger>
                          <AccordionContent className="pb-1 pl-4">
                            <nav className="flex flex-col gap-3">
                              {item.children.map((child) => (
                                <SheetClose asChild key={child.label}>
                                  <Link
                                    to={child.href}
                                    className="text-muted-foreground transition-colors hover:text-blue-600"
                                  >
                                    {child.label}
                                  </Link>
                                </SheetClose>
                              ))}
                            </nav>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <SheetClose asChild key={item.label}>
                        <Link
                          to={item.href}
                          className="py-3 text-base font-medium text-foreground transition-colors hover:text-blue-600"
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    )
                  )}
                </nav>

                {/* Mobile Buttons */}
                <div className="mt-6 flex flex-col gap-3 border-t pt-6">
                  <SheetClose asChild>
                    <Button variant="outline" asChild>
                      <Link to="/patient/profile">My Profile</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-blue-600 to-sky-500 text-white hover:from-sky-500 hover:to-blue-600"
                    >
                      <Link to="/logout">Logout</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & { to: string; title: string }
>(({ className, title, children, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={to}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-700 dark:hover:bg-blue-900/30",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
