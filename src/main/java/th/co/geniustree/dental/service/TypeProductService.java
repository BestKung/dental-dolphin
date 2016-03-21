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
import th.co.geniustree.dental.model.TypeProduct;
import th.co.geniustree.dental.repo.TypeProductRepo;
import th.co.geniustree.dental.spec.TypeProductSpec;

/**
 *
 * @author Jasin007
 */
@Service
public class TypeProductService {
    
    @Autowired
    private TypeProductRepo typeProductRepo;
    
    public Page<TypeProduct> searchByName(String keyword,Pageable pageable){
        Specifications<TypeProduct> specifications = Specifications.where(TypeProductSpec.nameLike("%"+keyword+"%"));
        return typeProductRepo.findAll(specifications, pageable);
    }
}
