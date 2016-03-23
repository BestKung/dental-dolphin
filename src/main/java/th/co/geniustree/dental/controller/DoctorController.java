/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartRequest;
import th.co.geniustree.dental.model.Doctor;
import th.co.geniustree.dental.model.DoctorPicture;
import th.co.geniustree.dental.model.SearchData;
import th.co.geniustree.dental.model.StaffPicture;
import th.co.geniustree.dental.repo.DoctorRepo;
import th.co.geniustree.dental.repo.StaffPictureRepo;
import th.co.geniustree.dental.service.DoctorSearchService;
import th.co.geniustree.dental.spec.DoctorSpec;

/**
 *
 * @author Best
 */
@RestController
public class DoctorController {

    @Autowired
    private DoctorRepo doctorRepo;

    @Autowired
    private DoctorSearchService doctorSearchService;
    
    @Autowired
    private StaffPictureRepo pictureRepo;

    @RequestMapping(value = "/savedoctor", method = RequestMethod.POST)
    private void saveDoctor(@Validated @RequestBody Doctor doctor) {
         if(doctor.getDoctorPicture() == null){
        StaffPicture picture = pictureRepo.findOne(1);
        DoctorPicture doctorPicture = new DoctorPicture();
        doctorPicture.setContent(picture.getContentImage());
        doctorPicture.setMimeType(picture.getType());
        doctorPicture.setName(picture.getName());
        doctor.setDoctorPicture(doctorPicture);
        }
        doctorRepo.save(doctor);
    }

    @RequestMapping(value = "/selectpicture", method = RequestMethod.POST)
    private DoctorPicture selectPicture(MultipartRequest file) throws IOException {
        DoctorPicture doctorPicture = new DoctorPicture();
        doctorPicture.setName(file.getFile("file").getOriginalFilename());
        doctorPicture.setContent(file.getFile("file").getBytes());
        doctorPicture.setMimeType(file.getFile("file").getName());
        return doctorPicture;
    }

    @RequestMapping(value = "/getdoctor", method = RequestMethod.GET)
    private Page<Doctor> getDoctor(Pageable pageable) {
        return doctorRepo.findAll(pageable);
    }

    @RequestMapping(value = "/searchdoctor", method = RequestMethod.POST)
    private Page<Doctor> searchDoctor(@RequestBody SearchData searchData, Pageable pageable) {
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        System.out.println("-------------------------------->" + keyword);
        System.out.println("-------------------------------->" + searchBy);
        Page<Doctor> doctors = null;
        if ("อีเมลล์".equals(searchBy)) {
            System.out.println("-------------------------------->mail");
            doctors = doctorSearchService.searchByEmail(keyword, pageable);
        }
        if ("ชื่อ".equals(searchBy)) {
            System.out.println("-------------------------------->name");
            doctors = doctorSearchService.searchByName(keyword, pageable);
        }
        if ("เบอร์โทร".equals(searchBy)) {
            System.out.println("-------------------------------->mobile");
            doctors = doctorSearchService.searchByMobile(keyword, pageable);
        }
        if ("ลำดับ".equals(searchBy)) {
            System.out.println("-------------------------------->mobile");
            doctors = doctorSearchService.searchById(Integer.parseInt(keyword), pageable);
        }
        return doctors;
    }

    @RequestMapping(value = "/countdoctor", method = RequestMethod.GET)
    private Long countDoctor() {
        return doctorRepo.count();
    }

    @RequestMapping(value = "/countsearchdoctor", method = RequestMethod.POST)
    private Long countSearchDoctor(@RequestBody SearchData searchData) {
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        Long count = null;
        if ("อีเมลล์".equals(searchBy)) {
            System.out.println("-------------------------------->mail");
            count = doctorRepo.count(DoctorSpec.emailLike("%" + keyword + "%"));
        }
        if ("ชื่อ".equals(searchBy)) {
            System.out.println("-------------------------------->name");
            count = doctorRepo.count(DoctorSpec.nameLike("%" + keyword + "%"));
        }
        if ("เบอร์โทร".equals(searchBy)) {
            System.out.println("-------------------------------->mobile");
            count = doctorRepo.count(DoctorSpec.mobileLike("%" + keyword + "%"));
        }
        if ("ลำดับ".equals(searchBy)) {
            System.out.println("-------------------------------->mobile");
            count = doctorRepo.count(DoctorSpec.idWhere(Integer.parseInt(keyword)));
        }
        return count;
    }

    @RequestMapping(value = "/deletedoctor", method = RequestMethod.POST)
    private void deleteDoctor(@RequestBody Doctor doctor) {
        doctorRepo.delete(doctor);
    }

}
