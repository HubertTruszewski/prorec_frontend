import { fireEvent, render, screen } from "@testing-library/react";
import Login from "../../pages/login/";
import { expect } from "@jest/globals";
import { createMockRouter } from "../test-utils/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";

describe("Login", () => {
  it("login render of components", () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Login />
      </RouterContext.Provider>
    );
    const inputName = screen.getByLabelText("Username");
    const inputPass = screen.getByLabelText("Password");
    expect(inputName).toBeInTheDocument();
    expect(inputPass).toBeInTheDocument();
  });
});

describe("Login", () => {
  it("type username", () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Login />
      </RouterContext.Provider>
    );
    const inputName = screen.getByLabelText("Username");
    fireEvent.change(inputName, { target: { value: "user" } });
    expect(inputName.value).toBe("user");
  });
});

describe("Login", () => {
  it("type password", () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Login />
      </RouterContext.Provider>
    );
    const inputPass = screen.getByLabelText("Password");
    fireEvent.change(inputPass, { target: { value: "pass" } });
    expect(inputPass.value).toBe("pass");
  });
});
