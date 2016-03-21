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
import th.co.geniustree.dental.model.Lot;
import th.co.geniustree.dental.repo.LotRepo;
import th.co.geniustree.dental.spec.LotSpec;

/**
 *
 * @author Jasin007
 */
@Service
public class LotService {
    
    @Autowired
    private LotRepo lotRepo;
    
    public Page<Lot> searchByNameStaffReam(String keyword,Pageable pageable){
        Specifications<Lot> specifications = Specifications.where(LotSpec.nameStaffReamLike("%"+ keyword + "%"));
        return lotRepo.findAll(specifications, pageable);
    }
    
     public Page<Lot> searchByDateIn(Date keyword,Pageable pageable){
        Specifications<Lot> specifications = Specifications.where(LotSpec.dateInBetween(keyword));
        return lotRepo.findAll(specifications, pageable);
    }
     
      public Page<Lot> searchByDateOut(Date keyword,Pageable pageable){
        Specifications<Lot> specifications = Specifications.where(LotSpec.dateOutBetween(keyword));
        return lotRepo.findAll(specifications, pageable);
    }
}
