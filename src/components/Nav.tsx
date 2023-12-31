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
import { Link, NavLink } from "react-router-dom";

interface Props {
  cartSize: number;
}

export default function Nav({ cartSize }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      className="text-gray-800"
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarBrand>
          <Link to="/">
            <h1 className="text-lg font-semibold uppercase">
              One Stop Wonders
            </h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden xs:flex">
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-blue-600" : ""
            }>
            Home
          </NavLink>
        </NavbarItem>
        <NavbarItem className="hidden xs:flex">
          <NavLink
            to="shop"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-blue-600" : ""
            }>
            Shop
          </NavLink>
        </NavbarItem>
        <NavbarItem className="hidden xs:flex">
          <NavLink
            aria-label="Cart"
            to="/cart"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-blue-600" : ""
            }>
            <Badge
              data-testid="Items in cart"
              color="primary"
              content={cartSize}
              shape="circle">
              <CartIcon size={30} />
            </Badge>
          </NavLink>
        </NavbarItem>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="xs:hidden"
        />
      </NavbarContent>
      <NavbarMenu>
        <NavLink
          onClick={() => setIsMenuOpen(false)}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-blue-600" : ""
          }
          to="/">
          <NavbarMenuItem className="">Home</NavbarMenuItem>
        </NavLink>
        <NavLink
          onClick={() => setIsMenuOpen(false)}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-blue-600" : ""
          }
          to="/shop">
          <NavbarMenuItem>Shop</NavbarMenuItem>
        </NavLink>
        <NavLink
          onClick={() => setIsMenuOpen(false)}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-blue-600" : ""
          }
          to="/cart">
          <NavbarMenuItem>
            <Badge
              color="primary"
              content={cartSize}
              shape="circle"
              className="left-7">
              Cart
            </Badge>
          </NavbarMenuItem>
        </NavLink>
      </NavbarMenu>
    </Navbar>
  );
}
