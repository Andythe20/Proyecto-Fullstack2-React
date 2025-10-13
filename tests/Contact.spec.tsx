import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Contact from "../src/pages/Contacto/Contacto";
import { describe, it, expect } from "vitest";

describe("Componente Contacto", () => {
    it("renderiza el título correctamente", () => {
        render(<Contact />);
        expect(screen.getByText("Formulario de Contacto")).toBeInTheDocument();
    })
});