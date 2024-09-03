import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Home from "../components/Home/HomePage";

jest.mock("axios");

describe("Home Component", () => {
  test("renders menu items", async () => {
    render(<Home />);

    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("People")).toBeInTheDocument();
    expect(screen.getByText("Violations")).toBeInTheDocument();
    expect(screen.getByText("Statistics")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("fetches and displays people data when People menu item is clicked", async () => {
    const mockPeopleData = { data: { data: { male: 10, female: 5 } } };
    axios.get.mockResolvedValue(mockPeopleData);

    render(<Home />);

    fireEvent.click(screen.getByText("People"));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining("/people/details"),
        expect.any(Object)
      );
    });

    await waitFor(() => {
      expect(screen.getByText("10")).toBeInTheDocument();
    });
  });
});
