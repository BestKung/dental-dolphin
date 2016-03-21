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
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import th.co.geniustree.dental.model.Appointment;

/**
 *
 * @author Best
 */
public interface AppointmentRepo extends JpaRepository<Appointment, Integer>, JpaSpecificationExecutor<Appointment> {

    public List<Appointment> findByStatus(String keyword);

    public Page<Appointment> findByStatus(String keyword, Pageable pageable);

    public Page<Appointment> findByAppointDay(Date keyword, Pageable pageable);
    
    public List<Appointment> findByAppointDayAndStatus(Date day , String keyword);
}
