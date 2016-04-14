/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.repo;

import java.util.Date;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import th.co.geniustree.dental.model.Appointment;
import th.co.geniustree.dental.model.Patient;

/**
 *
 * @author Best
 */
public interface AppointmentRepo extends JpaRepository<Appointment, String>, JpaSpecificationExecutor<Appointment> {

    public List<Appointment> findByStatus(String keyword);

    public Page<Appointment> findByStatus(String keyword, Pageable pageable);

    public Page<Appointment> findByAppointDay(Date keyword, Pageable pageable);

    public List<Appointment> findByAppointDayAndStatus(Date day, String keyword);

    public Appointment findByPatient(String hn);

    public Appointment findByPatientAndAppointDayBetween(Patient hn, Date start, Date end);

    public Page<Appointment> findAllByOrderByIdAsc(Specification specification, Pageable pageable);
}
