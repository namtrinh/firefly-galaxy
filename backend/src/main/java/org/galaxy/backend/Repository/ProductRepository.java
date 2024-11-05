package org.galaxy.backend.Repository;

import java.util.List;

import org.galaxy.backend.Model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    boolean existsByName(String name);

    @Query(value = "select quantity from product where product.product_id =:id", nativeQuery = true)
    Integer findAvailableQuantityById(String id);

    Product getBySeotitle(String seotitle);

    @Query("SELECT p FROM Product p WHERE p.promotion IS NOT NULL")
    List<Product> findAllProductsWithPromotion();

    @Query("SELECT p FROM Product p WHERE p.promotion IS NULL")
    List<Product> findAllProductsWithoutPromotion();

    @Query(value = "SELECT * from product ORDER BY time_created  DESC ", nativeQuery = true)
    Page<Product> findAllByPage(Pageable pageable);

    @Query(
            value =
                    "select * from product inner join category on category.category_id = product.category_category_id where product.category_category_id = :category",
            nativeQuery = true)
    List<Product> getByCategory(@Param("category") String category);
}
