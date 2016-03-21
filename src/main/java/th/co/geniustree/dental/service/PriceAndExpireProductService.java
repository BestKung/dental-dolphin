/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.service;

import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import th.co.geniustree.dental.model.PriceAndExpireProduct;
import th.co.geniustree.dental.repo.PriceAndExpireProductRepo;
import th.co.geniustree.dental.spec.PriceAndExpireProductSpec;

/**
 *
 * @author Jasin007
 */
@Service
public class PriceAndExpireProductService {
    
    @Autowired
    private PriceAndExpireProductRepo priceAndExpireProductRepo;
    
    public Page<PriceAndExpireProduct> searchByProduct(String keyword,Pageable pageable){
        Specifications<PriceAndExpireProduct> specifications = Specifications.where(PriceAndExpireProductSpec.productLike("%"+keyword+"%"));
        return priceAndExpireProductRepo.findAll(specifications, pageable);
    }
    
    public Page<PriceAndExpireProduct> searchByLot(Date keyword,Pageable pageable){
        Specifications<PriceAndExpireProduct> specifications = Specifications.where(PriceAndExpireProductSpec.lotInBetween(keyword));
        return priceAndExpireProductRepo.findAll(specifications, pageable);
    }
    
    public Page<PriceAndExpireProduct> searchByExpire(Date keyword,Pageable pageable){
        Specifications<PriceAndExpireProduct> specifications = Specifications.where(PriceAndExpireProductSpec.expireBetween(keyword));
        return priceAndExpireProductRepo.findAll(specifications, pageable);
    }
    
    public Page<PriceAndExpireProduct> searchByvalueLessThanOrEqualNontificationValue(Pageable pageable){
        Specifications<PriceAndExpireProduct> specifications = Specifications.where(PriceAndExpireProductSpec.OutProduct());
        return priceAndExpireProductRepo.findAll(specifications , pageable);
    }
    
    public Page<PriceAndExpireProduct> searchByvalueLessThanOrEqualNontificationValueAndStatus(Pageable pageable){
    Specifications<PriceAndExpireProduct> specifications = Specifications.where(PriceAndExpireProductSpec.outProductAndStatus());
    return priceAndExpireProductRepo.findAll(specifications , pageable);
    }
}
