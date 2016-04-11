/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import th.co.geniustree.dental.model.Patient;
import th.co.geniustree.dental.model.PatientQueue;
import th.co.geniustree.dental.model.PatientQueueGenerateCode;
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

    @RequestMapping(value = "/searchpatientbyhn", method = RequestMethod.POST)
    public Patient searchPatientByHn(@RequestBody Patient patient) {
        return patientRepo.findById(patient.getId());
    }

    @RequestMapping(value = "/savequeue", method = RequestMethod.POST)
    public void saveQueue(@RequestBody PatientQueue patientQueue) {
        PatientQueueGenerateCode code = patientQueueGenerateCodeRepo.save(new PatientQueueGenerateCode());
        patientQueue.setQueueId(code.getIdGen() + "");
        patientQueueRepo.save(patientQueue);
        patientQueueGenerateCodeRepo.delete(code);
    }
;
}
