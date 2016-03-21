/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import th.co.geniustree.dental.model.Employee;
import th.co.geniustree.dental.model.TypeOfMedical;
import th.co.geniustree.dental.repo.TypeOfMedicalRepo;
import th.co.geniustree.dental.spec.TypeOfMedicalSpec;

/**
 *
 * @author Best
 */
@RestController
public class TypeOfMedicalController {

    @Autowired
    private TypeOfMedicalRepo typeOfMedicalRepo;

    @RequestMapping(value = "/savetypeofmedical", method = RequestMethod.POST)
    private void saveTypeOfMedical(@RequestBody TypeOfMedical typeOfMedical) {
        typeOfMedicalRepo.save(typeOfMedical);
    }

    @RequestMapping(value = "/deletetypeofmedical", method = RequestMethod.POST)
    private void deleteTypeOfMedical(@RequestBody TypeOfMedical typeOfMedical) {
        typeOfMedicalRepo.delete(typeOfMedical);
    }

    @RequestMapping(value = "/gettypeofmedical", method = RequestMethod.POST)
    private Page<TypeOfMedical> getTypeOfMedical(@RequestBody Employee employee, Pageable pageable) {
        if (employee != null) {
            return typeOfMedicalRepo.findByUserName(employee.getNameTh(), pageable);
        }
        return null;
    }

    @RequestMapping(value = "/counttypeofmedical", method = RequestMethod.POST)
    private long countTypeOfMedical(@RequestBody String keyword) {
        return typeOfMedicalRepo.count(TypeOfMedicalSpec.userName(keyword));
    }

}
