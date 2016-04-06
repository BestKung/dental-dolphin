/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import th.co.geniustree.dental.model.OrderMedicalSupplie;

/**
 *
 * @author BestKung
 */
public interface OrderRepo extends JpaRepository<OrderMedicalSupplie, Integer> {

    public Page<OrderMedicalSupplie> findAllById(Integer id, Pageable pageable);
}