import React, { useState, useEffect } from "react";
import useProductos from "../../hooks/useProductos";
import type { Product } from "../../types/product";
import Swal from "sweetalert2";


const AdminProductos: React.FC = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [editando, setEditando] = useState<boolean>(false);
  const [form, setForm] = useState<Product>({
    codigo: "",
    categoria: "",
    nombre: "",
    descripcion: "",
    precio: 0,
    url: "",
  });

  // Almacenar imagen arrastrada
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  // hook que trae productos desde la API
  const { productos: backendProductos, isLoading, error } = useProductos();

  // sincronizar los productos del backend al estado local
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        setProductos([]);
      } else {
        // castear asumiendo misma estructura; ajusta si es necesario
        setProductos(backendProductos as unknown as Product[]);
      }
    }
  }, [backendProductos, isLoading, error]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: name === "precio" ? Number(value) : value });
  };

  const limpiarFormulario = () => {
    setForm({
      codigo: "",
      categoria: "",
      nombre: "",
      descripcion: "",
      precio: 0,
      url: "",
    });
    setEditando(false);
    setSelectedFile(null);
  };

const guardarProducto = async () => {
  const authTokensLocal = localStorage.getItem("authTokens");

  if (!authTokensLocal) {
    alert("No hay tokens. Por favor, inicia sesión.");
    return;
  }

  // parsear el JSON y extraer accessToken
  const authTokens = JSON.parse(authTokensLocal);
  const token = authTokens.accessToken;

    if (!token) {
      alert("No hay token. Por favor, inicia sesión.");
      return;
    }
    
    // Si encuentra un código igual, no agregar
    if (!editando && productos.find((p) => p.codigo === form.codigo)) {
      alert("El código ya existe");
      return;
    }

    if (editando) {
      // PUT
      const res = await fetch("/api/v1/products/" + form.codigo, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          categoria: form.categoria,
          nombre: form.nombre,
          descripcion: form.descripcion,
          precio: form.precio,
          url: form.url
        }),
      });

      const updated: Product = await res.json();

      setProductos((prev) =>
        prev.map((x) => (x.codigo === updated.codigo ? updated : x))
      );

    } else {
        // POST
        const fd = new FormData();
        if (selectedFile) fd.append("file", selectedFile);
        fd.append("codigo", form.codigo);
        fd.append("categoria", form.categoria);
        fd.append("nombre", form.nombre);
        fd.append("descripcion", form.descripcion);
        fd.append("precio", String(form.precio));

        const res = await fetch("/api/v1/products", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        });

    const newProduct = await res.json();
    setProductos((prev) => [...prev, newProduct]);
  }

    limpiarFormulario();
    
};

const editarProducto = (p: Product) => {
  setForm(p);
  setEditando(true);
};


  const eliminarProducto = async (codigo: string) => {
      const confirmar = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    const authTokensLocal = localStorage.getItem("authTokens");

    if (!authTokensLocal) {
      alert("No hay tokens. Por favor, inicia sesión.");
      return;
    }

    if (!confirmar.isConfirmed) return;

    if (!authTokensLocal) {
      await Swal.fire({ icon: "error", title: "No autenticado", text: "Inicia sesión primero." });
      return;
    }

    // parsear el JSON y extraer accessToken
    const authTokens = JSON.parse(authTokensLocal);
    const token = authTokens.accessToken;

    try {
      await fetch("/api/v1/products/" + codigo, {
        method: "DELETE",
        // Enviar token en el header Authorization para autenticación
        headers:{
          Authorization: `Bearer ${token}`,
        },
      });

      setProductos(productos.filter((p) => p.codigo !== codigo));
      await Swal.fire({ icon: "success", title: "Eliminado", text: "Producto eliminado correctamente." });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      alert("Error eliminando el producto: " + msg);
    }

  };

  return (
    <>
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>Panel Admin - Productos</h1>

        {/* FORMULARIO */}
        <div
          style={{
            background: "#f2f2f2",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "30px",
            maxWidth: "500px",
          }}
        >
          <h2>{editando ? "Editar Producto" : "Agregar Producto"}</h2>

          <input
            type="text"
            name="codigo"
            placeholder="Código"
            value={form.codigo}
            onChange={handleChange}
            disabled={editando}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />

          <input
            type="text"
            name="categoria"
            placeholder="Categoría"
            value={form.categoria}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />

          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "8px",
              minHeight: "80px",
            }}
          />

          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={form.precio}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />

          {/* CAMPO DRAG & DROP */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];

              if (file) {
                // Guardar archivo seleccionado
                setSelectedFile(file);

                setForm({...form, url: ""})
              }
            }}
            style={{
              border: "2px dashed #999",
              padding: "20px",
              textAlign: "center",
              borderRadius: "8px",
              marginBottom: "15px",
              background: "#fafafa",
              cursor: "pointer",
            }}
          >
            Arrastra la imagen aquí
          </div>


          {/* Previsualización */}
          {selectedFile && (
            <div style={{ textAlign: "center", marginBottom: "15px" }}>
              <p><strong>Archivo seleccionado:</strong> {selectedFile.name}</p>
            </div>
          )}
          {form.url && (
            <div style={{ textAlign: "center", marginBottom: "15px" }}>
              <img
                src={form.url}
                width="120"
                style={{ borderRadius: "8px", boxShadow: "0 0 5px #ccc" }}
              />
            </div>
          )}

          <button
            onClick={guardarProducto}
            style={{
              background: "#28a745",
              color: "white",
              padding: "10px 15px",
              border: "none",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            {editando ? "Actualizar" : "Guardar"}
          </button>

          {editando && (
            <button
              onClick={limpiarFormulario}
              style={{
                background: "#6c757d",
                color: "white",
                padding: "10px 15px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
          )}
        </div>


        {/* TABLA */}
        <h2>Lista de Productos</h2>

       {isLoading ? (
         <p>Cargando productos desde el backend...</p>
       ) : error ? (
         <p style={{ color: "red" }}>Error al cargar productos: {error}</p>
       ) : null}


        <table width="100%" border={1} cellPadding={8} style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#ddd" }}>
              <th>Código</th>
              <th>Categoría</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>URL Imagen</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((p) => (
              <tr key={p.codigo}>
                <td>{p.codigo}</td>
                <td>{p.categoria}</td>
                <td>{p.nombre}</td>
                <td>${p.precio}</td>

                {/* URL como texto */}
                <td style={{ fontSize: "12px", wordBreak: "break-all", maxWidth: "250px" }}>
                  {p.url}
                </td>

                {/* Miniatura */}
                <td>
                  <img src={p.url} width="80" style={{ borderRadius: "6px" }} />
                </td>

                <td>
                  <button
                    onClick={() => editarProducto(p)}
                    style={{
                      background: "#007bff",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => eliminarProducto(p.codigo)}
                    style={{
                      background: "#dc3545",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminProductos;