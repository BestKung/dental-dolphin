/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import th.co.geniustree.dental.model.Product;
import th.co.geniustree.dental.repo.ProductRepo;
import th.co.geniustree.dental.spec.ProductSpec;

/**
 *
 * @author Jasin007
 */
@Service
public class ProductService {
    
    @Autowired
    private ProductRepo productRepo;
            
    public Page<Product> searchByName(String keywod,Pageable pageable){
        Specifications<Product> specifications = Specifications.where(ProductSpec.nameLike("%"+keywod+"%"));
        return  productRepo.findAll(specifications, pageable);
    }
    
    public Page<Product> searchByTypeProduct(String keywod,Pageable pageable){
        Specifications<Product> specifications = Specifications.where(ProductSpec.typeProductLike("%"+keywod+"%"));
        return  productRepo.findAll(specifications, pageable);
    }
    
    public Page<Product> searchByUnit(String keywod,Pageable pageable){
        Specifications<Product> specifications = Specifications.where(ProductSpec.unitLike("%"+keywod+"%"));
        return  productRepo.findAll(specifications, pageable);
    }
}
