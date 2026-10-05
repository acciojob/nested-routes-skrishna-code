import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useParams
} from "react-router-dom";
import "./App.css";

const categories = {
  women: [
    { id: 1, name: "Dresses" },
    { id: 2, name: "Tops" },
    { id: 3, name: "Jeans" }
  ],
  men: [
    { id: 1, name: "Shirts" },
    { id: 2, name: "T-Shirts" },
    { id: 3, name: "Jeans" }
  ]
};

function Layout() {
  return (
    <div className="main-container">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/women">Women</Link>
        <Link to="/men">Men</Link>
      </nav>

      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div className="page">
      <h1>Welcome</h1>
      <p>Select a category to view its items.</p>
    </div>
  );
}

function Category() {
  const { category } = useParams();
  const items = categories[category];

  if (!items) {
    return <h2>Category not found</h2>;
  }

  return (
    <div className="page">
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>

      <div className="items">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/category/${category}/${item.id}`}
            className="item-link"
          >
            {item.name}
          </Link>
        ))}
      </div>

      <Outlet />
    </div>
  );
}

function ItemDetails() {
  const { category, itemId } = useParams();

  const items = categories[category];
  const item = items?.find(
    (item) => item.id === Number(itemId)
  );

  if (!item) {
    return <p>Item not found</p>;
  }

  return (
    <div className="details">
      <h2>{item.name}</h2>
      <p>
        You selected {item.name} from the {category} category.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path=":category" element={<Category />}>
            <Route path=":itemId" element={<ItemDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
