/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import th.co.geniustree.dental.model.Authority;
import th.co.geniustree.dental.repo.AuthorityRepo;

/**
 *
 * @author Best
 */
@RestController
public class AuthorityController {
    @Autowired
    private AuthorityRepo authorityRepo;
    
    @RequestMapping(value = "/getauthority" , method = RequestMethod.GET)
    public Page<Authority> getAuthority(Pageable pageable){
    return authorityRepo.findAll(pageable);
    }
}
