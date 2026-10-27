import { useCallback, useEffect, useState } from 'react';

import { getProducts } from '../services/products';
import { Product } from '../types/Product';

import type { Category } from '../types/Category';

export const useProducts = (category: Category) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => {
    setReloadKey(value => value + 1);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setError(false);

    getProducts()
      .then(data => {
        if (!isCancelled) {
          const filteredProducts = data.filter(
            product => product.category === category,
          );

          setProducts(filteredProducts);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setError(true);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [category, reloadKey]);

  return { products, isLoading, error, reload };
};
