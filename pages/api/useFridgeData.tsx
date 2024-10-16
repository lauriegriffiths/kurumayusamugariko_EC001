import { useState, useEffect } from "react";

interface FridgeItem {
  id: number;
  ingredientsName: string;
  quantity: number;
  deadline: string;
  image: string;
}

export const useFridgeData = (slug?: string) => {
  const [fridge, setFridge] = useState<FridgeItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      "https://script.googleusercontent.com/macros/echo?user_content_key=BCWmPygPlw068DGVVOk0iigpUFYgXMrKEL07dMKhOebmF5IeoHnFcTIVVsD9nZ9QiaE7AI92HqlNhivk7T-RHMPeHnhxrtB1m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnBOv4a3WSqvwJEgGskD1xwP2BEAuR6wJ376nH67tfwT1nbgHYdSDHFXMsFHZLy021CswjTzkf12sE-6PYGTb0FQeIO8U76cObtz9Jw9Md8uu&lib=MI7QhlIDWSuArrF-zwN-hJfuzKQ73SgK9"
    )
      .then((response) => response.json())
      .then((data) => {
        const dataWithIds = data.map((item: FridgeItem, index: number) => ({
          ...item,
          id: index,
        }));
        setFridge(dataWithIds);
      })
      .catch((error) => {
        setError("データの取得に失敗しました。");
        console.log(error);
      });
  }, [slug]);

  return { fridge, error };
};
