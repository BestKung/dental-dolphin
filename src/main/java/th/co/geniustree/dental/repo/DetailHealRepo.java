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
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import th.co.geniustree.dental.model.DetailHeal;

/**
 *
 * @author User
 */
public interface DetailHealRepo extends JpaRepository<DetailHeal, Integer>, JpaSpecificationExecutor<DetailHeal> {

    public Page<DetailHeal> findByStatusIsNull(Pageable pageable);

    public List<DetailHeal> findByStatusIsNull();
}
