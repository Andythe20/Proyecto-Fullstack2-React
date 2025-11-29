import React, { useState, useEffect } from "react";
import useProductos from "../../hooks/useProductos";
import type { Product } from "../../types/product";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const AdminProductos: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
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

  // Validar formulario antes de enviar
  const validarFormulario = (): string | null => {
    if (!form.codigo.trim()) return "El código es obligatorio.";
    if (!form.categoria.trim()) return "La categoría es obligatoria.";
    if (!form.nombre.trim()) return "El nombre es obligatorio.";
    if (!form.descripcion.trim() || form.descripcion.length < 10)
      return "La descripción debe tener al menos 10 caracteres.";

    if (!form.precio || form.precio <= 0)
      return "El precio debe ser mayor que 0.";

    // Validación de imagen
    if (!editando && !selectedFile)
      return "Debes subir una imagen para crear el producto.";

    if (selectedFile) {
      const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];
      if (!tiposPermitidos.includes(selectedFile.type))
        return "La imagen debe ser PNG, JPG o WEBP.";

      if (selectedFile.size > 5 * 1024 * 1024)
        return "La imagen no puede superar los 5 MB.";
    }

    return null; // Sin errores
  };

  // Almacenar imagen arrastrada
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // Vista previa de la imagen
  const [preview, setPreview] = useState<string | null>(null);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    setPreview(null);
  };

  const guardarProducto = async () => {
    // VALIDAR FORMULARIO ANTES DE HACER NADA
    const errorValidacion = validarFormulario();
    if (errorValidacion) {
      Swal.fire({
        icon: "warning",
        title: "Validación",
        text: errorValidacion,
      });
      return;
    }
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

    // PUT: Editar producto
    if (editando) {
      setLoading(true);
      try {
        const fd = new FormData();

        // Crear JSON con datos del producto
        const productJson = JSON.stringify({
          categoria: form.categoria,
          nombre: form.nombre,
          descripcion: form.descripcion,
          precio: form.precio,
          url: form.url,
        });

        // El backend recibe una solicitud multipart/form-data con 2 partes:
        // 1) "product" → JSON con los campos del producto a actualizar
        // 2) "file"    → (opcional) imagen en formato MultipartFile
        //
        // Para que Spring Boot pueda diferenciar ambas partes sin confusión,
        // el JSON debe enviarse explícitamente como "application/json".
        //
        // Usamos un Blob para envolver el string JSON y asignarle ese MIME type.
        // Si no se hace esto, el JSON se envía como texto plano ("text/plain")
        // y Spring no puede convertirlo al DTO ProductUpdateRequest.
        //
        // Por eso, convertimos el JSON a un Blob antes de agregarlo al FormData:
        fd.append(
          "product",
          new Blob([productJson], { type: "application/json" })
        );

        // Si hay imagen nueva agregarla al FormData
        if (selectedFile) {
          fd.append("file", selectedFile);
        }

        const res = await fetch(`/api/v1/products/${form.codigo}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: fd,
        });

        const updated: Product = await res.json();

        setProductos((prev) =>
          prev.map((x) => (x.codigo === updated.codigo ? updated : x))
        );
      } finally {
        setLoading(false);
      }
    } else {
      // POST: Crear nuevo producto
      setLoading(true);
      try {
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
      } finally {
        setLoading(false);
      }
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
      await Swal.fire({
        icon: "error",
        title: "No autenticado",
        text: "Inicia sesión primero.",
      });
      return;
    }

    // parsear el JSON y extraer accessToken
    const authTokens = JSON.parse(authTokensLocal);
    const token = authTokens.accessToken;

    try {
      await fetch("/api/v1/products/" + codigo, {
        method: "DELETE",
        // Enviar token en el header Authorization para autenticación
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProductos(productos.filter((p) => p.codigo !== codigo));
      await Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "Producto eliminado correctamente.",
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      alert("Error eliminando el producto: " + msg);
    }
  };
  if (loading) {
    return <LoadingSpinner text="Procesando operación..." />;
  }
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className="text-center mb-4">Panel Admin - Productos</h1>

          {/* FORMULARIO */}
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-lg-8 col-xl-6">
              <div className="card shadow-sm">
                <div className="card-header bg-secondary text-white">
                  <h5 className="mb-0">
                    <i
                      className={`fa-solid ${
                        editando ? "fa-pen-to-square" : "fa-circle-plus"
                      } me-2`}
                    />
                    {editando ? "Editar Producto" : "Agregar Producto"}
                  </h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="codigo" className="form-label">
                      Código
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="codigo"
                      name="codigo"
                      placeholder="Código único del producto"
                      value={form.codigo}
                      onChange={handleChange}
                      disabled={editando}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="categoria" className="form-label">
                      Categoría
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="categoria"
                      name="categoria"
                      placeholder="Ej: Electrónica, Ropa, Alimentos"
                      value={form.categoria}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      placeholder="Nombre del producto"
                      value={form.nombre}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">
                      Descripción
                    </label>
                    <textarea
                      className="form-control"
                      id="descripcion"
                      name="descripcion"
                      placeholder="Descripción detallada del producto"
                      value={form.descripcion}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="precio" className="form-label">
                      Precio
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control"
                        id="precio"
                        name="precio"
                        placeholder="0.00"
                        value={form.precio}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  {/* DRAG & DROP */}
                  <div className="mb-3">
                    <label className="form-label">Imagen del producto</label>
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file) {
                          setSelectedFile(file);
                          setPreview(URL.createObjectURL(file)); // ← PREVIEW DE LA IMAGEN
                          setForm({ ...form, url: "" });
                        }
                      }}
                      onClick={() =>
                        document.getElementById("fileInput")?.click()
                      }
                      className="border border-2 border-dashed rounded p-4 text-center bg-light"
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12px",
                      }}
                    >
                      <i className="fa-solid fa-cloud-arrow-up fs-1 text-muted d-block"></i>
                      <p className="mb-0 text-muted">
                        Arrastra una imagen aquí o haz clic para seleccionar
                      </p>
                      <input
                        type="file"
                        className="d-none"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setSelectedFile(file);
                            setPreview(URL.createObjectURL(file)); // ← PREVIEW DE LA IMAGEN
                            setForm({ ...form, url: "" });
                          }
                        }}
                        id="fileInput"
                      />
                    </div>
                  </div>

                  {/* Previsualización */}
                  {selectedFile && (
                    <div className="alert alert-info d-flex align-items-center">
                      <i className="fa-solid fa-file-image me-2"></i>
                      <span>
                        <strong>Archivo seleccionado:</strong>{" "}
                        {selectedFile.name}
                      </span>
                    </div>
                  )}
                  {/* Previsualización de imagen */}
                  {preview && (
                    <div className="text-center mb-3">
                      <img
                        src={preview}
                        alt="Preview"
                        className="img-thumbnail"
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                      />
                    </div>
                  )}

                  {form.url && !selectedFile && (
                    <div className="text-center mb-3">
                      <img
                        src={form.url}
                        alt="Preview"
                        className="img-thumbnail"
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                      />
                    </div>
                  )}

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    {editando && (
                      <button
                        type="button"
                        onClick={limpiarFormulario}
                        className="btn btn-secondary px-5"
                      >
                        <i className="fa-solid fa-ban me-2"></i>
                        Cancelar
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={guardarProducto}
                      className="btn btnBrown px-5"
                    >
                      <i
                        className={`fa-regular ${
                          editando ? "fa-pen-to-square" : "fa-floppy-disk"
                        } me-2`}
                      ></i>
                      {editando ? "Actualizar" : "Guardar"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TABLA */}
          <div className="card shadow-sm">
            <div className="card-body p-0">
              {isLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="mt-3 text-muted">
                    Cargando productos desde el backend...
                  </p>
                </div>
              ) : error ? (
                <div className="alert alert-danger m-3" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Error al cargar productos: {error}
                </div>
              ) : productos.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox fs-1 text-muted d-block mb-3"></i>
                  <p className="text-muted">No hay productos registrados</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-striped mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Código</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos.map((p) => (
                        <tr key={p.codigo}>
                          <td className="align-middle">
                            <span className="text-muted">{p.codigo}</span>
                          </td>
                          <td className="align-middle">
                            <img
                              src={p.url}
                              alt={p.nombre}
                              className="rounded"
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                              }}
                            />
                          </td>
                          <td className="align-middle">
                            <strong>{p.nombre}</strong>
                            <br />
                            <small className="text-muted">
                              {p.descripcion}
                            </small>
                          </td>
                          <td className="align-middle">
                            <span className="text-dark">{p.categoria}</span>
                          </td>
                          <td className="align-middle">
                            <strong className="text-success">
                              $
                              {(typeof p.precio === "number"
                                ? p.precio
                                : parseFloat(p.precio || "0")
                              ).toFixed(2)}
                            </strong>
                          </td>
                          <td className="align-middle text-center">
                            <div className="btn-group" role="group">
                              <button
                                onClick={() => editarProducto(p)}
                                className="btn btn-sm btn-primary"
                                title="Editar"
                              >
                                <i className="fa-regular fa-pen-to-square"></i>
                              </button>
                              <button
                                onClick={() => eliminarProducto(p.codigo)}
                                className="btn btn-sm btn-danger"
                                title="Eliminar"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {productos.length > 0 && (
              <div className="card-footer text-muted text-center">
                Total de productos: <strong>{productos.length}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductos;
