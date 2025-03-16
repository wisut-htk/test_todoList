"use client";

import { useEffect, useRef, useState } from "react";
import { listItem } from "../list";

const FruitAndVegetable = () => {
  const [newListItem, setNewListItem] = useState(listItem);
  const [listFruits, setListFruits] = useState([]);
  const [listVegatables, setListVegatables] = useState([]);
  const intervalRef = useRef(null);
  const isFruitTurnRef = useRef(true);

  const handleSelectType = (item) => {
    if (item.type === "Fruit") {
      setListFruits([
        ...listFruits,
        {
          type: "Fruit",
          name: item.name,
        },
      ]);
    } else if (item.type === "Vegetable") {
      setListVegatables([
        ...listVegatables,
        {
          type: "Vegetable",
          name: item.name,
        },
      ]);
    } else {
      console.log("empty");
    }
    const latestItem = newListItem.filter((value) => {
      return value.name !== item.name;
    });
    setNewListItem(latestItem);
  };

  const handleSelectFruit = (item) => {
    const latestFruit = listFruits.filter((value) => {
      return value.name !== item.name;
    });
    setListFruits(latestFruit);
    setNewListItem([
      ...newListItem,
      {
        type: "Fruit",
        name: item.name,
      },
    ]);
  };

  const handleSelectVegetable = (item) => {
    const latestVegetable = listVegatables.filter((value) => {
      return value.name !== item.name;
    });
    setListVegatables(latestVegetable);
    setNewListItem([
      ...newListItem,
      {
        type: "Vegetable",
        name: item.name,
      },
    ]);
  };

  useEffect(() => {
    if (listFruits.length === 0 && listVegatables.length === 0) return;
    const processItems = () => {
      if (listFruits.length === 0) {
        isFruitTurnRef.current = false;
      }
      if (listVegatables.length === 0) {
        isFruitTurnRef.current = true;
      }
      if (isFruitTurnRef.current && listFruits.length > 0) {
        const backFruit = listFruits[0];
        setListFruits((prev) => prev.slice(1));
        setNewListItem((prevList) => [...prevList, backFruit]);
      } else if (!isFruitTurnRef.current && listVegatables.length > 0) {
        const backVegetable = listVegatables[0];
        setListVegatables((prev) => prev.slice(1));
        setNewListItem((prevList) => [...prevList, backVegetable]);
      }

      isFruitTurnRef.current = !isFruitTurnRef.current;

      intervalRef.current = setTimeout(processItems, 5000);
    };
    intervalRef.current = setTimeout(processItems, 5000);

    return () => clearTimeout(intervalRef.current);
  }, [listFruits, listVegatables]);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
          <div>
            <div className="grid grid-cols-1 justify-items-center">
              {newListItem.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectType(item)}
                  className="border-2 p-2 my-2 rounded-md w-full sm:w-120 md:w-50 lg:w-70 border-gray-300 hover:bg-gray-100 cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <table className="table-fixed w-full border-2 border-gray-300 min-h-160">
              <thead>
                <tr>
                  <th className="p-2 bg-gray-100">Fruit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="grid grid-cols-1 justify-items-center">
                    {listFruits.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectFruit(item)}
                        className="border-2 p-2 my-2 rounded-md w-full sm:w-120 md:w-50 lg:w-70 border-gray-300 hover:bg-gray-100 cursor-pointer"
                      >
                        {item.name}
                      </button>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <table className="table-fixed w-full border-2 border-gray-300 min-h-160">
              <thead>
                <tr>
                  <th className="p-2 bg-gray-100">Vegetable</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="grid grid-cols-1 justify-items-center">
                    {listVegatables.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectVegetable(item)}
                        className="border-2 p-2 my-2 rounded-md w-full sm:w-120 md:w-50 lg:w-70 border-gray-300 hover:bg-gray-100 cursor-pointer"
                      >
                        {item.name}
                      </button>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default FruitAndVegetable;
