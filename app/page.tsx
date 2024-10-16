'use client';
import React, { useState } from "react";
import Main from "../pages/main";
import Fridge from "../pages/fridge";

export default function Home() {
	const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  return (
    <main>
      <Fridge
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />
      <Main />
    </main>
  );
}
