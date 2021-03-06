/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import java.io.InputStream;
import java.text.DateFormat;
import java.text.ParseException;
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
import th.co.geniustree.dental.App;
import th.co.geniustree.dental.model.PriceAndExpireProduct;
import th.co.geniustree.dental.model.SearchData;
import th.co.geniustree.dental.repo.PriceAndExpireProductRepo;
import th.co.geniustree.dental.service.PriceAndExpireProductService;
import th.co.geniustree.dental.spec.PriceAndExpireProductSpec;

/**
 *
 * @author Jasin007
 */
@RestController
public class PriceAndExpireProductController {

    @Autowired
    PriceAndExpireProductRepo priceAndExpireProductRepo;

    @RequestMapping(value = "/loadpriceandexpireproduct")
    public Page<PriceAndExpireProduct> loadPriceAndExpireProduct(Pageable pageable) {
        return priceAndExpireProductRepo.findByStatusIsNull(pageable);
    }

    @RequestMapping(value = "/savepriceandexpireproduct", method = RequestMethod.POST)
    public void savePriceAndExpireProduct(@Validated @RequestBody PriceAndExpireProduct priceAndExpireProduct) throws ParseException {
        if (priceAndExpireProduct.getAmountRemaining() == null) {
            priceAndExpireProduct.setAmountRemaining(priceAndExpireProduct.getValue());
        }
        if (priceAndExpireProduct.getExpire() != null) {
            DateFormat df = new SimpleDateFormat("yyy-MM-dd", Locale.US);
            long numberOfDate = Long.parseLong(priceAndExpireProduct.getNotificationsExpire().substring(0, 2));
            Date d = new Date(priceAndExpireProduct.getExpire().getTime() - (numberOfDate * 24l * 60l * 60l * 1000l));
            String keywordDate = df.format(d);
            Date dateNontification = df.parse(keywordDate);
            priceAndExpireProduct.setNontificationDateExpire(dateNontification);
        }
        priceAndExpireProductRepo.save(priceAndExpireProduct);
    }

    @RequestMapping(value = "/deletepriceandexpireproduct", method = RequestMethod.POST)
    public void deletePriceAndExpireProduct(@RequestBody PriceAndExpireProduct priceAndExpireProduct) {
        priceAndExpireProductRepo.delete(priceAndExpireProduct.getId());
    }

    @RequestMapping(value = "/totalpriceandexpireproduct", method = RequestMethod.GET)
    public Integer getTotalPriceAndExpireProduct() {
        return priceAndExpireProductRepo.findByStatusIsNull().size();
    }

    @Autowired
    private PriceAndExpireProductService priceAndExpireProductService;

    @RequestMapping(value = "/loadpriceandexpireproduct/searchpriceandexpireproduct", method = RequestMethod.POST)
    public Page<PriceAndExpireProduct> searchPriceAndExpireProduct(@RequestBody SearchData searchData, Pageable pageable) throws ParseException {
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        Page<PriceAndExpireProduct> priceAndExpireProducts = null;
        DateFormat df = new SimpleDateFormat("yyy-MM-dd", Locale.US);
        if ("LotIn".equals(searchBy)) {
            Date keywordDate = df.parse(keyword);
            priceAndExpireProducts = priceAndExpireProductService.searchByLot(keywordDate, pageable);
        }
        if ("NameProduct".equals(searchBy)) {
            priceAndExpireProducts = priceAndExpireProductService.searchByProduct(keyword, pageable);
        }
        if ("Expire".equals(searchBy)) {
            Date keywordDate = df.parse(keyword);
            priceAndExpireProducts = priceAndExpireProductService.searchByExpire(keywordDate, pageable);
        }
        return priceAndExpireProducts;
    }

    @RequestMapping(value = "/countsearchpriceandexpireproduct", method = RequestMethod.POST)
    public long countSearchPriceAndExpireProduct(@RequestBody SearchData searchData) throws ParseException {
        long count = 0;
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
        if ("LotIn".equals(searchBy)) {
            Date keywordDate = df.parse(keyword);
            count = priceAndExpireProductRepo.count(PriceAndExpireProductSpec.lotInBetween(keywordDate));
        }
        if ("NameProduct".equals(searchBy)) {
            count = priceAndExpireProductRepo.count(PriceAndExpireProductSpec.productLike("%" + keyword + "%"));
        }
        if ("Expire".equals(searchBy)) {
            Date keywordDate = df.parse(keyword);
            count = priceAndExpireProductRepo.count(PriceAndExpireProductSpec.expireBetween(keywordDate));
        }
        return count;
    }

