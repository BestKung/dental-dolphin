/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import th.co.geniustree.dental.model.Department;
import th.co.geniustree.dental.repo.DepartmentRepo;
import th.co.geniustree.dental.spec.DepartmentSpec;

/**
 *
 * @author Jasin007
 */
@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepo departmentRepo;

    public Page<Department> searchByName(String keyword, Pageable pageable) {
        Specifications<Department> specifications = Specifications.where(DepartmentSpec.namelike("%" + keyword + "%"));
        return departmentRepo.findAll(specifications, pageable);
    }

    public Page<Department> searchById(String keyword, Pageable pageable) {
        Specifications<Department> specifications = Specifications.where(DepartmentSpec.idWhere(Integer.parseInt(keyword)));
        return departmentRepo.findAll(specifications, pageable);
    }
}
