"use client";

import { registerUser } from "@/apis/auth";
import { FormEvent, useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Here, you would typically send `formData` to your backend
    try {
      // Call the auth.registerUser function and pass formData
      await registerUser(formData.username, formData.email, formData.password);

      // If successful, reset the form data
      setFormData({
        username: "",
        email: "",
        password: "",
      });

      // Optionally, you could redirect or display a success message
      console.log("Registration successful");
    } catch (error) {
      console.error("Registration failed:", error);
      // Optionally, handle the error (e.g., display an error message)
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-3 rounded-md hover:bg-indigo-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
