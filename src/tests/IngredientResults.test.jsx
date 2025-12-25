import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import IngredientResults from "../components/IngredientResults";
import "@testing-library/jest-dom";

const sampleResults = [
  {
    name: "Apple",
    aliases: ["Malus domestica"],
    category: "Fruit",
    type: "Natural",
    effect: "Nutritious",
  },
  {
    name: "Unknown ingredient",
    aliases: [],
    category: "",
    type: "",
    effect: "",
  },
];

test("renders results grid with items", () => {
  render(<IngredientResults results={sampleResults} />);
  expect(screen.getByText("Apple")).toBeInTheDocument();
  expect(screen.getByText("Also known as: Malus domestica")).toBeInTheDocument();
});

test("renders no-results message when empty", () => {
  render(<IngredientResults results={[]} />);
  expect(screen.getByText(/No matches found/i)).toBeInTheDocument();
});

test("copy button has aria-label with ingredient name", () => {
  render(<IngredientResults results={sampleResults} />);
  expect(screen.getByLabelText("Copy details for Apple")).toBeInTheDocument();
});

test("top action buttons render with aria-labels", () => {
  render(<IngredientResults results={sampleResults} />);
  expect(screen.getByLabelText(/Copy All Results/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Export TXT/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Export JSON/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Export PDF/i)).toBeInTheDocument();
});

test("aliases do not render for unknown ingredient", () => {
  render(<IngredientResults results={sampleResults} />);
  // Apple has aliases
  expect(screen.getByText(/Also known as: Malus domestica/i)).toBeInTheDocument();
  // Unknown ingredient should not have aliases
  expect(screen.queryByText(/Also known as:/i)).not.toHaveTextContent("Unknown ingredient");
});