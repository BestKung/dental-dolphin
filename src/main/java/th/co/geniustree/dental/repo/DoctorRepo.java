/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import th.co.geniustree.dental.model.Doctor;

/**
 *
 * @author Best
 */
public interface DoctorRepo extends JpaRepository<Doctor, String>, JpaSpecificationExecutor<Doctor> {

    public Doctor findByEmail(String email);
    
    public Doctor findByPid(String pid);

    public Doctor findById(String id);

}
