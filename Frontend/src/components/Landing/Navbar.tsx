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
import { Menu, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        href: "/ai-symptom-checker",
        label: "AI Symptom Checker",
        description: "Get an AI-powered analysis of your symptoms 24/7.",
      },
      {
        href: "/find-a-doctor",
        label: "Find a Doctor",
        description: "Search our directory of top-rated specialists.",
      },
      {
        href: "/book-appointment",
        label: "Book Appointment",
        description: "Schedule your next visit online with ease.",
      },
    ],
  },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const { pathname } = useLocation();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/30 shadow-sm backdrop-blur-xl",
        "bg-gradient-to-r from-sky-100 via-white to-blue-50",
        "dark:from-slate-900 dark:via-slate-950 dark:to-blue-950"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-6 md:px-12">
        {/* === Logo === */}
        <Link to="/" className="flex items-center gap-2 group">
          <Stethoscope className="h-6 w-6 text-primary transition-transform group-hover:scale-110 group-hover:rotate-6" />
          <span className="text-lg font-extrabold bg-gradient-to-r from-red-500 via-blue-600 to-red-500 bg-clip-text text-transparent">
            SmartHealth
          </span>
        </Link>

        {/* === Desktop Navigation === */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
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

        {/* === Desktop CTAs === */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="outline"
            asChild
            className="rounded-xl border-blue-300 hover:bg-blue-100/30 text-blue-700 dark:border-blue-700 dark:hover:bg-blue-900/30"
          >
            <Link to="/select-role">Login</Link>
          </Button>
          <Button
            asChild
            className="rounded-xl bg-gradient-to-r from-blue-600 to-red-500 hover:from-red-500 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all"
          >
            <Link to="/select-role">Sign Up</Link>
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
                  <span className="text-lg font-bold bg-gradient-to-r from-red-500 via-blue-600 to-red-500 bg-clip-text text-transparent">
                    SmartHealth
                  </span>
                </div>

                {/* Mobile Nav Links */}
                <nav className="flex flex-col">
                  {navItems.map((item) =>
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

                {/* Mobile CTAs */}
                <div className="mt-6 flex flex-col gap-3 border-t pt-6">
                  <SheetClose asChild>
                    <Button variant="outline" asChild>
                      <Link to="/select-role">Login</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-blue-600 to-red-500 text-white hover:from-red-500 hover:to-blue-600"
                    >
                      <Link to="/select-role">Sign Up</Link>
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
          <div className="text-sm font-semibold leading-none bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
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
