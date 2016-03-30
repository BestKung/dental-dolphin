/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartRequest;
import th.co.geniustree.dental.model.ClinicInformation;
import th.co.geniustree.dental.repo.ClinicInformationRepo;

/**
 *
 * @author BestKung
 */
@RestController
public class ClinicInformationController {

    @Autowired
    private ClinicInformationRepo clinicInformationRepo;

    private byte[] imageContent;

    @RequestMapping(value = "/saveclinicimage", method = RequestMethod.POST)
    public void logoClinic(MultipartRequest file) throws IOException {
        imageContent = file.getFile("file").getBytes();
    }

    @RequestMapping(value = "/saveClinicInformation", method = RequestMethod.POST)
    public void saveClinic(@RequestBody ClinicInformation clinicInformation) {
        clinicInformation.setLogo(imageContent);
        clinicInformationRepo.save(clinicInformation);
    }

    @RequestMapping(value = "/getclinic", method = RequestMethod.GET)
    public ClinicInformation getClinic() {
        return clinicInformationRepo.findOne(1);
    }

}
