// import { fireEvent, render, screen } from "@testing-library/react";
// import Create from "../../pages/challenges/create";
// import { expect } from "@jest/globals";
// import { createMockRouter } from "../test-utils/createMockRouter";
// import { RouterContext } from "next/dist/shared/lib/router-context";

// describe("Create", () => {
//   it("render inputs", () => {
//     render(
//       <RouterContext.Provider value={createMockRouter({})}>
//         <Create />
//       </RouterContext.Provider>
//     );
//     const inputName = screen.getByLabelText("Name");
//     expect(inputName).toBeInTheDocument();
//     const inputDescription = screen.getByLabelText("Description");
//     expect(inputDescription).toBeInTheDocument();
//     const inputCases = screen.getByLabelText("Example test cases");
//     expect(inputCases).toBeInTheDocument();
//   });
// });

// describe("Create", () => {
//   it("input name", () => {
//     render(
//       <RouterContext.Provider value={createMockRouter({})}>
//         <Create />
//       </RouterContext.Provider>
//     );
//     const inputName = screen.getByLabelText("Name");
//     fireEvent.change(inputName, { target: { value: "user" } });
//     expect(inputName.value).toBe("user");
//   });
// });

// describe("Create", () => {
//   it("input description", () => {
//     render(
//       <RouterContext.Provider value={createMockRouter({})}>
//         <Create />
//       </RouterContext.Provider>
//     );
//     const inputDescription = screen.getByLabelText("Description");
//     fireEvent.change(inputDescription, { target: { value: "desc" } });
//     expect(inputDescription.value).toBe("desc");
//   });
// });

// describe("Create", () => {
//   it("input name", () => {
//     render(
//       <RouterContext.Provider value={createMockRouter({})}>
//         <Create />
//       </RouterContext.Provider>
//     );
//     const inputCases = screen.getByLabelText("Example test cases");
//     fireEvent.change(inputCases, { target: { value: "case" } });
//     expect(inputCases.value).toBe("case");
//   });
// });
