import React from "react";
import { COLORS } from "../constants/Colors";
import { addReport, getCategories, getUpdates } from "../api/api";
import { useParams } from "react-router-dom";
import { Category, PageProps } from "../interfaces/Interfaces";
import TableCategories from "../components/tables/TableCategories";
export default function ViewPage({
  token,
  currentLanguage,
  setLoading,
}: PageProps) {
  const [categories, setCategories] = React.useState<Category[]>([]);
  React.useEffect(() => {
    setLoading(true);
    (async () => {
      const retrievedCategories = await getCategories(currentLanguage, token);
      if (retrievedCategories != null) {
        setCategories(retrievedCategories);
      }
      setLoading(false);
    })();
  }, [currentLanguage]);
  return (
    <TableCategories
      token={token}
      categories={categories}
      currentLanguage={currentLanguage}
      setLoading={setLoading}
    />
  );
}
