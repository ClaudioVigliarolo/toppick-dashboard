import axios, { AxiosResponse } from "axios";
import { HOSTNAME } from "../config/config";
import {
  CategoryDetail,
  DashLabel,
  CategoryCreated,
  CategoryFeatured,
  Lang,
} from "@toppick/common";

export async function getFeaturedCategories(): Promise<CategoryFeatured[]> {
  const response = await axios.get(`${HOSTNAME}/api/content/categories`, {
    params: {
      take_all: true,
      count_topics: true,
    },
  });
  return response.data;
}

export const getCategoryLabels = async ({
  id,
  take_all,
}: {
  id?: number;
  take_all?: boolean;
}): Promise<DashLabel[]> => {
  const response = await axios.get(
    `${HOSTNAME}/api/content/categories/labels`,
    {
      params: {
        id,
        take_all,
      },
    }
  );
  return response.data;
};

export const getCategoryDetails = async (
  slug: string
): Promise<CategoryDetail> => {
  const response = await axios.get(
    `${HOSTNAME}/api/content/categories/details`,
    {
      params: { slug },
    }
  );
  return response.data;
};

export const deleteCategory = async (
  id: number,
  lang: Lang,
  token: string
): Promise<void> => {
  await axios.delete(`${HOSTNAME}/api/content/categories/`, {
    data: {
      id,
      lang,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const createCategory = async (
  category: CategoryCreated,
  lang: Lang,
  token: string
): Promise<CategoryDetail> => {
  const res = await axios.post(
    `${HOSTNAME}/api/content/categories`,
    {
      category,
      lang,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return res.data;
};

export const updateCategory = async (
  category: CategoryCreated,
  lang: Lang,
  token: string
): Promise<CategoryDetail> => {
  const response = await axios.patch(
    `${HOSTNAME}/api/content/categories/${category.id}`,
    {
      category,
      lang,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};
