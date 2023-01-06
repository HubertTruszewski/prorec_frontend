import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../../pages/index";

describe("Home", () => {
  it("renders home", () => {
    render(<Home />);
    expect(screen.getByTestId("list")).toBeInTheDocument();
  });
});
