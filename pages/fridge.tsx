"use client";
import { useFridgeData } from "./api/useFridgeData";
import { useState, useEffect } from "react";

export default function Fridge({
  params,
  selectedIngredients,
  setSelectedIngredients,
}: {
  params?: { slug: string };
  selectedIngredients: string[];
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const { fridge, error } = useFridgeData(params?.slug);
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

  if (error) {
    return <div>エラー: {error}</div>;
  }

  if (!fridge.length) {
    return <div>冷蔵庫の中身を取得中...</div>;
  }

  function toggleSelection(item: any) {
    if (selectedButtons.includes(item.id)) {
      const updatedButtons = selectedButtons.filter((id) => id !== item.id);
      const updatedIngredients = selectedIngredients.filter(
        (name) => name !== item.ingredientsName
      );
      setSelectedButtons(updatedButtons);
      setSelectedIngredients(updatedIngredients);
      console.log("削除後", updatedIngredients);
    } else {
      const updatedButtons = [...selectedButtons, item.id];
      const updatedIngredients = [...selectedIngredients, item.ingredientsName];
      setSelectedButtons(updatedButtons);
      setSelectedIngredients(updatedIngredients);
      console.log("追加後", updatedIngredients);
    }
  }

  return (
    <div id="fridge">
      <h2>冷蔵庫の中身</h2>
      <ul>
        {fridge.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => {
                toggleSelection(item);
                console.log(item);
              }}
              style={{
                backgroundColor: selectedButtons.includes(item.id)
                  ? "blue"
                  : "gray",
              }}
            >
              {item.ingredientsName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
