/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.repo;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import th.co.geniustree.dental.model.MedicalSupplies;
import th.co.geniustree.dental.model.OrderMedicalSupplie;

/**
 *
 * @author BestKung
 */
public interface MedicalSuppliesRepo extends JpaRepository<MedicalSupplies, Integer> {

    public Page<MedicalSupplies> findAllByOrderMedicalSupplie(OrderMedicalSupplie medicalSupplie, Pageable pageable);

    public List<MedicalSupplies> findAllByOrderMedicalSupplie(OrderMedicalSupplie medicalSupplie);
}
