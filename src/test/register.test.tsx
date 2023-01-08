import { fireEvent, render, screen } from "@testing-library/react";
import Register from "../../pages/register/";
import { expect } from "@jest/globals";
import { createMockRouter } from "../test-utils/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";

describe("Register", () => {
  it("Register render of components", () => {
    render(<Register />);
    const inputName = screen.getByLabelText("Username");
    const inputEmail = screen.getByLabelText("Email address");
    const inputPass = screen.getByLabelText("Password");
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPass).toBeInTheDocument();
  });
});

describe("Register", () => {
  it("type username", () => {
    render(<Register />);
    const inputName = screen.getByLabelText("Username");
    fireEvent.change(inputName, { target: { value: "user" } });
    expect(inputName.value).toBe("user");
  });
});
