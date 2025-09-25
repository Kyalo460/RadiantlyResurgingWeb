"use client";

import { Fragment, useState, useEffect } from "react";
import { Menu, Transition, Disclosure } from "@headlessui/react";
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
          <Disclosure>
            {({ open }) => (
              <>
                <div className="w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-center">
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
                            "font-medium transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg",
                            isScrolled
                              ? "px-3 py-1 text-sm"
                              : "px-5 py-3 text-lg",
                            isActive(item.href)
                              ? "border-b-2 border-[#a53860] text-[#a53860]"
                              : "text-[#01161e] hover:text-[#a53860]"
                          )}
                          target={item.external ? "_blank" : ""}
                          rel={item.external ? "noopener" : ""}>
                          {item.label}
                        </Link>
                      )}
                    </Fragment>
                  ))}
                </div>

                <Disclosure.Panel>
                  <div className="order-2 -ml-4 mt-4 flex w-full flex-col items-center justify-start md:hidden">
                    {menu.map((item, index) => (
                      <Fragment key={`${item.label}${index}`}>
                        {item.children && item.children.length > 0 ? (
                          <DropdownMenu
                            menu={item}
                            key={`${item.label}${index}`}
                            items={item.children}
                            mobile={true}
                          />
                        ) : (
                          <Link
                            href={item.href}
                            key={`${item.label}${index}`}
                            className={cx(
                              "w-full px-5 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg",
                              isActive(item.href)
                                ? "border-l-4 border-blue-500 bg-blue-50 text-blue-500 dark:bg-blue-900/20"
                                : "text-[#c1121f] hover:text-blue-500 dark:text-gray-400"
                            )}
                            target={item.external ? "_blank" : ""}
                            rel={item.external ? "noopener" : ""}>
                            {item.label}
                          </Link>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </nav>
      </Container>
    </div>
  );
}

const DropdownMenu = ({ menu, items, mobile }) => {
  return (
    <Menu
      as="div"
      className={cx("relative text-left", mobile && "w-full")}>
      {({ open }) => (
        <>
          <Menu.Button
            className={cx(
              "flex items-center gap-x-1 rounded-md px-5 py-2 text-sm font-medium  outline-none transition-all focus:outline-none focus-visible:text-indigo-500 focus-visible:ring-1 dark:focus-visible:bg-gray-800",
              open
                ? "text-blue-500 hover:text-blue-500"
                : " text-gray-600 dark:text-gray-400 ",
              mobile ? "w-full px-4 py-2 " : "inline-block px-4 py-2"
            )}>
            <span>{menu.label}</span>
            <ChevronDownIcon className="mt-0.5 h-4 w-4" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="lg:transition lg:ease-out lg:duration-100"
            enterFrom="lg:transform lg:opacity-0 lg:scale-95"
            enterTo="lg:transform lg:opacity-100 lg:scale-100"
            leave="lg:transition lg:ease-in lg:duration-75"
            leaveFrom="lg:transform lg:opacity-100 lg:scale-100"
            leaveTo="lg:transform lg:opacity-0 lg:scale-95">
            <Menu.Items
              className={cx(
                "z-20 origin-top-left rounded-md  focus:outline-none  lg:absolute lg:left-0  lg:w-56",
                !mobile && "bg-white shadow-lg  dark:bg-gray-800"
              )}>
              <div className={cx(!mobile && "py-3")}>
                {items.map((item, index) => (
                  <Menu.Item as="div" key={`${item.title}${index}`}>
                    {({ active }) => (
                      <Link
                        href={item?.path ? item.path : "#"}
                        className={cx(
                          "flex items-center space-x-2 px-5 py-2 text-sm lg:space-x-4",
                          active
                            ? "text-blue-500"
                            : "text-gray-700 hover:text-blue-500 focus:text-blue-500 dark:text-gray-300"
                        )}>
                        <span> {item.title}</span>
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
