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
import th.co.geniustree.dental.model.Staff;
import th.co.geniustree.dental.repo.StaffRepo;
import th.co.geniustree.dental.spec.StaffSpec;

/**
 *
 * @author Best
 */
@Service
public class StaffSearchService {

    @Autowired
    private StaffRepo staffRepo;

    public Page<Staff> searchByName(String keyword, Pageable pageable) {
        Specifications<Staff> specifications = Specifications.where(StaffSpec.nameLike("%" + keyword + "%"));
        return staffRepo.findAll(specifications, pageable);
    }

    public Page<Staff> searchByEmail(String keyword, Pageable pageable) {
        Specifications<Staff> specifications = Specifications.where(StaffSpec.emailLike("%" + keyword + "%"));
        return staffRepo.findAll(specifications, pageable);
    }

    public Page<Staff> searchByMobile(String keyword, Pageable pageable) {
        Specifications<Staff> specifications = Specifications.where(StaffSpec.mobileLike("%" + keyword + "%"));
        return staffRepo.findAll(specifications, pageable);
    }

    public Page<Staff> searchByPid(String keyword, Pageable pageable) {
        Specifications<Staff> specifications = Specifications.where(StaffSpec.pidLike("%" + keyword + "%"));
        return staffRepo.findAll(specifications, pageable);
    }

    public Page<Staff> searchById(String keyword, Pageable pageable) {
        Specifications<Staff> specifications = Specifications.where(StaffSpec.idWhere(keyword));
        return staffRepo.findAll(specifications, pageable);
    }
}
