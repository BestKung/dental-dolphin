/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanArrayDataSource;
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
import th.co.geniustree.dental.App;
import th.co.geniustree.dental.model.Bill;
import th.co.geniustree.dental.model.BillGennerateCode;
import th.co.geniustree.dental.model.BillList;
import th.co.geniustree.dental.model.ClinicInformation;
import th.co.geniustree.dental.model.DetailHeal;
import th.co.geniustree.dental.model.DetailHealAndTmpProduct;
import th.co.geniustree.dental.model.OrderProduct;
import th.co.geniustree.dental.model.PriceAndExpireProduct;
import th.co.geniustree.dental.model.SearchData;
import th.co.geniustree.dental.repo.BillGennerateCodeRepo;
import th.co.geniustree.dental.repo.BillRepo;
import th.co.geniustree.dental.repo.ClinicInformationRepo;
import th.co.geniustree.dental.repo.DetailHealRepo;
import th.co.geniustree.dental.repo.OrderBillRepo;
import th.co.geniustree.dental.repo.OrderProductRepo;
import th.co.geniustree.dental.repo.PriceAndExpireProductRepo;
import th.co.geniustree.dental.service.BillService;
import th.co.geniustree.dental.spec.BillSpec;
import th.co.geniustree.dental.spec.OrderProductSpecificaton;

/**
 *
 * @author Jasin007
 */
@RestController
public class BillController {

    @Autowired
    private BillRepo billRepo;

    @Autowired
    private OrderBillRepo orderBillRepo;

    @Autowired
    private OrderProductRepo orderProductRepo;

    @Autowired
    private BillService billService;

    @Autowired
    private DetailHealRepo detailHealRepo;

    @Autowired
    private PriceAndExpireProductRepo priceAndExpireProductRepo;

    @Autowired
    private ClinicInformationRepo clinicInformationRepo;

    @Autowired
    private BillGennerateCodeRepo gennerateCodeRepo;

