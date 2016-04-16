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
import th.co.geniustree.dental.model.UnitProduct;
import th.co.geniustree.dental.repo.UnitProductRepo;
import th.co.geniustree.dental.service.UnitProductService;
import th.co.geniustree.dental.spec.UnitProductSpec;

/**
 *
 * @author Jasin007
 */
@RestController
public class UnitProductController {

    @Autowired
    private UnitProductRepo unitProductRepo;

    @RequestMapping(value = "/loadunitproduct")
    public Page<UnitProduct> loadUnitProduct(Pageable pageable) {
        return unitProductRepo.findAll(pageable);
    }

    @RequestMapping(value = "/saveunitproduct", method = RequestMethod.POST)
    public Integer saveUnitProduct(@Validated @RequestBody UnitProduct unitProduct) {
        UnitProduct unitProductName = unitProductRepo.findByName(unitProduct.getName());
        if ((unitProductName != null) && (unitProduct.getId() == null)) {
            return 1;
        }
        unitProductRepo.save(unitProduct);
        return 200;
    }

    @RequestMapping(value = "/deleteunitproduct", method = RequestMethod.POST)
    public void deleteUnitProduct(@RequestBody UnitProduct unitProduct) {
        unitProductRepo.delete(unitProduct.getId());
    }

    @RequestMapping(value = "/totalunitproduct", method = RequestMethod.GET)
    public Long getTotalUnitProduct() {
        return unitProductRepo.count();
    }

    @Autowired
    private UnitProductService unitProductService;

    @RequestMapping(value = "/loadunitproduct/searchunitproduct", method = RequestMethod.POST)
    public Page<UnitProduct> search(@RequestBody SearchData searchData, Pageable pageable) {
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        Page<UnitProduct> unitProducts = null;
        if ("Name".equals(searchBy)) {
            unitProducts = unitProductService.searchByName(keyword, pageable);
        }
        return unitProducts;
    }

    @RequestMapping(value = "/countsearchunitproduct", method = RequestMethod.POST)
    public long countSearchUnitProduct(@RequestBody SearchData searchData) {
        long count = 0;
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        if ("Name".equals(searchBy)) {
            count = unitProductRepo.count(UnitProductSpec.nameLike("%" + keyword + "%"));
        }
        return count;
    }
}
