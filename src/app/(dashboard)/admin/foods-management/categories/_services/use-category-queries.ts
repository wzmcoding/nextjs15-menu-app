import { getCategories } from "@/app/(dashboard)/admin/foods-management/categories/_services/categoryQueries";
import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export { useCategories };
