import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import IngredientInput from "../components/IngredientInput";
import "@testing-library/jest-dom";

test("renders textarea and buttons", () => {
  render(<IngredientInput onTranslate={() => {}} />);
  expect(screen.getByLabelText("Ingredient label input")).toBeInTheDocument();
  expect(screen.getByLabelText("Translate ingredient label")).toBeInTheDocument();
  expect(screen.getByLabelText("Clear ingredient input")).toBeInTheDocument();
});

test("calls onTranslate with input value", () => {
  const mockTranslate = vi.fn();
  render(<IngredientInput onTranslate={mockTranslate} />);
  fireEvent.change(screen.getByLabelText("Ingredient label input"), { target: { value: "apple" } });
  fireEvent.click(screen.getByLabelText("Translate ingredient label"));
  expect(mockTranslate).toHaveBeenCalledWith("apple");
});

test("clears input when Clear button is clicked", () => {
  render(<IngredientInput onTranslate={() => {}} />);
  const textarea = screen.getByLabelText("Ingredient label input");
  fireEvent.change(textarea, { target: { value: "apple" } });
  fireEvent.click(screen.getByLabelText("Clear ingredient input"));
  expect(textarea.value).toBe("");
});

test("shows success message after submit", () => {
  render(<IngredientInput onTranslate={() => {}} />);
  const textarea = screen.getByLabelText("Ingredient label input");
  fireEvent.change(textarea, { target: { value: "apple" } });
  fireEvent.click(screen.getByLabelText("Translate ingredient label"));
  expect(screen.getByRole("status")).toHaveTextContent("Sent!");
});