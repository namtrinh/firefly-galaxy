package org.galaxy.backend.Model;

import java.io.Serializable;
import java.util.Set;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "category")
public class Category implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String category_id;

    private String ct_name;

    private String ct_seotitle;

    private Byte sort;

    private String icon;

    private String poster;

    @OneToMany(mappedBy = "category", fetch = FetchType.EAGER)
    @JsonIgnoreProperties("category")
    private Set<Product> products;
}
