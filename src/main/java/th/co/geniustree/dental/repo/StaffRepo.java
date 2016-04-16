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
import th.co.geniustree.dental.model.Department;
import th.co.geniustree.dental.model.Staff;

/**
 *
 * @author Best
 */
public interface StaffRepo extends JpaRepository<Staff, Integer>, JpaSpecificationExecutor<Staff> {

    public Staff findByEmail(String email);

    public Staff findByPid(String pid);
    
    public Page<Staff> findByDepartment(Department department, Pageable pageable);

    public Page<Staff> findAllByOrderByIdDesc(Pageable pageable);

}
