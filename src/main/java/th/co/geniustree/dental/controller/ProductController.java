/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import th.co.geniustree.dental.model.Product;
import th.co.geniustree.dental.model.SearchData;
import th.co.geniustree.dental.repo.PriceAndExpireProductRepo;
import th.co.geniustree.dental.repo.ProductRepo;
import th.co.geniustree.dental.service.ProductService;
import th.co.geniustree.dental.spec.ProductSpec;

/**
 *
 * @author Jasin007
 */
@RestController
public class ProductController {

    @Autowired
    private ProductRepo productRepo;

    @RequestMapping(value = "/loadlproduct")
    public Page<Product> loadProduct(Pageable pageable) {
        return productRepo.findAll(pageable);
    }

    @RequestMapping(value = "/saveproduct", method = RequestMethod.POST)
    public void saveProduct(@Validated @RequestBody Product product) {
        productRepo.save(product);
    }

    @RequestMapping(value = "/deleteproduct", method = RequestMethod.POST)
    public void deleteProduct(@RequestBody Product product) {
        productRepo.delete(product.getId());
    }

    @RequestMapping(value = "/totalproduct", method = RequestMethod.GET)
    public Long getTotalProduct() {
        return productRepo.count();
    }

    @Autowired
    private ProductService productService;

    @RequestMapping(value = "/loadlproduct/searchproduct", method = RequestMethod.POST)
    public Page<Product> searchProduct(@RequestBody SearchData searchData, Pageable pageable) {
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        Page<Product> products = null;
        if ("Name".equals(searchBy)) {
            products = productService.searchByName(keyword, pageable);
        }
        if ("TypeProduct".equals(searchBy)) {
            products = productService.searchByTypeProduct(keyword, pageable);
        }
        if ("UnitProduct".equals(searchBy)) {
            products = productService.searchByUnit(keyword, pageable);
        }
        return products;
    }

    @RequestMapping(value = "/countsearchproduct", method = RequestMethod.POST)
    public Long countSearchProduct(@RequestBody SearchData searchData) {
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        long count = 0;
        if ("Name".equals(searchBy)) {
            count = productRepo.count(ProductSpec.nameLike("%" + keyword + "%"));
        }
        if ("TypeProduct".equals(searchBy)) {
            count = productRepo.count(ProductSpec.typeProductLike("%" + keyword + "%"));
        }
        if ("UnitProduct".equals(searchBy)) {
            count = productRepo.count(ProductSpec.unitLike("%" + keyword + "%"));
        }
        return count;
    }
    
    
    
}
