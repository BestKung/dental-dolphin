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
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import th.co.geniustree.dental.model.Lot;
import th.co.geniustree.dental.model.PriceAndExpireProduct;

/**
 *
 * @author User
 */
public interface PriceAndExpireProductRepo extends JpaRepository<PriceAndExpireProduct, Integer>, JpaSpecificationExecutor<PriceAndExpireProduct> {

//    public Page<PriceAndExpireProduct> findByValueLessThanOrEqualToNotificationsValue(Integer value , Integer nonValue , Pageable pageable);
    public Page<PriceAndExpireProduct> findByStatusIsNull(Pageable pageable);
     public List<PriceAndExpireProduct> findByStatusIsNull();
    public List<PriceAndExpireProduct> findByLot(Lot lot);
}
