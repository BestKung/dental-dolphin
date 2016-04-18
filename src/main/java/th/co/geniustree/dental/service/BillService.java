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
import th.co.geniustree.dental.model.Bill;
import th.co.geniustree.dental.repo.BillRepo;
import th.co.geniustree.dental.spec.BillSpec;

/**
 *
 * @author Jasin007
 */
@Service
public class BillService {

    @Autowired
    private BillRepo billRepo;

    public Page<Bill> searchByDateBill(Date keyword, Pageable pageable) {
        Specifications<Bill> specifications = Specifications.where(BillSpec.dateBillLike(keyword));
        return billRepo.findAll(specifications, pageable);
    }

    public Page<Bill> searchBySumPrice(Double keyword, Pageable pageable) {
        Specifications<Bill> specifications = Specifications.where(BillSpec.sumPriceLike(keyword));
        return billRepo.findAll(specifications, pageable);
    }

    public Page<Bill> searchByid(String keyword, Pageable pageable) {
        Specifications<Bill> specifications = Specifications.where(BillSpec.idLike("%" + keyword));
        return billRepo.findAll(specifications, pageable);
    }

}
