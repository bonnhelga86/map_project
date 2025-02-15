import { useState } from "react";
import "./MapMenu.css";
import { TAB_ITEMS } from "./MapMenu.const";

export const MapMenu = () => {
  const [activeTab, setActiveTab] = useState<string>("routes");
  const handleMenuClick = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="mapMenuContainer">
      <ul className="mapMenu">
        {TAB_ITEMS.map((item) => {
          return (
            <li key={item.key}>
              <button
                className={`mapButton ${
                  activeTab === item.key ? "activeButton" : ""
                }`}
                onClick={() => handleMenuClick(item.key)}
              >
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        {activeTab === "routes"
          ? "Информация о маршрутах"
          : "Информация об объектах"}
      </div>
    </div>
  );
};
