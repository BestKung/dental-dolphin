/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartRequest;
import th.co.geniustree.dental.App;
import th.co.geniustree.dental.model.MedicalHistory;
import th.co.geniustree.dental.model.Patient;
import th.co.geniustree.dental.model.PatientGennerateCode;
import th.co.geniustree.dental.model.PatientPictureAfter;
import th.co.geniustree.dental.model.PatientPictureBefore;
import th.co.geniustree.dental.model.PatientPictureCurrent;
import th.co.geniustree.dental.model.PatientPictureXray;
import th.co.geniustree.dental.model.SearchData;
import th.co.geniustree.dental.model.StaffPicture;
import th.co.geniustree.dental.repo.ClinicInformationRepo;
import th.co.geniustree.dental.repo.MedicalHistoryRepo;
import th.co.geniustree.dental.repo.PatientGennerateCodeRepo;
import th.co.geniustree.dental.repo.PatientRepo;
import th.co.geniustree.dental.repo.StaffPictureRepo;
import th.co.geniustree.dental.service.PatientSearchService;
import th.co.geniustree.dental.spec.PatientSpec;

/**
 *
 * @author Best
 */
@RestController
public class PatientController {

    @Autowired
    private PatientRepo patientRepo;

    @Autowired
    private MedicalHistoryRepo medicalHistoryRepo;

    @Autowired
    private PatientSearchService patientSearchService;

    @Autowired
    private StaffPictureRepo pictureRepo;

    @Autowired
    private ClinicInformationRepo clinicInformationRepo;

    @Autowired
    private PatientGennerateCodeRepo gennerateCodeRepo;

    @RequestMapping(value = "/getmedicalhistory", method = RequestMethod.GET)
    private Page<MedicalHistory> getmedicalHistory(Pageable pageable) {
        return medicalHistoryRepo.findAll(pageable);
    }

    @RequestMapping(value = "/savepatient", method = RequestMethod.POST)
    private void savePatient(@Validated @RequestBody Patient patient) {
        if (patient.getPatientPictureXray() == null) {
            StaffPicture picture = pictureRepo.findOne(1);
            PatientPictureXray patientPictureXray = new PatientPictureXray();
            patientPictureXray.setContentXrayFilm(picture.getContentImage());
            patientPictureXray.setMimeTypeXrayFilm(picture.getType());
            patientPictureXray.setNameXrayFilm(picture.getName());
            patient.setPatientPictureXray(patientPictureXray);
        }
        if (patient.getPatientPictureAfter() == null) {
            StaffPicture picture = pictureRepo.findOne(1);
            PatientPictureAfter patientPictureAfter = new PatientPictureAfter();
            patientPictureAfter.setContentAfter(picture.getContentImage());
            patientPictureAfter.setMimeTypeAfter(picture.getType());
            patientPictureAfter.setNameAfter(picture.getName());
            patient.setPatientPictureAfter(patientPictureAfter);
        }
        if (patient.getPatientPictureCurrent() == null) {
            StaffPicture picture = pictureRepo.findOne(1);
            PatientPictureCurrent patientPictureCurrent = new PatientPictureCurrent();
            patientPictureCurrent.setContentCurrent(picture.getContentImage());
            patientPictureCurrent.setMimeTypeCurrent(picture.getType());
            patientPictureCurrent.setNameCurrent(picture.getName());
            patient.setPatientPictureCurrent(patientPictureCurrent);
        }
        if (patient.getPatientPictureBefore() == null) {
            StaffPicture picture = pictureRepo.findOne(1);
            PatientPictureBefore patientPictureBefore = new PatientPictureBefore();
            patientPictureBefore.setContentBefore(picture.getContentImage());
            patientPictureBefore.setMimeTypeBefore(picture.getType());
            patientPictureBefore.setNameBefore(picture.getName());
            patient.setPatientPictureBefore(patientPictureBefore);
        }
        if (patient.getId() != null) {
            patientRepo.save(patient);
        } else {
            PatientGennerateCode gennerateCode = gennerateCodeRepo.save(new PatientGennerateCode());
            int idLength = gennerateCode.getId().toString().length();
            String strId = gennerateCode.getId().toString();
            for (int i = idLength; i <= 4; i++) {
                strId = 0 + strId;
            }
            patient.setId("HN" + strId + "-" + new SimpleDateFormat("YY", new Locale("th", "TH")).format(new Date()));
            patientRepo.save(patient);
        }
    }

    @RequestMapping(value = "/savepatientpicturexray", method = RequestMethod.POST)
    private PatientPictureXray savePatientPictureXray(MultipartRequest multipartRequest) throws IOException {
        PatientPictureXray picture = new PatientPictureXray();
        picture.setNameXrayFilm(multipartRequest.getFile("xray").getOriginalFilename());
        picture.setContentXrayFilm(multipartRequest.getFile("xray").getBytes());
        picture.setMimeTypeXrayFilm(multipartRequest.getFile("xray").getName());

        return picture;
    }

    @RequestMapping(value = "/savepatientpicturebefore", method = RequestMethod.POST)
    private PatientPictureBefore savePatientPictureBefore(MultipartRequest multipartRequest) throws IOException {
        PatientPictureBefore picture = new PatientPictureBefore();
        picture.setNameBefore(multipartRequest.getFile("before").getOriginalFilename());
        picture.setContentBefore(multipartRequest.getFile("before").getBytes());
        picture.setMimeTypeBefore(multipartRequest.getFile("before").getName());

        return picture;
    }

