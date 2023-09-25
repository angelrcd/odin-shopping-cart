import { render, screen } from "@testing-library/react";
import Nav from "../src/components/Nav";
import { expect } from "vitest";
import { describe, it } from "vitest";

describe("App", () => {
  it("renders headline", () => {
    render(<Nav />);

    expect(screen.getByText(/Shop/i)).toBeInTheDocument();

    // check if App components renders headline
  });
});
