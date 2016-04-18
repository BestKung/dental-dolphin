/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import th.co.geniustree.dental.model.Employee;
import th.co.geniustree.dental.repo.EmployeeRepo;

/**
 *
 * @author Best
 */
@Service
public class CustomUserService implements UserDetailsService {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        System.out.println("-------------------------------------------------------------------->" + email);
        String str[] = email.split("##");
        Employee employee = employeeRepo.findByEmail(str[0]);
        if (str.length > 1) {
            if ("forgot".equals(str[1])) {
                employee.setForgotPassword(null);
                employeeRepo.save(employee);
            }
        }
        if (employee == null) {
            throw new UsernameNotFoundException("Email Not Fond!");
        }
        return employee;
    }
}
