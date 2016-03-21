/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import th.co.geniustree.dental.model.Employee;
import th.co.geniustree.dental.repo.EmployeeRepo;
import th.co.geniustree.dental.spec.EmployeeSpec;

/**
 *
 * @author Jasin007
 */
@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    public Page<Employee> searchByName(String keyword, Pageable pageable) {
        Specifications<Employee> specifications = Specifications.where(EmployeeSpec.nameLike("%"+keyword+"%"));
        return employeeRepo.findAll(specifications, pageable);
    }
    
    public Page<Employee> searchByEmail(String keyword , Pageable pageable){
      Specifications<Employee> specifications = Specifications.where(EmployeeSpec.emailLike("%"+keyword+"%"));
      return employeeRepo.findAll(specifications , pageable);
    }
    
     private Sort sortByIdAsc() {
        return new Sort(Sort.Direction.DESC, "id");
    }
}
