import React from "react";

function useLocalStorage(itemName, initialValue) {
  const [item, setItem] = React.useState(initialValue);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [itemsToLoad] = React.useState(
    JSON.parse(localStorage.getItem(itemName)
    )
  );

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;
        if (!localStorageItem) {
          localStorage.setItem("TODO_V1", JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }
        setLoading(false);

        setItem(parsedItem);
      } catch (error) {
        setError(error);
      }
    }, 3000);
  }, []);

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
    } catch (error) {
      setError(error);
    }
  };
  return {
    item,
    saveItem,
    loading,
    error,
    itemsToLoad,
  };
}

export { useLocalStorage };
