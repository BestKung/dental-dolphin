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
import th.co.geniustree.dental.model.Appointment;
import th.co.geniustree.dental.repo.AppointmentRepo;
import th.co.geniustree.dental.spec.AppointmentSpec;

/**
 *
 * @author Best
 */
@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepo appointmentRepo;

    public Page<Appointment> searchByDoctorName(String keyword, Pageable pageable) {
        Specifications<Appointment> specifications = Specifications.where(AppointmentSpec.nameDoctorLike("%" + keyword + "%"));
        return appointmentRepo.findAll(specifications, pageable);
    }

    public Page<Appointment> searchByPatientName(String keyword, Pageable pageable) {
        Specifications<Appointment> specifications = Specifications.where(AppointmentSpec.namePatientLike("%" + keyword + "%"));
        return appointmentRepo.findAll(specifications, pageable);
    }

    public Page<Appointment> searchByMobile(String keyword, Pageable pageable) {
        Specifications<Appointment> specifications = Specifications.where(AppointmentSpec.mobileLike("%" + keyword + "%"));
        return appointmentRepo.findAll(specifications, pageable);
    }

    public Page<Appointment> searchByAppointmentDay(Date keyword, Pageable pageable) {
        Specifications<Appointment> specifications = Specifications.where(AppointmentSpec.appointmentDate(keyword));
        return appointmentRepo.findAll(specifications, pageable);
    }

    public Page<Appointment> searchId(String keyword, Pageable pageable) {
        Specifications<Appointment> specifications = Specifications.where(AppointmentSpec.idLike("%" + keyword + "%"));
        return appointmentRepo.findAll(specifications, pageable);
    }
}
