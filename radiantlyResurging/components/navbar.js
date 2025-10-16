"use client";

import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import Container from "@/components/container";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Navbar(props) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = href => {
    return pathname === href;
  };

  const menu = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "About",
      href: "/about"
    },
    {
      label: "Contact",
      href: "/contact"
    },
    {
      label: "Coaching",
      href: "/coaching"
    },
    {
      label: "Store",
      href: "/store"
    }
  ];

  return (
    <div
      className={cx(
        "sticky top-0 z-50 bg-[#f5ebe0] transition-all duration-300 dark:bg-gray-900",
        isScrolled ? "py-1 shadow-lg" : "py-6"
      )}>
      <Container>
        <nav>
          {/* Navigation Menu - Responsive */}
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 md:space-x-4">
              {menu.map((item, index) => (
                <Fragment key={`${item.label}${index}`}>
                  {item.children && item.children.length > 0 ? (
                    <DropdownMenu
                      menu={item}
                      key={`${item.label}${index}`}
                      items={item.children}
                    />
                  ) : (
                    <Link
                      href={item.href}
                      key={`${item.label}${index}`}
                      className={cx(
                        "rounded-md font-medium transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg",
                        // Responsive padding and text sizes
                        isScrolled
                          ? "px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-3 md:py-2 md:text-sm"
                          : "px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-2 md:text-base",
                        isActive(item.href)
                          ? "border-b-2 border-[#a53860] text-[#a53860]"
                          : "text-[#01161e] hover:bg-white/50 hover:text-[#a53860]"
                      )}
                      target={item.external ? "_blank" : ""}
                      rel={item.external ? "noopener" : ""}>
                      {item.label}
                    </Link>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
}

const DropdownMenu = ({ menu, items }) => {
  return (
    <Menu as="div" className="relative text-left">
      {({ open }) => (
        <>
          <Menu.Button
            className={cx(
              "flex items-center justify-between gap-x-1 rounded-md px-2 py-1 text-sm font-medium text-[#01161e] outline-none transition-all hover:bg-white/50 hover:text-[#a53860] focus:outline-none sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-2 md:text-base",
              open && "text-[#a53860]"
            )}>
            <span>{menu.label}</span>
            <ChevronDownIcon
              className={cx(
                "h-3 w-3 transition-transform duration-200 sm:h-4 sm:w-4",
                open && "rotate-180"
              )}
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <Menu.Items className="absolute left-0 z-20 mt-2 w-48 origin-top-left rounded-md border border-gray-200 bg-white shadow-lg focus:outline-none dark:border-gray-700 dark:bg-gray-800 sm:w-56">
              <div className="py-1">
                {items.map((item, index) => (
                  <Menu.Item as="div" key={`${item.title}${index}`}>
                    {({ active }) => (
                      <Link
                        href={item?.path ? item.path : "#"}
                        className={cx(
                          "flex items-center px-4 py-2 text-sm transition-colors duration-150",
                          active
                            ? "bg-[#a53860]/10 text-[#a53860]"
                            : "text-gray-700 hover:bg-[#a53860]/10 hover:text-[#a53860] dark:text-gray-300 dark:hover:bg-gray-700"
                        )}>
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
