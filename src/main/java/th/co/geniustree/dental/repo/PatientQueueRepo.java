/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.repo;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import th.co.geniustree.dental.model.Doctor;
import th.co.geniustree.dental.model.PatientQueue;

/**
 *
 * @author BestKung
 */
public interface PatientQueueRepo extends JpaRepository<PatientQueue, String> {

    public Page<PatientQueue> findAllByDoctorAndHealStatusIsNullOrderByQueueIdAsc(Doctor doctor, Pageable pageable);

    public PatientQueue findByHealStatus(String doctorId);

    public Page<PatientQueue> findAllByDayQueue(String string, Pageable pageable);

}