    @RequestMapping(value = "/savepatientpicturecurrent", method = RequestMethod.POST)
    private PatientPictureCurrent savePatientPictureCurrent(MultipartRequest multipartRequest) throws IOException {
        PatientPictureCurrent picture = new PatientPictureCurrent();
        picture.setNameCurrent(multipartRequest.getFile("current").getOriginalFilename());
        picture.setContentCurrent(multipartRequest.getFile("current").getBytes());
        picture.setMimeTypeCurrent(multipartRequest.getFile("current").getName());

        return picture;
    }

    @RequestMapping(value = "/savepatientpictureafter", method = RequestMethod.POST)
    private PatientPictureAfter savePatientPictureAfter(MultipartRequest multipartRequest) throws IOException {
        PatientPictureAfter picture = new PatientPictureAfter();
        picture.setNameAfter(multipartRequest.getFile("after").getOriginalFilename());
        picture.setContentAfter(multipartRequest.getFile("after").getBytes());
        picture.setMimeTypeAfter(multipartRequest.getFile("after").getName());

        return picture;
    }

    @RequestMapping(value = "/getpatient", method = RequestMethod.GET)
    private Page<Patient> getPatient(Pageable pageable) {
        return patientRepo.findAll(pageable);
    }

    @RequestMapping(value = "/searchpatient", method = RequestMethod.POST)
    private Page<Patient> searchPatient(@RequestBody SearchData searchData, Pageable pageable) {
        String searchBy = searchData.getSearchBy();
        String keyword = searchData.getKeyword();
        Page<Patient> patients = null;
        if ("ชื่อ".equals(searchBy)) {
            patients = patientSearchService.searchByName(keyword, pageable);
        }
        if ("อีเมลล์".equals(searchBy)) {
            patients = patientSearchService.searchByEmail(keyword, pageable);
        }
        if ("รหัสประชาชน".equals(searchBy)) {
            patients = patientSearchService.searchByPid(keyword, pageable);
        }
        return patients;
    }

    @RequestMapping(value = "/countpatient", method = RequestMethod.GET)
    private Long countPatient() {
        return patientRepo.count();
    }

    @RequestMapping(value = "/countsearchpatient", method = RequestMethod.POST)
    private Long countSearchPatient(@RequestBody SearchData searchData) {
        String searchBy = searchData.getSearchBy();
        String keyword = searchData.getKeyword();
        Long count = null;
        if ("ชื่อ".equals(searchBy)) {
            count = patientRepo.count(PatientSpec.nameLike("%" + keyword + "%"));
        }
        if ("อีเมลล์".equals(searchBy)) {
            count = patientRepo.count(PatientSpec.emailLike("%" + keyword + "%"));
        }
        if ("รหัสประชาชน".equals(searchBy)) {
            count = patientRepo.count(PatientSpec.pidLike("%" + keyword + "%"));
        }
        return count;
    }

    @RequestMapping(value = "/deletepatient", method = RequestMethod.POST)
    private void deletePatient(@RequestBody Patient patient) {
        patientRepo.delete(patient);
    }

    @RequestMapping(value = "/personalinformationpatient/{id}", method = RequestMethod.GET)
    public ResponseEntity<InputStreamResource> printPersonalInformationPatient(@PathVariable("id") String id) {
        InputStream inputStream = null;
        byte[] content = null;
        JasperPrint fill = null;
        ResponseEntity<InputStreamResource> response = null;
        try {
            inputStream = App.class.getClassLoader().getResourceAsStream("report\\patient.jasper");
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("id", id);
            H2ConnectAndExport h2ConnectAndExport = new H2ConnectAndExport();
            fill = JasperFillManager.fillReport(inputStream, param, h2ConnectAndExport.getH2Connection());
            content = JasperExportManager.exportReportToPdf(fill);
            response = h2ConnectAndExport.exportReportToClientBrowser(content, "patient-" + id, "pdf");
            h2ConnectAndExport.getH2Connection().close();
            return response;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }

    @RequestMapping(value = "/printpatients", method = RequestMethod.GET)
    public ResponseEntity<InputStreamResource> printPatients() {
        InputStream inputStream = null;
        byte[] content = null;
        JasperPrint fill = null;
        ResponseEntity<InputStreamResource> response = null;
        try {
            inputStream = App.class.getClassLoader().getResourceAsStream("report\\patients.jasper");
            H2ConnectAndExport h2ConnectAndExport = new H2ConnectAndExport();
            fill = JasperFillManager.fillReport(inputStream, null, h2ConnectAndExport.getH2Connection());
            content = JasperExportManager.exportReportToPdf(fill);
            response = h2ConnectAndExport.exportReportToClientBrowser(content, "patients", "pdf");
            h2ConnectAndExport.getH2Connection().close();
            return response;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }

    @RequestMapping(value = "/cardpatient/{id}", method = RequestMethod.GET)
    public ResponseEntity<InputStreamResource> printCardPatient(@PathVariable("id") String id) {
        InputStream inputStream = null;
        byte[] content = null;
        JasperPrint fill = null;
        ResponseEntity<InputStreamResource> response = null;
        try {
            inputStream = App.class.getClassLoader().getResourceAsStream("report\\id_customer.jasper");
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("id", id);
            param.put("clinicname", clinicInformationRepo.findOne(1).getClinicName());
            H2ConnectAndExport h2ConnectAndExport = new H2ConnectAndExport();
            fill = JasperFillManager.fillReport(inputStream, param, h2ConnectAndExport.getH2Connection());
            content = JasperExportManager.exportReportToPdf(fill);
            response = h2ConnectAndExport.exportReportToClientBrowser(content, "patient-card-" + id, "pdf");
            h2ConnectAndExport.getH2Connection().close();
            return response;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }
}
