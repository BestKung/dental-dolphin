/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import th.co.geniustree.dental.model.Patient;

/**
 *
 * @author Best
 */
public interface PatientRepo extends JpaRepository<Patient, Integer>, JpaSpecificationExecutor<Patient> {

    public Page<Patient> findAllByOrderByIdDesc(Pageable pageable);

    public Patient findByHn(String hn);
}
