import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import "react-datepicker/dist/react-datepicker.css";

createInertiaApp({
  progress: {
    color: "#38BDF8",
  },
  resolve: (name) => {
    const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });
    return pages[`./pages/${name}.jsx`];
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
