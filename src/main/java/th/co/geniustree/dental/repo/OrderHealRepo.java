/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.repo;

import java.io.Serializable;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import th.co.geniustree.dental.model.OrderHeal;

/**
 *
 * @author User
 */
public interface OrderHealRepo extends JpaRepository<OrderHeal, Integer> {

//    public Page<OrderHeal> findByStatusIsNull(Pageable pageable);
//
//    public List<OrderHeal> findByStatusIsNull();
}
