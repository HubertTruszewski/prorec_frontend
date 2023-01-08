import { render, screen } from "@testing-library/react";
import { NewAssessmentBasicInfoForm } from "../../components/assessments/NewAssessmentBasicInfoForm";
import { expect } from "@jest/globals";
import { createMockRouter } from "../test-utils/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { ChangeEvent } from "react";

describe("Create Assesment", () => {
  it("render inputs", () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <NewAssessmentBasicInfoForm
          handleInputChange={function (
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ): void {
            throw new Error("Function not implemented.");
          }}
          setExpiryDate={function (expiryDate: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </RouterContext.Provider>
    );
    const inputEmail = screen.getByText("Applicant's email address");
    expect(inputEmail).toBeInTheDocument();
    const inputTime = screen.getByText("Solving time (in minutes)");
    expect(inputTime).toBeInTheDocument();
  });
});
