import { render, screen } from "@testing-library/react";
import Home from "../../pages/index";
import { expect } from "@jest/globals";

describe("Home", () => {
  it("renders home", () => {
    render(<Home />);
    expect(screen.getByTestId("list")).toBeInTheDocument();
    expect(screen.getByText("applicant page")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();
  });
});
