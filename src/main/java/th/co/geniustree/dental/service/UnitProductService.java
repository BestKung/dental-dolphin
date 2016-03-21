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
import th.co.geniustree.dental.model.UnitProduct;
import th.co.geniustree.dental.repo.UnitProductRepo;
import th.co.geniustree.dental.spec.UnitProductSpec;

/**
 *
 * @author Jasin007
 */
@Service
public class UnitProductService {
    
    @Autowired
    private UnitProductRepo unitProductRepo;
    
    public Page<UnitProduct> searchByName(String keyword,Pageable pageable){
        Specifications<UnitProduct> specifications = Specifications.where(UnitProductSpec.nameLike("%"+keyword+"%"));
        return unitProductRepo.findAll(specifications, pageable);
    }
}
