import React from "react";
import { COLORS } from "../constants/Colors";
import { addReport, getCategories } from "../api/api";
import { useParams } from "react-router-dom";
import {
  Category,
  PageProps,
  Question,
  Report,
  Topic,
} from "../interfaces/Interfaces";
import TableCategories from "../components/tables/TableCategories";
export default function ViewPage({ token, currentLanguage }: PageProps) {
  const [categories, setCategories] = React.useState<Category[]>([]);
  React.useEffect(() => {
    (async () => {
      /* addReport(
        {
          question_id: 349649,
          reason: "BRUTTA",
          user_id: "COGLION",
        },
        "EN"
      );*/

      const retrievedCategories = await getCategories(currentLanguage, token);
      if (retrievedCategories != null) {
        setCategories(retrievedCategories);
      }
    })();
  }, [currentLanguage]);
  return (
    <TableCategories
      token={token}
      categories={categories}
      currentLanguage={currentLanguage}
    />
  );
}
