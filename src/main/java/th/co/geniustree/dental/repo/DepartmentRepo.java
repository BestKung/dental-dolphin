/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import th.co.geniustree.dental.model.Department;

/**
 *
 * @author Best
 */
public interface DepartmentRepo extends JpaRepository<Department, Integer>,JpaSpecificationExecutor<Department>{
    
    public Department findByName(String name);
 
    public Department findByNameIgnoreCase(String value);
   
    
}
