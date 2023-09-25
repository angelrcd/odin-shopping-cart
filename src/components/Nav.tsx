import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { CartIcon } from "./CartIcon";
import { Badge } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

interface Props {
  cartSize: number;
}

export default function Nav({ cartSize }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Home", "Shop", "Cart"];

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <h1>SHOP</h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-blue-600" : ""
            }>
            Home
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            to="shop"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-blue-600" : ""
            }>
            Shop
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <NavLink
            to="/cart"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-blue-600" : ""
            }>
            <Badge color="primary" content={cartSize} shape="circle">
              <CartIcon size={30} />
            </Badge>
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-600" : ""
              }
              to={item === "Home" ? "/" : item.toLowerCase()}>
              {item}
            </NavLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
