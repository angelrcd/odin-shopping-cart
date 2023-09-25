import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { expect } from "vitest";
import { describe, it } from "vitest";

describe("App", () => {
  it("renders headline", () => {
    render(<App />);

    expect(screen.getByText(/Shop/i)).toBeInTheDocument();

    // check if App components renders headline
  });
});
