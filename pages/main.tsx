"use client";

import { useState, useEffect } from "react";


export default function Home() {
	const [ingredients, setIngredients] = useState([]);
	const [sum, setSum] = useState("");
	const [time, setTime] = useState("");
  const [style, setStyle] = useState("");
  const [type, setType] = useState("");
  const [inputValue, setInputValue] = useState("");

	const updateInputValue = () => {
		let str = "";
		if(ingredients.length > 0) {
			for(let i = 0; i < ingredients.length; i++) {
				if(i === ingredients.length - 1) {
					str += ingredients[i];
				}else{
					str += ingredients[i] + "と";
				}
			}
		}
		setSum(str);

    setInputValue(`${sum}を使って${time}でできる${style}な${type}`);
		console.log(inputValue);
	};

  const [apiResponse, setApiResponse] = useState({
		title: "",
		ingredients: [],
		steps: [],
	});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const requestBody = JSON.stringify({ message: inputValue });

    try {
      const response = await fetch("api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });
      const data = await response.json();
			const {title, ingredients, steps} = JSON.parse(data.message);
      setApiResponse({title, ingredients, steps});
			console.log(apiResponse);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="consultation">
			<p>を使って</p>
      <form onSubmit={handleSubmit}>
        <div>

          <select
            onChange={(e) => {
              setTime(e.target.value);
              updateInputValue();
            }}
          >
            <option value="10分~30分">10分~30分</option>
            <option value="30~60分">30~60分</option>
            <option value="60~120分">60~120分</option>
            <option value="120~240分">120~240分</option>
            <option value="240分以上">240分以上</option>
          </select>
          でできる
          <select
            onChange={(e) => {
              setStyle(e.target.value);
              updateInputValue();
            }}
          >
            <option value="和風">和風</option>
            <option value="洋風">洋風</option>
            <option value="中華">中華</option>
            <option value="イタリアン">イタリアン</option>
            <option value="フレンチ">フレンチ</option>
          </select>
          な
          <select
            onChange={(e) => {
              setType(e.target.value);
              updateInputValue();
            }}
          >
            <option value="料理">料理</option>
            <option value="デザート">デザート</option>
          </select>
        </div>

        <button type="submit">レシピを作成</button>
      </form>
      <div id="recipe">
        {apiResponse && (
          <div>
            <h2>レシピ</h2>
            <h1>{apiResponse.title}</h1>
            <h3>材料</h3>
            <ul>
              {apiResponse.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>手順</h3>
            <ol>
              {apiResponse.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
// りんごと砂糖を使った30分くらいでできるレシピ;
