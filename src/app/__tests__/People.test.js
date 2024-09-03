import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import PeopleTab from "../components/People/People";

jest.mock("axios");
jest.mock("react-chartjs-2", () => ({
  Doughnut: () => null,
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const localStorageMock = (function () {
  let store = {};
  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("PeopleTab Component", () => {
  const mockPeopleData = {
    male: 10,
    female: 15,
    boy: 5,
    girl: 8,
  };

  beforeEach(() => {
    window.localStorage.setItem(
      "userDetails",
      JSON.stringify({ token: "mock-token" })
    );
  });

  test("renders PeopleTab component in non-editable mode", () => {
    render(<PeopleTab isEditable={false} peopleData={mockPeopleData} />);

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("People")).toBeInTheDocument();
  });

  test("submits form in editable mode and calls API", async () => {
    const mockSetActiveMenu = jest.fn();
    const mockSetPeopleData = jest.fn();
    axios.patch.mockResolvedValue({ data: {} });

    render(
      <PeopleTab
        isEditable={true}
        setActiveMenu={mockSetActiveMenu}
        peopleData={mockPeopleData}
        setPeopleData={mockSetPeopleData}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("male"), {
      target: { value: "20" },
    });
    fireEvent.change(screen.getByPlaceholderText("female"), {
      target: { value: "25" },
    });
    fireEvent.change(screen.getByPlaceholderText("boy"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByPlaceholderText("girl"), {
      target: { value: "12" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/people/modify`,
        { male: 20, female: 25, boy: 10, girl: 12 },
        {
          headers: {
            Authorization: "Bearer mock-token",
          },
        }
      );
      expect(mockSetActiveMenu).toHaveBeenCalledWith("2");
      expect(mockSetPeopleData).toHaveBeenCalledWith([]);
    });
  });
});
