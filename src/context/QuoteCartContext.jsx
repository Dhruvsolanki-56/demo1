import React, { createContext, useContext, useEffect, useState } from "react";

const QuoteCartContext = createContext(null);
const STORAGE_KEY = "striker_quote_cart";

export function QuoteCartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = "1") => {
    const image = product.images?.find((i) => i.is_primary) || product.images?.[0];
    setItems((prev) => {
      const existing = prev.find((i) => i.product_id === product.id);
      if (existing) {
        return prev.map((i) => (i.product_id === product.id ? { ...i, quantity } : i));
      }
      return [
        ...prev,
        {
          product_id: product.id,
          name: product.name,
          slug: product.slug,
          composition: product.composition || "",
          // Kept so the quote list can draw the same dosage-form motif the
          // catalogue uses when a product has no real photograph.
          dosage_form: product.dosage_form || "",
          image_url: image?.image_url || "",
          quantity,
          notes: "",
        },
      ];
    });
  };

  const updateQuantity = (product_id, quantity) => {
    setItems((prev) => prev.map((i) => (i.product_id === product_id ? { ...i, quantity } : i)));
  };

  const updateNotes = (product_id, notes) => {
    setItems((prev) => prev.map((i) => (i.product_id === product_id ? { ...i, notes } : i)));
  };

  const removeItem = (product_id) => {
    setItems((prev) => prev.filter((i) => i.product_id !== product_id));
  };

  const clearCart = () => setItems([]);

  const isInCart = (product_id) => items.some((i) => i.product_id === product_id);

  return (
    <QuoteCartContext.Provider value={{ items, addItem, updateQuantity, updateNotes, removeItem, clearCart, isInCart }}>
      {children}
    </QuoteCartContext.Provider>
  );
}

export function useQuoteCart() {
  const ctx = useContext(QuoteCartContext);
  if (!ctx) throw new Error("useQuoteCart must be used within QuoteCartProvider");
  return ctx;
}
