/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.repo;

import java.util.Date;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import th.co.geniustree.dental.model.Lot;

/**
 *
 * @author User
 */
public interface LotRepo extends JpaRepository<Lot, Integer>, JpaSpecificationExecutor<Lot> {

//    public Lot findByDateIn(Date dateIn);

    public Page<Lot> findByDateOutIsNull(Pageable pageable);

    public List<Lot> findByDateOutIsNull();
    
}
