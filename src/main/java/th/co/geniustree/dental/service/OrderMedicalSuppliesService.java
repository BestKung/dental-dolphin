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
import th.co.geniustree.dental.model.OrderMedicalSupplie;
import th.co.geniustree.dental.repo.OrderMedicalSuppliesRepo;
import th.co.geniustree.dental.spec.OrderMedicalSuppliesSpec;

/**
 *
 * @author BestKung
 */
@Service
public class OrderMedicalSuppliesService {

    @Autowired
    private OrderMedicalSuppliesRepo medicalSuppliesRepo;

    public Page<OrderMedicalSupplie> searchByid(String keyword, Pageable pageable) {
        Specifications<OrderMedicalSupplie> specifications = Specifications.where(OrderMedicalSuppliesSpec.idlLike("%" + keyword));
        return medicalSuppliesRepo.findAll(specifications, pageable);
    }
}
