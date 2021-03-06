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
import th.co.geniustree.dental.model.DetailHeal;
import th.co.geniustree.dental.model.Patient;

/**
 *
 * @author User
 */
public interface DetailHealRepo extends JpaRepository<DetailHeal, String>, JpaSpecificationExecutor<DetailHeal> {

    public Page<DetailHeal> findByStatusIsNull(Pageable pageable);

    public List<DetailHeal> findByStatusIsNull();

    public Page<DetailHeal> findAllByPatientOrderByDateHealDesc(Patient patient, Pageable pageable);
}