    @RequestMapping(value = "/savebill", method = RequestMethod.POST)
    public Integer saveBill(@Validated @RequestBody DetailHealAndTmpProduct detailHealAndTmpProduct) {

        BillGennerateCode gennerateCode = gennerateCodeRepo.save(new BillGennerateCode());
        int idLength = gennerateCode.getId().toString().length();
        String strId = gennerateCode.getId().toString();
        for (int i = idLength; i <= 4; i++) {
            strId = 0 + strId;
        }
        Bill bill = new Bill();
        bill.setId("B" + strId + "-" + new SimpleDateFormat("YY", new Locale("th", "TH")).format(new Date()));

        bill.setDateBill(detailHealAndTmpProduct.getDay());

        bill.setSumPrice(detailHealAndTmpProduct.getSumPrice());
//        bill.setId(detailHealAndTmpProduct.getId());
        bill.setDateUpdate(detailHealAndTmpProduct.getDateUpdate());

        if (detailHealAndTmpProduct.getDateUpdate() != null) {
//            DetailHeal detailHealAfter = billRepo.findOne(detailHealAndTmpProduct.getId()).getDetailHeal();
//            detailHealAfter.setStatus(null);
//            detailHealRepo.save(detailHealAfter);

        }

        bill.setDetailHeal(detailHealAndTmpProduct.getDetailHeal());
        System.out.println("-------------------------------------------------------------//////////" + detailHealAndTmpProduct);
        if (detailHealAndTmpProduct.getDetailHeal() != null) {
            DetailHeal detailHeal = detailHealRepo.findOne(detailHealAndTmpProduct.getDetailHeal().getId());
            detailHeal.setStatus("out");
            detailHealRepo.save(detailHeal);
        }

        for (int i = 0; i < detailHealAndTmpProduct.getTmpProducts().size(); i++) {
            PriceAndExpireProduct priceAndExpireProduct = detailHealAndTmpProduct.getTmpProducts().get(i).getPriceAndExpireProduct();
            if ((priceAndExpireProduct.getAmountRemaining() - detailHealAndTmpProduct.getTmpProducts().get(i).getValue() < 0) && (detailHealAndTmpProduct.getDateUpdate() == null)) {
                return 101;
            }
        }
        billRepo.save(bill);
        List<OrderProduct> productsAfter = orderProductRepo.findAll(OrderProductSpecificaton.whereBill(detailHealAndTmpProduct.getId()));
        if (productsAfter.size() > 0) {
            for (int i = 0; i < productsAfter.size(); i++) {
                orderProductRepo.delete(productsAfter.get(i));
            }
        }

        for (int i = 0; i < detailHealAndTmpProduct.getTmpProducts().size(); i++) {
            OrderProduct orderProduct = new OrderProduct();
            orderProduct.setPriceAndExpireProduct(detailHealAndTmpProduct.getTmpProducts().get(i).getPriceAndExpireProduct());
            orderProduct.setValue(detailHealAndTmpProduct.getTmpProducts().get(i).getValue());
            orderProduct.setBill(bill);
            orderProductRepo.save(orderProduct);
            if (detailHealAndTmpProduct.getDateUpdate() == null) {
                PriceAndExpireProduct priceAndExpireProduct = detailHealAndTmpProduct.getTmpProducts().get(i).getPriceAndExpireProduct();
                priceAndExpireProduct.setAmountRemaining((priceAndExpireProduct.getAmountRemaining() - detailHealAndTmpProduct.getTmpProducts().get(i).getValue()));
                priceAndExpireProductRepo.save(priceAndExpireProduct);
            }
        }
        if (detailHealAndTmpProduct.getDateUpdate() != null) {
            Bill bill1 = new Bill();
//            bill.setId(detailHealAndTmpProduct.getId());
            List<OrderProduct> orderProducts = orderProductRepo.findByBill(bill);
            long sizeBefore = orderProductRepo.count(OrderProductSpecificaton.whereBill(detailHealAndTmpProduct.getId()));
            for (int i = 0; i < productsAfter.size(); i++) {
                for (int j = 0; j < detailHealAndTmpProduct.getTmpProducts().size(); j++) {
                    PriceAndExpireProduct priceAndExpireProduct = detailHealAndTmpProduct.getTmpProducts().get(j).getPriceAndExpireProduct();
                    if (productsAfter.get(i).getPriceAndExpireProduct().getId().equals(detailHealAndTmpProduct.getTmpProducts().get(j).getPriceAndExpireProduct().getId())) {
                        priceAndExpireProduct.setAmountRemaining((detailHealAndTmpProduct.getTmpProducts().get(j).getPriceAndExpireProduct().getAmountRemaining() + productsAfter.get(i).getValue()));
                        priceAndExpireProductRepo.save(priceAndExpireProduct);
                    }
                }
            }
            for (int i = 0; i < detailHealAndTmpProduct.getTmpProducts().size(); i++) {
                PriceAndExpireProduct priceAndExpireProduct = detailHealAndTmpProduct.getTmpProducts().get(i).getPriceAndExpireProduct();
                Double amountTotal = priceAndExpireProductRepo.findOne(priceAndExpireProduct.getId()).getAmountRemaining();
                priceAndExpireProduct.setAmountRemaining((amountTotal - detailHealAndTmpProduct.getTmpProducts().get(i).getValue()));
                priceAndExpireProductRepo.save(priceAndExpireProduct);
            }

        }

        return 200;
    }

    @RequestMapping(value = "/getbill", method = RequestMethod.GET)
    public Page<Bill> getBill(Pageable pageable) {
        return billRepo.findAll(pageable);
    }

    @RequestMapping(value = "/searchBill", method = RequestMethod.POST)
    public Page<Bill> serchBill(@RequestBody SearchData searchData, Pageable pageable) throws ParseException {
        String searchBy = searchData.getSearchBy();
        String keyword = searchData.getKeyword();
        Page<Bill> bills = null;
        if ("DateBill".equals(searchBy)) {
            DateFormat sim = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
            Date date = sim.parse(keyword);
            bills = billService.searchByDateBill(date, pageable);
        }
        if ("SumPrice".equals(searchBy)) {
            bills = billService.searchBySumPrice(new Double(keyword), pageable);
        }
        return bills;
    }

    @RequestMapping(value = "/countbill", method = RequestMethod.GET)
    public long countBill() {
        return billRepo.count();
    }

