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
import th.co.geniustree.dental.model.Doctor;
import th.co.geniustree.dental.model.Staff;
import th.co.geniustree.dental.repo.DoctorRepo;
import th.co.geniustree.dental.spec.DoctorSpec;
import th.co.geniustree.dental.spec.StaffSpec;

/**
 *
 * @author Best
 */
@Service
public class DoctorSearchService {

    @Autowired
    private DoctorRepo doctorRepo;

    public Page<Doctor> searchByName(String keyword, Pageable pageable) {
        Specifications<Doctor> specifications = Specifications.where(DoctorSpec.nameLike("%" + keyword + "%"));
        return doctorRepo.findAll(specifications, pageable);
    }

    public Page<Doctor> searchByEmail(String keyword, Pageable pageable) {
        Specifications<Doctor> specifications = Specifications.where(DoctorSpec.emailLike("%" + keyword + "%"));
        return doctorRepo.findAll(specifications, pageable);
    }

    public Page<Doctor> searchByMobile(String keyword, Pageable pageable) {
        Specifications<Doctor> specifications = Specifications.where(DoctorSpec.mobileLike("%" + keyword + "%"));
        return doctorRepo.findAll(specifications, pageable);
    }

    public Page<Doctor> searchById(Integer keyword, Pageable pageable) {
        Specifications<Doctor> specifications = Specifications.where(DoctorSpec.idWhere(keyword));
        return doctorRepo.findAll(specifications, pageable);
    }
}
