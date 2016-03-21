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
import th.co.geniustree.dental.model.Employee;
import th.co.geniustree.dental.repo.EmployeeRepo;

/**
 *
 * @author BestKung
 */
public class EmailUniqueValidatEmployeeor implements ConstraintValidator<EmployeeEmailUnique, String> {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Override
    public void initialize(EmployeeEmailUnique a) {

    }

    @Override
    public boolean isValid(String t, ConstraintValidatorContext cvc) {
        Employee findByEmailIgnoreCase = employeeRepo.findByEmailIgnoreCase(t);
        if (Strings.isNullOrEmpty(t)) {
            System.out.println("1");
            return true;
        }
        if (findByEmailIgnoreCase != null) {
            if (findByEmailIgnoreCase.getId() != null) {
                System.out.println("2");
                return true;
            }
            return false;
        }
        return true;
    }
}
