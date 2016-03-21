/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.repo;

import java.io.Serializable;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import th.co.geniustree.dental.model.Bill;
import th.co.geniustree.dental.model.OrderBill;
import th.co.geniustree.dental.model.OrderProduct;

/**
 *
 * @author BestKung
 */
public interface OrderProductRepo extends JpaRepository<OrderProduct, Integer>, JpaSpecificationExecutor<OrderProduct> {
    
    public List<OrderProduct> findByBill(Bill bill);
//    public List<OrderProduct> findBy(Bill bill);
}
