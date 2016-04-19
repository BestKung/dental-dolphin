/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import th.co.geniustree.dental.model.DetailHeal;
import th.co.geniustree.dental.model.DetailHealGennerateCode;
import th.co.geniustree.dental.model.Patient;
import th.co.geniustree.dental.model.SearchData;
import th.co.geniustree.dental.repo.DetailHealGennerateCodeRepo;
import th.co.geniustree.dental.repo.DetailHealRepo;
import th.co.geniustree.dental.repo.OrderHealRepo;
import th.co.geniustree.dental.service.DetailHealService;
import th.co.geniustree.dental.spec.DetailHealSpec;

/**
 *
 * @author Jasin007
 */
@RestController
public class DetailHealController {

    @Autowired
    private DetailHealRepo detailHealRepo;
    @Autowired
    private DetailHealService detailHealService;
    @Autowired
    private OrderHealRepo orderHealRepo;
    @Autowired
    private DetailHealGennerateCodeRepo gennerateCodeRepo;

    @RequestMapping(value = "/savedetailheal", method = RequestMethod.POST)
    public Integer saveDetailHeal(@RequestBody DetailHeal detailHeal) {
//        if (detailHeal.getId() != null) {
//            detailHealRepo.save(detailHeal);
//        } else {
            DetailHealGennerateCode gennerateCode = gennerateCodeRepo.save(new DetailHealGennerateCode());
            int idLength = gennerateCode.getId().toString().length();
            String strId = gennerateCode.getId().toString();
            for (int i = idLength; i <= 4; i++) {
                strId = 0 + strId;
            }
            detailHeal.setId("DTH" + strId + "-" + new SimpleDateFormat("YY", new Locale("th", "TH")).format(new Date()));
            gennerateCodeRepo.delete(gennerateCode);
            detailHealRepo.save(detailHeal);
//        }
        return 200;
    }

    @RequestMapping(value = "/loaddetailheal")
    public Page<DetailHeal> loadOrderHeal(Pageable pageable) {
        return detailHealRepo.findAll(pageable);
    }

    @RequestMapping(value = "/loaddetailhealforbill")
    public Page<DetailHeal> loadOrderHealForBill(Pageable pageable) {
        return detailHealRepo.findByStatusIsNull(pageable);
    }

    @RequestMapping(value = "/deletedetailheal", method = RequestMethod.POST)
    public void deleteDetailHeal(@RequestBody DetailHeal detailHeal) {
        detailHealRepo.delete(detailHeal.getId());
    }

    @RequestMapping(value = "/totaldetailheal", method = RequestMethod.GET)
    public Long getTotalDetailHeal() {
        return detailHealRepo.count();
    }

    @RequestMapping(value = "/totaldetailhealforbill", method = RequestMethod.GET)
    public Integer getTotalDetailHealForBill() {
        return detailHealRepo.findByStatusIsNull().size();
    }

    @RequestMapping(value = "/loaddetailheal/searchdetailheal", method = RequestMethod.POST)
    public Page<DetailHeal> search(@RequestBody SearchData searchData, Pageable pageable) throws ParseException {
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        Page<DetailHeal> detailHeals = null;
        if ("ชื่อคนไข้".equals(searchBy)) {
            detailHeals = detailHealService.searchByPatient(keyword, pageable);
        }
        if ("ชื่อทันตเเพทย์".equals(searchBy)) {
            detailHeals = detailHealService.searchByDoctor(keyword, pageable);
        }
        if ("วันที่รักษา".equals(searchBy)) {
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
            Date keywordDate = df.parse(keyword);
            detailHeals = detailHealService.searchByDateHeal(keywordDate, pageable);
        }
        return detailHeals;
    }

    @RequestMapping(value = "/loaddetailheal/searchdetailhealforbill", method = RequestMethod.POST)
    public Page<DetailHeal> searchForBill(@RequestBody SearchData searchData, Pageable pageable) throws ParseException {
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        Page<DetailHeal> detailHeals = null;
        if ("ชื่อคนไข้".equals(searchBy)) {
            detailHeals = detailHealService.searchByPatientForBill(keyword, pageable);
        }
        if ("ชื่อทันตเเพทย์".equals(searchBy)) {
            detailHeals = detailHealService.searchByDoctorForBill(keyword, pageable);
        }
        if ("วันที่รักษา".equals(searchBy)) {
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
            Date keywordDate = df.parse(keyword);
            detailHeals = detailHealService.searchByDateHealForBill(keywordDate, pageable);
        }
        return detailHeals;
    }

    @RequestMapping(value = "/countdetailheal", method = RequestMethod.GET)
    public long countDetailHeal() {
        return detailHealRepo.count();
    }

    @RequestMapping(value = "/countdetailhealforbill", method = RequestMethod.GET)
    public long countDetailHealForBill() {
        return detailHealRepo.findByStatusIsNull().size();
    }

    @RequestMapping(value = "/countsearchdetailheal", method = RequestMethod.POST)
    public long countSearchDetailHeal(@RequestBody SearchData searchData) throws ParseException {
        long count = 0;
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        Page<DetailHeal> detailHeals = null;
        if ("ชื่อคนไข้".equals(searchBy)) {
            count = detailHealRepo.count(DetailHealSpec.patientLike("%" + keyword + "%"));
        }
        if ("ชื่อทันตเเพทย์".equals(searchBy)) {
            count = detailHealRepo.count(DetailHealSpec.doctorLike("%" + keyword + "%"));
        }
        if ("Dateวันที่รักษาHeal".equals(searchBy)) {
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
            Date keywordDate = df.parse(keyword);
            count = detailHealRepo.count(DetailHealSpec.dateHealLike(keywordDate));
        }
        return count;
    }

    @RequestMapping(value = "/countsearchdetailhealforbill", method = RequestMethod.POST)
    public long countSearchDetailHealForBill(@RequestBody SearchData searchData) throws ParseException {
        long count = 0;
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        Page<DetailHeal> detailHeals = null;
        if ("ชื่อคนไข้".equals(searchBy)) {
            count = detailHealRepo.count(DetailHealSpec.patientLikeForBill("%" + keyword + "%"));
        }
        if ("ชื่อทันตเเพทย์".equals(searchBy)) {
            count = detailHealRepo.count(DetailHealSpec.doctorLikeForBill("%" + keyword + "%"));
        }
        if ("Dateวันที่รักษาHeal".equals(searchBy)) {
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
            Date keywordDate = df.parse(keyword);
            count = detailHealRepo.count(DetailHealSpec.dateHealLikeForBill(keywordDate));
        }
        return count;
    }

    @RequestMapping(value = "/removeorderheal", method = RequestMethod.POST)
    private void removeOrderHeal(@RequestBody DetailHeal detailHeal) {
        for (int i = 0; i < detailHeal.getOrderHealDetailHeals().size(); i++) {
            orderHealRepo.delete(detailHeal.getOrderHealDetailHeals().get(i));
        }
    }

    @RequestMapping(value = "/finddetailhealbypatient", method = RequestMethod.POST)
    public Page<DetailHeal> searchDetailHealByPatient(@RequestBody Patient patient, Pageable pageable) {
        return detailHealRepo.findAllByPatientOrderByDateHealDesc(patient, pageable);
    }
}
