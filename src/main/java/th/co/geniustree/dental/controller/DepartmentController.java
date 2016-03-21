/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import th.co.geniustree.dental.model.Department;
import th.co.geniustree.dental.model.SearchData;
import th.co.geniustree.dental.repo.DepartmentRepo;
import th.co.geniustree.dental.service.DepartmentService;
import th.co.geniustree.dental.spec.DepartmentSpec;

/**
 *
 * @author Best
 */
@RestController
public class DepartmentController {
    
    @Autowired
    private DepartmentRepo departmentRepo;
    
    @Autowired
    private DepartmentService departmentService;
    
    @RequestMapping(value = "/savedepartment", method = RequestMethod.POST)
    public void saveDepartment(@Validated @RequestBody Department department) {
        departmentRepo.save(department);
    }
    
    @RequestMapping(value = "/getdepartment", method = RequestMethod.GET)
    public Page<Department> getDepartment(Pageable pageable) {
        return departmentRepo.findAll(pageable);
    }
    
    @RequestMapping(value = "/deletedepartment", method = RequestMethod.POST)
    public void deleteDepartment(@RequestBody Department department) {
        departmentRepo.delete(department.getId());
    }
    
    @RequestMapping(value = "/totaldepartment", method = RequestMethod.GET)
    public Long getTotalDepartment() {
        return departmentRepo.count();
    }
    
    @RequestMapping(value = "/getdepartment/searchdepartment", method = RequestMethod.POST)
    public Page<Department> searchDepartment(@RequestBody SearchData searchData, Pageable pageable) {
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        Page<Department> departments = null;
        if ("ชื่อเเผนก".equals(searchBy)) {
            departments = departmentService.searchByName(keyword, pageable);
        }
        if ("ลำดับ".equals(searchBy)) {
            departments = departmentService.searchById(keyword, pageable);
        }
        return departments;
    }
    
    @RequestMapping(value = "/countsearchdepartment", method = RequestMethod.POST)
    public long countSearchUnitProduct(@RequestBody SearchData searchData) {
        long count = 0;
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        if ("ชื่อเเผนก".equals(searchBy)) {
            count = departmentRepo.count(DepartmentSpec.namelike("%" + keyword + "%"));
        }
        if ("ลำดับ".equals(searchBy)) {
            count = departmentRepo.count(DepartmentSpec.idWhere(Integer.parseInt(keyword)));
        }
        return count;
    }
    
}
