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
import th.co.geniustree.dental.model.Patient;
import th.co.geniustree.dental.repo.PatientRepo;
import th.co.geniustree.dental.spec.PatientSpec;

/**
 *
 * @author Best
 */
@Service
public class PatientSearchService {

    @Autowired
    private PatientRepo patientRepo;

    public Page<Patient> searchByName(String keyword, Pageable pageable) {
        Specifications<Patient> specifications = Specifications.where(PatientSpec.nameLike("%" + keyword + "%"));
        return patientRepo.findAll(specifications, pageable);
    }

    public Page<Patient> searchByEmail(String keyword, Pageable pageable) {
        Specifications<Patient> specifications = Specifications.where(PatientSpec.emailLike("%" + keyword + "%"));
        return patientRepo.findAll(specifications, pageable);
    }

    public Page<Patient> searchByPid(String keyword, Pageable pageable) {
        Specifications<Patient> specifications = Specifications.where(PatientSpec.pidLike("%" + keyword + "%"));
        return patientRepo.findAll(specifications, pageable);
    }
}
