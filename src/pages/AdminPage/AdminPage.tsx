import React, { useState } from "react";

type Producto = {
  codigo: string;
  categoria: string;
  nombre: string;
  descripcion: string;
  precio: number;
  url: string;
};

const dataInicial: Producto[] = [
  {
    "codigo": "TC001",
    "categoria": "Tortas Cuadradas",
    "nombre": "Torta Cuadrada de Chocolate",
    "descripcion": "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales",
    "precio": 45000,
    "url": "https://brigams.pe/wp-content/uploads/chocolate-2.jpg"
  },
  {
    "codigo": "TC002",
    "categoria": "Tortas Cuadradas",
    "nombre": "Torta Cuadrada de Frutas",
    "descripcion": "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.",
    "precio": 50000,
    "url": "https://brigams.pe/wp-content/uploads/tutifruti-2-1000x667.jpg"
  },
  {
    "codigo": "TT001",
    "categoria": "Tortas Circulares",
    "nombre": "Torta Circular de Vainilla",
    "descripcion": "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.",
    "precio": 40000,
    "url": "https://i1.wp.com/isabelvermal.com/wp-content/uploads/2023/03/IV-305-1.jpg?ssl=1"
  },
  {
    "codigo": "TT002",
    "categoria": "Tortas Circulares",
    "nombre": "Torta Circular de Manjar",
    "descripcion": "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.",
    "precio": 42000,
    "url": "https://www.elingenio.cl/productos/bizcocho-manjar-lucuma.jpg"
  },
  {
    "codigo": "PI001",
    "categoria": "Postres Individuales",
    "nombre": "Mousse de Chocolate",
    "descripcion": "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.",
    "precio": 5000,
    "url": "https://imag.bonviveur.com/mousse-de-chocolate-negro-casera.jpg"
  },
  {
    "codigo": "PI002",
    "categoria": "Postres Individuales",
    "nombre": "Tiramisú Clásico",
    "descripcion": "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.",
    "precio": 5500,
    "url": "https://www.paulinacocina.net/wp-content/uploads/2020/01/receta-de-tiramisu-facil-y-economico-1740483918.jpg"
  },
  {
    "codigo": "PSA001",
    "categoria": "Productos Sin Azúcar",
    "nombre": "Torta Sin Azúcar de Naranja",
    "descripcion": "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.",
    "precio": 48000,
    "url": "https://cocinachilena.cl/wp-content/uploads/2010/08/torta-naranja-10-scaled.jpg"
  },
  {
    "codigo": "PSA002",
    "categoria": "Productos Sin Azúcar",
    "nombre": "Cheesecake Sin Azúcar",
    "descripcion": "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.",
    "precio": 47000,
    "url": "https://www.jamieoliverenespañol.com/wp-content/uploads/2015/05/cheesecake.jpg"
  },
  {
    "codigo": "PT001",
    "categoria": "Pastelería Tradicional",
    "nombre": "Empanada de Manzana",
    "descripcion": "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.",
    "precio": 3000,
    "url": "https://lacocinadefrabisa.lavozdegalicia.es/wp-content/uploads/2017/02/empanada-manzana-5-640x640.jpg"
  },
  {
    "codigo": "PT002",
    "categoria": "Pastelería Tradicional",
    "nombre": "Tarta de Santiago",
    "descripcion": "Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.",
    "precio": 6000,
    "url": "https://recetasdecocina.elmundo.es/wp-content/uploads/2025/03/tarta-de-santiago.jpg"
  },
  {
    "codigo": "PG001",
    "categoria": "Productos Sin Gluten",
    "nombre": "Brownie Sin Gluten",
    "descripcion": "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.",
    "precio": 4000,
    "url": "https://mividaenundulce.com/wp-content/uploads/2014/01/dsc_1744.jpg"
  },
  {
    "codigo": "PG002",
    "categoria": "Productos Sin Gluten",
    "nombre": "Pan Sin Gluten",
    "descripcion": "Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.",
    "precio": 3500,
    "url": "https://glutendence.com/wp-content/uploads/2022/09/Pan-sarraceno-y-quinoa-1024x576.jpg"
  },
  {
    "codigo": "PV001",
    "categoria": "Productos Vegana",
    "nombre": "Torta Vegana de Chocolate",
    "descripcion": "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.",
    "precio": 50000,
    "url": "https://www.limaorganica.pe/wp-content/uploads/2020/01/arilu-vegan-choco-cake-700x460.jpg"
  },
  {
    "codigo": "PV002",
    "categoria": "Productos Vegana",
    "nombre": "Galletas Veganas de Avena",
    "descripcion": "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.",
    "precio": 4500,
    "url": "https://i.blogs.es/8792e6/galletas-avea-tahina-datiles/840_560.jpg"
  },
  {
    "codigo": "TE001",
    "categoria": "Tortas Especiales",
    "nombre": "Torta Especial de Cumpleaños",
    "descripcion": "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.",
    "precio": 55000,
    "url": "https://fridolin.com.bo/wp-content/uploads/2020/08/Placa-p-tortas-producto.jpg"
  },
  {
    "codigo": "TE002",
    "categoria": "Tortas Especiales",
    "nombre": "Torta Especial de Boda",
    "descripcion": "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.",
    "precio": 60000,
    "url": "https://static.wixstatic.com/media/a18991_1867d6ee4e2f45e1b90010c8b9044c19~mv2.jpg/v1/fill/w_520,h_414,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/a18991_1867d6ee4e2f45e1b90010c8b9044c19~mv2.jpg"
  }
];

const AdminProductos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>(dataInicial);
  const [editando, setEditando] = useState<boolean>(false);
  const [form, setForm] = useState<Producto>({
    codigo: "",
    categoria: "",
    nombre: "",
    descripcion: "",
    precio: 0,
    url: "",
  });

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
  };

  const guardarProducto = () => {
    if (editando) {
      // UPDATE
      setProductos(productos.map((p) => (p.codigo === form.codigo ? form : p)));
    } else {
      // CREATE
      if (productos.find((p) => p.codigo === form.codigo)) {
        alert("El código ya existe");
        return;
      }
      setProductos([...productos, form]);
    }

    limpiarFormulario();
  };

  const editarProducto = (p: Producto) => {
    setForm(p);
    setEditando(true);
  };

  const eliminarProducto = (codigo: string) => {
    if (confirm("¿Eliminar producto?")) {
      setProductos(productos.filter((p) => p.codigo !== codigo));
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
                // Esto genera una URL temporal local (por ejemplo: blob:http://localhost:5173/...).
                const fakeUrl = URL.createObjectURL(file); // URL temporal
                setForm({ ...form, url: fakeUrl });
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

          {/* Input normal (por si eligen no arrastrar) */}
          <input
            type="text"
            name="url"
            placeholder="URL imagen"
            value={form.url}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />

          {/* Previsualización */}
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