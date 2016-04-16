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
import java.util.List;
import java.util.Locale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import th.co.geniustree.dental.model.Employee;
import th.co.geniustree.dental.model.Lot;
import th.co.geniustree.dental.model.PriceAndExpireProduct;
import th.co.geniustree.dental.model.SearchData;
import th.co.geniustree.dental.repo.EmployeeRepo;
import th.co.geniustree.dental.repo.LotRepo;
import th.co.geniustree.dental.repo.PriceAndExpireProductRepo;
import th.co.geniustree.dental.service.EmployeeService;
import th.co.geniustree.dental.service.LotService;
import th.co.geniustree.dental.spec.EmployeeSpec;
import th.co.geniustree.dental.spec.LotSpec;

/**
 *
 * @author Jasin007
 */
@RestController
public class LotController {

    @Autowired
    private LotRepo lotRepo;

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private PriceAndExpireProductRepo priceAndExpireProductRepo;

    @RequestMapping(value = "/loademployee")
    public Page<Employee> loadEmployee(Pageable pageable) {
        return employeeRepo.findAll(pageable);
    }

    @RequestMapping(value = "/tatallemployee", method = RequestMethod.GET)
    public Long getTotalEmployee() {
        return employeeRepo.count();
    }

    @Autowired
    private EmployeeService employeeService;

    @RequestMapping(value = "/loademployee/searchemployee", method = RequestMethod.POST)
    public Page<Employee> searchEmployee(@RequestBody SearchData searchData, Pageable pageable) {
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        Page<Employee> employees = null;
        if ("ชื่อ".equals(searchBy)) {
            employees = employeeService.searchByName(keyword, pageable);
        }
        if ("อีเมลล์".equals(searchBy)) {
            employees = employeeService.searchByEmail(keyword, pageable);
        }
        return employees;
    }

    @RequestMapping(value = "/countsearchemployee", method = RequestMethod.POST)
    public long countSearchEmployee(@RequestBody SearchData searchData) throws ParseException {
        long count = 0;
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        if ("ชื่อ".equals(searchBy)) {
            count = employeeRepo.count(EmployeeSpec.nameLike("%" + keyword + "%"));
        }
        if ("อีเมลล์".equals(searchBy)) {
            count = employeeRepo.count(EmployeeSpec.emailLike("%" + keyword + "%"));
        }
        return count;
    }

    @RequestMapping(value = "/loadlot")
    public Page<Lot> loadLot(Pageable pageable) {
        return lotRepo.findAll(pageable);
    }

    @RequestMapping(value = "/loadlotnondateout")
    public Page<Lot> loadLotNonDateut(Pageable pageable) {
        System.out.println("----------------------------->" + lotRepo.findByDateOutIsNull().size());
        return lotRepo.findByDateOutIsNull(pageable);
    }

    @RequestMapping(value = "/savelot", method = RequestMethod.POST)
    public Integer saveLot(@Validated @RequestBody Lot lot) {
//        Lot lotDateIn = lotRepo.findByDateIn(lot.getDateIn());
//        if ((lotDateIn != null) && (lot.getId() == null)) {
//            return 1;
//        }
        if (lot.getDateOut() != null) {
            List<PriceAndExpireProduct> priceAndExpireProducts = priceAndExpireProductRepo.findByLot(lot);
            Date d = new Date();
            for (PriceAndExpireProduct p : priceAndExpireProducts) {
                if (lot.getDateOut().compareTo(d) >= 0) {
                    p.setStatus("out");
                    System.out.println("------------------------------------------------------------>" + p.getProduct().getName());
                }
            }
        } else if (lot.getId() != null) {
            List<PriceAndExpireProduct> priceAndExpireProducts = priceAndExpireProductRepo.findByLot(lot);
            for (PriceAndExpireProduct p : priceAndExpireProducts) {
                p.setStatus(null);
            }
        }
        lotRepo.save(lot);
        return 200;
    }

