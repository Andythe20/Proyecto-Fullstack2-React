import React from "react";
import { render, screen } from "@testing-library/react";
import Nosotros from "../src/pages/Sobre-nosotros/Nosotros"
import { describe, expect, it} from "vitest";

describe("Componente Sobre-Nosotros", () => {
    it("Renderiza titulo correctamente", () => {
        render(<Nosotros/>);
        expect(screen.getByText("Sobre Nosotros: Pastelería OnlyFlans")).toBeInTheDocument();
    })

    it("Contiene parrafo del la pagina", () => {
        render(<Nosotros/>)
        expect(screen.getByText(/En Pastelería OnlyFlans/i)).toBeInTheDocument();
    })

    it("Renderiza los enlaces (botones) de comunidad con hrefs y target correctos", () => {
    render(<Nosotros />);
    const descubrir = screen.getByRole("link", { name: /Descubrir/i }) as HTMLAnchorElement;
    const recetas = screen.getByRole("link", { name: /Ver recetas/i }) as HTMLAnchorElement;
    const noticias = screen.getByRole("link", { name: /Ver noticias/i }) as HTMLAnchorElement;

    expect(descubrir).toBeInTheDocument();
    expect(descubrir).toHaveAttribute("href", "https://dulcemisu.com/blog");
    expect(descubrir).toHaveAttribute("target", "_blank");

    expect(recetas).toBeInTheDocument();
    expect(recetas).toHaveAttribute("href", "https://www.duoc.cl/sedes/valparaiso/recetario");
    expect(recetas).toHaveAttribute("target", "_blank");

    expect(noticias).toBeInTheDocument();
    expect(noticias).toHaveAttribute("href", "https://www.duoc.cl/vida-estudiantil");
    expect(noticias).toHaveAttribute("target", "_blank");
  });

})