    @RequestMapping(value = "/countsearchbill", method = RequestMethod.POST)
    public long countSearchBill(@RequestBody SearchData searchData) throws ParseException {
        String searchBy = searchData.getSearchBy();
        String keyword = searchData.getKeyword();
        long count = 0;
        if ("DateBill".equals(searchBy)) {
            DateFormat sim = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
            Date date = sim.parse(keyword);
            count = billRepo.count(BillSpec.dateBillLike(date));
        }
        if ("SumPrice".equals(searchBy)) {
            count = billRepo.count(BillSpec.sumPriceLike(new Double(keyword)));
        }
        return count;
    }

    @RequestMapping(value = "/deletebill", method = RequestMethod.POST)
    public void deleteBill(@RequestBody Bill bill) {
        billRepo.delete(bill.getId());
    }

    @RequestMapping(value = "/totalbill", method = RequestMethod.GET)
    public Long getTotalBill() {
        return billRepo.count();
    }

    @RequestMapping(value = "/printbill/{id}", method = RequestMethod.GET)
    public ResponseEntity<InputStreamResource> printPersonalInformationPatient(@PathVariable("id") String id) {
        InputStream inputStream = null;
        byte[] content = null;
        JasperPrint fill = null;
        ResponseEntity<InputStreamResource> response = null;
        try {
            inputStream = App.class.getClassLoader().getResourceAsStream("report\\bill.jasper");
            H2ConnectAndExport h2ConnectAndExport = new H2ConnectAndExport();
            Bill bill = billRepo.findOne(id);
            ClinicInformation clinic = clinicInformationRepo.findOne(1);
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("bill_id", id);
            param.put("totalprice", bill.getSumPrice());
            param.put("date_bill", bill.getDateBill());
            if (clinic != null) {
                param.put("clinic_name", clinic.getClinicName());
                param.put("clinic_address", clinic.getClinicAddress());
                if (clinic.getLogo() != null) {
                    InputStream logo = new ByteArrayInputStream(clinic.getLogo());
                    param.put("logo", logo);
                }
            }
            int totalSize = 0;
            int detaiHealSize = 0;
            int ProductSize = 0;
            if (bill.getDetailHeal() != null) {
                detaiHealSize = bill.getDetailHeal().getOrderHealDetailHeals().size();
            }
            if (bill.getOrderProduct() != null) {
                ProductSize = bill.getOrderProduct().size();
            }
            totalSize = detaiHealSize + ProductSize;
            Object[] model = new Object[totalSize];

            if (bill.getDetailHeal() != null) {
                for (int i = 0; i < bill.getDetailHeal().getOrderHealDetailHeals().size(); i++) {
                    BillList billList = new BillList();
                    billList.setName(bill.getDetailHeal().getOrderHealDetailHeals().get(i).getListSelectHeal().getName());
                    billList.setPrice(bill.getDetailHeal().getOrderHealDetailHeals().get(i).getListSelectHeal().getPrice());
                    billList.setUnit(null);
                    billList.setValue((double) (bill.getDetailHeal().getOrderHealDetailHeals().get(i).getValue()));
                    model[i] = billList;
                }
            }
            if (bill.getOrderProduct() != null) {
                for (int i = 0; i < bill.getOrderProduct().size(); i++) {
                    BillList billList = new BillList();
                    billList.setName(bill.getOrderProduct().get(i).getPriceAndExpireProduct().getProduct().getName());
                    billList.setPrice(bill.getOrderProduct().get(i).getPriceAndExpireProduct().getPriceSell());
                    billList.setUnit(bill.getOrderProduct().get(i).getPriceAndExpireProduct().getProduct().getUnit().getName());
                    billList.setValue((double) (bill.getOrderProduct().get(i).getValue()));
                    model[detaiHealSize + i] = billList;
                }
            }

            JRBeanArrayDataSource arrayDataSource = new JRBeanArrayDataSource(model);

            fill = JasperFillManager.fillReport(inputStream, param, arrayDataSource);
            content = JasperExportManager.exportReportToPdf(fill);
            response = h2ConnectAndExport.exportReportToClientBrowser(content, "bill-" + id, "pdf");
            h2ConnectAndExport.getH2Connection().close();
            return response;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }

}
