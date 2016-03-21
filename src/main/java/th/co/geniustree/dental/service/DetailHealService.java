/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.service;

import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import th.co.geniustree.dental.model.DetailHeal;
import th.co.geniustree.dental.repo.DetailHealRepo;
import th.co.geniustree.dental.spec.DetailHealSpec;

/**
 *
 * @author Jasin007
 */
@Service
public class DetailHealService {

    @Autowired
    private DetailHealRepo detailHealRepo;

    public Page<DetailHeal> searchByPatient(String keyword, Pageable pageable) {
        Specifications<DetailHeal> specifications = Specifications.where(DetailHealSpec.patientLike("%" + keyword + "%"));
        return detailHealRepo.findAll(specifications, pageable);
    }

    public Page<DetailHeal> searchByDoctor(String keyword, Pageable pageable) {
        Specifications<DetailHeal> specifications = Specifications.where(DetailHealSpec.doctorLike("%" + keyword + "%"));
        return detailHealRepo.findAll(specifications, pageable);
    }

    public Page<DetailHeal> searchByDateHeal(Date keyword, Pageable pageable) {
        Specifications<DetailHeal> specifications = Specifications.where(DetailHealSpec.dateHealLike(keyword));
        return detailHealRepo.findAll(specifications, pageable);
    }

    //========================================================================================================================
    public Page<DetailHeal> searchByPatientForBill(String keyword, Pageable pageable) {
        Specifications<DetailHeal> specifications = Specifications.where(DetailHealSpec.patientLikeForBill("%" + keyword + "%"));
        return detailHealRepo.findAll(specifications, pageable);
    }

    public Page<DetailHeal> searchByDoctorForBill(String keyword, Pageable pageable) {
        Specifications<DetailHeal> specifications = Specifications.where(DetailHealSpec.doctorLikeForBill("%" + keyword + "%"));
        return detailHealRepo.findAll(specifications, pageable);
    }

    public Page<DetailHeal> searchByDateHealForBill(Date keyword, Pageable pageable) {
        Specifications<DetailHeal> specifications = Specifications.where(DetailHealSpec.dateHealLikeForBill(keyword));
        return detailHealRepo.findAll(specifications, pageable);
    }
}
