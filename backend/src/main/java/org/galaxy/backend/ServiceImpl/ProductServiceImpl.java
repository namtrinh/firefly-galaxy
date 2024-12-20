package org.galaxy.backend.ServiceImpl;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.cloudinary.utils.ObjectUtils;
import jakarta.persistence.EntityNotFoundException;

import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Model.Review;
import org.galaxy.backend.Repository.ProductRepository;
import org.galaxy.backend.Repository.Reviewrepository;
import org.galaxy.backend.Repository.UserRepository;
import org.galaxy.backend.Service.CloudinaryService;
import org.galaxy.backend.Service.ProductService;
import org.galaxy.backend.Service.ReadExel.ReadExelProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private Reviewrepository reviewrepository;

    public List<Product> findAllProductsWithPromotion() {
        return productRepository.findAllProductsWithPromotion();
    }

    public Product save(Product entity) {
        if (productRepository.existsByName(entity.getName())) {
            throw new RuntimeException("Product_name already exists");
        }
        return productRepository.save(entity);
    }

    public Product findById(String product_id) {
        return productRepository.findById(product_id).orElseThrow(() -> new RuntimeException("Not found "));
    }

    @Transactional
    public void deleteById(String productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product with ID " + productId + " not found"));

        product.setCategory(null);
        product.setPromotion(null);

        if (product.getImage() != null && !product.getImage().isEmpty()) {
            String publicId = product.getImage();
            String deleteResult = cloudinaryService.deleteFile(publicId);
        }
        productRepository.delete(product);
    }

    public Product editProduct(String product_id, Product product) {
        product.setProduct_id(product_id);
        return this.productRepository.save(product);
    }

    public Product getBySeotitle(String seotitle) {
        return productRepository.getBySeotitle(seotitle);
    }

    public Page<Product> findAllByPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
    }

    public void savePrEx(MultipartFile file) {
        try {
            List<Product> stuList = ReadExelProduct.excelToStuList(file.getInputStream());
            productRepository.saveAll(stuList);
        } catch (IOException ex) {
            throw new RuntimeException("Excel data is failed to store: " + ex.getMessage());
        }
    }

    public List<Product> getByCategory(String category) {
        return productRepository.getByCategory(category);
    }


    public List<Product> searchProductsByName(String name, String category) {
        return productRepository.searchByNameOrCategory(name, category);
    }

    public Product UpdateStatus(String product_id, Product product) {
        product.setProduct_id(product_id);
        return productRepository.save(product);
    }
}
