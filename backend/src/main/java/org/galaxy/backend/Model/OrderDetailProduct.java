package org.galaxy.backend.Model;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@Table(name = "order_detail_products")
@NoArgsConstructor
public class OrderDetailProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // UUID tự động
    private int id;

    @ManyToOne
    @JoinColumn(name = "order_detail_order_detail_id")
    private OrderDetail order_detail_id;

    @ManyToOne
    @JoinColumn(name = "products_product_id")
    private Product products_product_id;

    private Integer quantity;

    private Double price;

    private Integer discount;
}
