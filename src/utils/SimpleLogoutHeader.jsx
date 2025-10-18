import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function SimpleLogoutHeader() {
  const { logout } = useAuth();

  return (
    <header
      style={{
        background: "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)",
        padding: "1.5rem 2rem",
        borderRadius: "16px",
        margin: "2rem auto",
        maxWidth: "900px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
      }}
    >
      <button
        onClick={logout}
        style={{
          background: "#fff",
          color: "#2563eb",
          border: "1px solid #2563eb",
          borderRadius: "6px",
          padding: "0.5rem 1.5rem",
          fontWeight: "bold",
          fontSize: "1rem",
          cursor: "pointer",
          boxShadow: "0 1px 4px rgba(37,99,235,0.08)",
          transition: "background 0.2s, color 0.2s",
        }}
        onMouseOver={e => {
          e.target.style.background = "#2563eb";
          e.target.style.color = "#fff";
        }}
        onMouseOut={e => {
          e.target.style.background = "#fff";
          e.target.style.color = "#2563eb";
        }}
      >
        Logout
      </button>
    </header>
  );
}
