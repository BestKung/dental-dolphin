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
import th.co.geniustree.dental.model.TmpOrder;

/**
 *
 * @author BestKung
 */
public interface TmpOrderRepo extends JpaRepository<TmpOrder, Integer> {

    public Page<TmpOrder> findAllByDoctorId(String user, Pageable pageable);

    public List<TmpOrder> findAllByDoctorId(String user);
}
