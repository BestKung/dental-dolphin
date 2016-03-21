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
import th.co.geniustree.dental.model.SearchData;
import th.co.geniustree.dental.model.TypeProduct;
import th.co.geniustree.dental.repo.TypeProductRepo;
import th.co.geniustree.dental.service.TypeProductService;
import th.co.geniustree.dental.spec.TypeProductSpec;


/**
 *
 * @author Jasin007
 */
@RestController
public class TypeProductController {

    @Autowired
    private TypeProductRepo typeProductRepo;

    @RequestMapping(value = "/loadtypeproduct")
    public Page<TypeProduct> loadTypeProduct(Pageable pageable) {
        return typeProductRepo.findAll(pageable);
    }

    @RequestMapping(value = "/savetypeproduct", method = RequestMethod.POST)
    public void saveTypeProduct(@Validated @RequestBody TypeProduct typeProduct) {
        typeProductRepo.save(typeProduct);
    }

    @RequestMapping(value = "/deletetypeproduct", method = RequestMethod.POST)
    public void deleteTypeProduct(@RequestBody TypeProduct typeProduct) {
        typeProductRepo.delete(typeProduct.getId());
    }

    @RequestMapping(value = "/totaltypeproduct", method = RequestMethod.GET)
    public Long getTotalTypeProduct() {
        return typeProductRepo.count();
    }
    
        @Autowired
    private TypeProductService typeProductService;

    @RequestMapping(value = "/loadtypeproduct/searchtypeproduct", method = RequestMethod.POST)
    public Page<TypeProduct> search(@RequestBody SearchData searchData, Pageable pageable) {
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        Page<TypeProduct> typeProducts = null;
        if ("Name".equals(searchBy)) {
            typeProducts = typeProductService.searchByName(keyword, pageable);
        }
        return typeProducts;
    }

    @RequestMapping(value = "/countsearchtypeproduct", method = RequestMethod.POST)
    public long countSearchTypeProduct(@RequestBody SearchData searchData) {
        long count = 0;
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        if ("Name".equals(searchBy)) {
            count = typeProductRepo.count(TypeProductSpec.nameLike("%"+keyword+"%"));
        }
        return count;
    }

}
