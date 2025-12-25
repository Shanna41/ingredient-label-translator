import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import LogoUploader from "../components/LogoUploader";
import "@testing-library/jest-dom";

// Mock FileReader
class MockFileReader {
  readAsDataURL() {
    this.onloadend({ target: { result: "data:image/png;base64,mocked" } });
  }
}
globalThis.FileReader = MockFileReader;   // use globalThis

// Mock Image and canvas
class MockImage {
  set src(val) {
    // simulate successful load
    setTimeout(() => this.onload(), 0);
  }
}
globalThis.Image = MockImage;   // use globalThis

const mockCanvas = {
  getContext: () => ({ drawImage: vi.fn() }),
  toDataURL: () => "data:image/png;base64,converted",
};
vi.spyOn(document, "createElement").mockImplementation((tag) => {
  if (tag === "canvas") return mockCanvas;
  return document.createElement(tag);
});

test("renders file input with label", () => {
  render(<LogoUploader onLogoUpload={() => {}} />);
  expect(screen.getByLabelText("Upload Clinic Logo")).toBeInTheDocument();
});

test("shows error on invalid file type", () => {
  render(<LogoUploader onLogoUpload={() => {}} />);
  const badFile = new File(["data"], "bad.txt", { type: "text/plain" });
  fireEvent.change(screen.getByLabelText("Upload Clinic Logo"), {
    target: { files: [badFile] },
  });
  expect(screen.getByRole("alert")).toHaveTextContent(/Unsupported type/i);
});

test("calls onLogoUpload with valid file", async () => {
  const mockUpload = vi.fn();
  render(<LogoUploader onLogoUpload={mockUpload} />);
  const goodFile = new File(["data"], "logo.png", { type: "image/png" });
  fireEvent.change(screen.getByLabelText("Upload Clinic Logo"), {
    target: { files: [goodFile] },
  });
  // wait for async upload
  await screen.findByAltText("Logo preview");
  expect(mockUpload).toHaveBeenCalledWith("data:image/png;base64,converted");
});

test("remove button clears preview", async () => {
  const mockUpload = vi.fn();
  render(<LogoUploader onLogoUpload={mockUpload} />);
  const goodFile = new File(["data"], "logo.png", { type: "image/png" });
  fireEvent.change(screen.getByLabelText("Upload Clinic Logo"), {
    target: { files: [goodFile] },
  });
  await screen.findByAltText("Logo preview");
  fireEvent.click(screen.getByLabelText("Remove logo"));
  expect(screen.queryByAltText("Logo preview")).not.toBeInTheDocument();
  expect(mockUpload).toHaveBeenCalledWith(null);
});