    @RequestMapping(value = "/deletelot", method = RequestMethod.POST)
    public void deleteLot(@RequestBody Lot lot) {
        lotRepo.delete(lot.getId());
    }

    @RequestMapping(value = "/totallot", method = RequestMethod.GET)
    public Long getTotalLot() {
        return lotRepo.count();
    }

    @RequestMapping(value = "/totallotnondateout", method = RequestMethod.GET)
    public Integer getTotalLotNonDateOut() {
        return lotRepo.findByDateOutIsNull().size();
    }

    @Autowired
    private LotService lotService;

    @RequestMapping(value = "/loadlot/searchlot", method = RequestMethod.POST)
    public Page<Lot> search(@RequestBody SearchData searchData, Pageable pageable) throws ParseException {
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        Page<Lot> lots = null;
        DateFormat df = new SimpleDateFormat("yyy-MM-dd", Locale.US);
        if ("Name".equals(searchBy)) {
            lots = lotService.searchByNameStaffReam(keyword, pageable);
        }
        if ("DateIn".equals(searchBy)) {
            Date keywordDate = df.parse(keyword);
            lots = lotService.searchByDateIn(keywordDate, pageable);
        }
        if ("DateOut".equals(searchBy)) {
            Date keywordDate = df.parse(keyword);
            lots = lotService.searchByDateOut(keywordDate, pageable);
        }
        return lots;
    }

    @RequestMapping(value = "/loadlot/searchlotnondateout", method = RequestMethod.POST)
    public Page<Lot> searchLotNonDateOut(@RequestBody SearchData searchData, Pageable pageable) throws ParseException {
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        Page<Lot> lots = null;
        DateFormat df = new SimpleDateFormat("yyy-MM-dd", Locale.US);
        if ("Name".equals(searchBy)) {
            lots = lotService.searchByNameStaffReamNonDateOut(keyword, pageable);
        }
        if ("DateIn".equals(searchBy)) {
            Date keywordDate = df.parse(keyword);
            lots = lotService.searchByDateInNonDateOut(keywordDate, pageable);
        }
        if ("DateOut".equals(searchBy)) {
            Date keywordDate = df.parse(keyword);
            lots = lotService.searchByDateOutNonDateOut(keywordDate, pageable);
        }
        return lots;
    }

    @RequestMapping(value = "/countsearchlot", method = RequestMethod.POST)
    public long countSearchLot(@RequestBody SearchData searchData) throws ParseException {
        long count = 0;
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd", Locale.US);

        if ("Name".equals(searchBy)) {
            count = lotRepo.count(LotSpec.nameStaffReamLike("%" + keyword + "%"));
        }
        if ("DateIn".equals(searchBy)) {
            Date keywordDate = df.parse(keyword);
            count = lotRepo.count(LotSpec.dateInBetween(keywordDate));
        }
        if ("DateOut".equals(searchBy)) {
            Date keywordDate = df.parse(keyword);
            count = lotRepo.count(LotSpec.dateOutBetween(keywordDate));
        }
        return count;
    }

    @RequestMapping(value = "/countsearchlotnondateout", method = RequestMethod.POST)
    public long countSearchLotNonDateOut(@RequestBody SearchData searchData) throws ParseException {
        long count = 0;
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd", Locale.US);

        if ("Name".equals(searchBy)) {
            count = lotRepo.count(LotSpec.nameStaffReamLikeNonDateOut("%" + keyword + "%"));
        }
        if ("DateIn".equals(searchBy)) {
            Date keywordDate = df.parse(keyword);
            count = lotRepo.count(LotSpec.dateInBetweenNonDateOut(keywordDate));
        }
        if ("DateOut".equals(searchBy)) {
            Date keywordDate = df.parse(keyword);
            count = lotRepo.count(LotSpec.dateOutBetweenNonDateOut(keywordDate));
        }
        return count;
    }
}