    @RequestMapping(value = "/countoutproduct", method = RequestMethod.GET)
    public Long countOutProduct() {
        long count = 0;
        long sizeAllProduct = priceAndExpireProductRepo.findAll().size();
        for (int i = 0; i < sizeAllProduct; i++) {
            PriceAndExpireProduct priceAndExpireProduct = new PriceAndExpireProduct();
            priceAndExpireProduct = priceAndExpireProductRepo.findAll().get(i);
            if ((priceAndExpireProduct.getNotificationsValue() >= priceAndExpireProduct.getValue()) && ("1".equals(priceAndExpireProduct.getStatusNontificationValue()))) {
                count++;
            }
        }
        return count;
    }

    @RequestMapping(value = "/getoutproduct", method = RequestMethod.GET)
    public Page<PriceAndExpireProduct> getOutProduct(Pageable pageable) {
        System.out.println("--------------------------------------->" + priceAndExpireProductService.searchByvalueLessThanOrEqualNontificationValueAndStatus(pageable).getTotalElements());
        return priceAndExpireProductService.searchByvalueLessThanOrEqualNontificationValueAndStatus(pageable);
    }

    @RequestMapping(value = "/getoutproductnonacknowledge", method = RequestMethod.GET)
    public Integer getoutProductNotAcKnowledge(Pageable pageable) {
        return priceAndExpireProductService.searchByvalueLessThanOrEqualNontificationValueAndStatusList().size();
    }

    @RequestMapping(value = "/getnontificationexpiredate", method = RequestMethod.GET)
    public Page<PriceAndExpireProduct> getNontificationExpireDate(Pageable pageable) {
        Date date = new Date();
        try {
            System.out.println("=================================================>" + priceAndExpireProductService.searcbByNontificationDateExpire(date, pageable).getNumberOfElements());
            return priceAndExpireProductService.searcbByNontificationDateExpire(date, pageable);
        } catch (Exception e) {
            return null;
        }

    }

    @RequestMapping(value = "/countnontificationexpiredate", method = RequestMethod.GET)
    public Long countNontificationExpireDate() {
        Date date = new Date();
        try {
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
            String strDate = df.format(date);
            Date d = df.parse(strDate);
            return priceAndExpireProductRepo.count(PriceAndExpireProductSpec.expireProductAndStatusCount(date));
        } catch (Exception e) {
        }
        return 0l;
    }
    
    @RequestMapping(value = "/informationproduct/{id}", method = RequestMethod.GET)
    public ResponseEntity<InputStreamResource> printPersonalInformationStaff(@PathVariable("id") Integer id) {
        InputStream inputStream = null;
        byte[] content = null;
        JasperPrint fill = null;
        ResponseEntity<InputStreamResource> response = null;
        try {
            inputStream = App.class.getClassLoader().getResourceAsStream("report\\product.jasper");
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("id", id);
            H2ConnectAndExport h2ConnectAndExport = new H2ConnectAndExport();
            fill = JasperFillManager.fillReport(inputStream, param, h2ConnectAndExport.getH2Connection());
            content = JasperExportManager.exportReportToPdf(fill);
            response = h2ConnectAndExport.exportReportToClientBrowser(content, "product-" + id, "pdf");
            h2ConnectAndExport.getH2Connection().close();
            return response;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }
    @RequestMapping(value = "/printproducts", method = RequestMethod.GET)
    public ResponseEntity<InputStreamResource> printemployees() {
        InputStream inputStream = null;
        byte[] content = null;
        JasperPrint fill = null;
        ResponseEntity<InputStreamResource> response = null;
        try {
            inputStream = App.class.getClassLoader().getResourceAsStream("report\\products.jasper");
            H2ConnectAndExport h2ConnectAndExport = new H2ConnectAndExport();
            fill = JasperFillManager.fillReport(inputStream, null, h2ConnectAndExport.getH2Connection());
            content = JasperExportManager.exportReportToPdf(fill);
            response = h2ConnectAndExport.exportReportToClientBrowser(content, "products", "pdf");
            h2ConnectAndExport.getH2Connection().close();
            return response;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }

    
    @RequestMapping(value = "/remainproduct/{id}", method = RequestMethod.GET)
    public ResponseEntity<InputStreamResource> printRemainProduct(@PathVariable("id") Integer id) {
        InputStream inputStream = null;
        byte[] content = null;
        JasperPrint fill = null;
        ResponseEntity<InputStreamResource> response = null;
        try {
            inputStream = App.class.getClassLoader().getResourceAsStream("report\\remainproduct.jasper");
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("id", id);
            H2ConnectAndExport h2ConnectAndExport = new H2ConnectAndExport();
            fill = JasperFillManager.fillReport(inputStream, param, h2ConnectAndExport.getH2Connection());
            content = JasperExportManager.exportReportToPdf(fill);
            response = h2ConnectAndExport.exportReportToClientBrowser(content, "lot-" + id, "pdf");
            h2ConnectAndExport.getH2Connection().close();
            return response;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }
    
}
