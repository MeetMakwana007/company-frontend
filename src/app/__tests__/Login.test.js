import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import LoginPage from "../components/Login/LoginPage";

jest.mock("axios");
jest.mock("antd", () => {
  const antd = jest.requireActual("antd");
  return {
    ...antd,
    message: {
      success: jest.fn(),
      error: jest.fn(),
    },
  };
});

const localStorageMock = (function () {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

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

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form", () => {
    render(<LoginPage onLogin={() => {}} />);

    expect(
      screen.getByPlaceholderText("Username (test@mail.com)")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password (1234)")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("submits form and calls onLogin on successful login", async () => {
    const mockOnLogin = jest.fn();
    axios.post.mockResolvedValueOnce({
      data: { token: "fake-token", username: "testuser" },
    });

    render(<LoginPage onLogin={mockOnLogin} />);

    fireEvent.change(screen.getByPlaceholderText("Username (test@mail.com)"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password (1234)"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
        { username: "testuser", password: "password123" }
      );
      expect(mockOnLogin).toHaveBeenCalled();
      expect(require("antd").message.success).toHaveBeenCalledWith(
        "Logged in successfully"
      );
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        "userDetails",
        JSON.stringify({ token: "fake-token", username: "testuser" })
      );
    });
  });

  test("displays error message on login failure", async () => {
    axios.post.mockRejectedValueOnce(new Error("Login failed"));

    render(<LoginPage onLogin={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText("Username (test@mail.com)"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password (1234)"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(require("antd").message.error).toHaveBeenCalledWith(
        "Invalid username or password"
      );
    });
  });
});
