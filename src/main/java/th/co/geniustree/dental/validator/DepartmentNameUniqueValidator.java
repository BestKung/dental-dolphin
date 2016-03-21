/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.validator;

import com.google.common.base.Strings;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import th.co.geniustree.dental.model.Department;
import th.co.geniustree.dental.repo.DepartmentRepo;

/**
 *
 * @author BestKung
 */
public class DepartmentNameUniqueValidator implements ConstraintValidator<DepartmentNameUnique, String> {

    @Autowired
    private DepartmentRepo departmentRepo;

    @Override
    public void initialize(DepartmentNameUnique a) {

    }

    @Override
    public boolean isValid(String t, ConstraintValidatorContext cvc) {
        Department department = departmentRepo.findByNameIgnoreCase(t);
        if (Strings.isNullOrEmpty(t)) {
            System.out.println("1");
            return true;
        }
        if (department != null) {
            if (department.getId() != null) {
                System.out.println("2");
                return true;
            }
            return false;
        }
        return true;
    }

}
