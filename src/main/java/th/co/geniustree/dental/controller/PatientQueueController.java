/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import java.text.ParseException;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import th.co.geniustree.dental.model.Appointment;
import th.co.geniustree.dental.model.Patient;
import th.co.geniustree.dental.model.PatientQueue;
import th.co.geniustree.dental.model.PatientQueueGenerateCode;
import th.co.geniustree.dental.model.Room;
import th.co.geniustree.dental.model.SearchData;
import th.co.geniustree.dental.repo.AppointmentRepo;
import th.co.geniustree.dental.repo.PatientQueueGenerateCodeRepo;
import th.co.geniustree.dental.repo.PatientQueueRepo;
import th.co.geniustree.dental.repo.PatientRepo;

/**
 *
 * @author BestKung
 */
@RestController
public class PatientQueueController {

    @Autowired
    private PatientQueueRepo patientQueueRepo;

    @Autowired
    private PatientRepo patientRepo;

    @Autowired
    private PatientQueueGenerateCodeRepo patientQueueGenerateCodeRepo;

    @Autowired
    private AppointmentRepo appointmentRepo;

    @RequestMapping(value = "/searchpatientbyhn", method = RequestMethod.POST)
    public Patient searchPatientByHn(@RequestBody Patient patient) {
        System.out.println("---------------------------------------------------->" + patient.getId());
        return patientRepo.findById(patient.getId());
    }

    @RequestMapping(value = "/savequeue", method = RequestMethod.POST)
    public void saveQueue(@RequestBody PatientQueue patientQueue) {
        PatientQueueGenerateCode code = patientQueueGenerateCodeRepo.save(new PatientQueueGenerateCode());
//        if (patientQueue.getHasAppointment() != null) {
//            patientQueue.setQueueId(code.getIdGen() + "");
//        } else {
        patientQueue.setQueueId(code.getIdGen() + "");
//        }
        patientQueueRepo.save(patientQueue);
        patientQueueGenerateCodeRepo.delete(code);
    }

    ;
    
    @RequestMapping(value = "/findappointmentqueue", method = RequestMethod.POST)
    public Appointment findAppointmentQueue(@RequestBody SearchData searchData) throws ParseException {
        if ("HN".equals(searchData.getSearchBy())) {
            System.out.println("------------------------------------------------------>" + searchData.getKeyword());
//            Date start = new SimpleDateFormat().parse(new SimpleDateFormat("YYYY-MM-dd", Locale.US).format(new Date()));
//            Date end = new SimpleDateFormat().parse(new SimpleDateFormat("YYYY-MM-dd", Locale.US).format(new Date()));;
            System.out.println("--------------------------------------------------------------->" + patientRepo.findOne(searchData.getKeyword()).getName());
            return appointmentRepo.findByPatientAndAppointDayBetween(patientRepo.findOne(searchData.getKeyword()), new Date(), new Date());
        } else {
            return appointmentRepo.findOne(searchData.getKeyword());
        }
    }

    @RequestMapping(value = "/searchpatientqueue", method = RequestMethod.POST)
    public Page<PatientQueue> searchPatientQueue(@RequestBody Room room, Pageable pageable) {
        System.out.println("--------------------------------------------------------------------------" + room.getDoctor().getId());
        return patientQueueRepo.findAllByDoctorOrderByQueueIdAsc(room.getDoctor(), pageable);
    }

    @RequestMapping(value = "/deletequeue", method = RequestMethod.POST)
    public void deleteQueue(@RequestBody PatientQueue patientQueue) {
        patientQueueRepo.delete(patientQueue);
    }

}
