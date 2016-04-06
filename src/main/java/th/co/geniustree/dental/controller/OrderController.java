/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import th.co.geniustree.dental.App;
import th.co.geniustree.dental.model.MedicalSupplies;
import th.co.geniustree.dental.model.OrderAndMedicalSupplies;
import th.co.geniustree.dental.model.OrderMedicalSupplie;
import th.co.geniustree.dental.repo.MedicalSuppliesRepo;
import th.co.geniustree.dental.repo.OrderRepo;
import th.co.geniustree.dental.repo.TmpOrderRepo;

/**
 *
 * @author BestKung
 */
@RestController
public class OrderController {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private MedicalSuppliesRepo medicalSuppliesRepo;

    @Autowired
    private TmpOrderRepo tmpOrderRepo;

    @RequestMapping(value = "/saveordermedical", method = RequestMethod.POST)
    public void saveOrder(@RequestBody OrderAndMedicalSupplies orderAndMedicalSupplies) {
        OrderMedicalSupplie orderMedicalSupplie = new OrderMedicalSupplie();

        orderMedicalSupplie = orderAndMedicalSupplies.getOrderMedicalSupplie();
        orderMedicalSupplie.setDate(new Date());
        OrderMedicalSupplie oms = orderRepo.save(orderMedicalSupplie);

        for (int i = 0; i < orderAndMedicalSupplies.getMedicalSupplies().size(); i++) {
            MedicalSupplies supplies = new MedicalSupplies();
            supplies.setName(orderAndMedicalSupplies.getMedicalSupplies().get(i).getName());
            supplies.setPrice(orderAndMedicalSupplies.getMedicalSupplies().get(i).getPrice());
            supplies.setSum(orderAndMedicalSupplies.getMedicalSupplies().get(i).getSum());
            supplies.setUnit(orderAndMedicalSupplies.getMedicalSupplies().get(i).getUnit());
            supplies.setValue(orderAndMedicalSupplies.getMedicalSupplies().get(i).getValue());
            supplies.setOrderMedicalSupplie(oms);
            medicalSuppliesRepo.save(supplies);
        }
    }

    @RequestMapping(value = "/getorder", method = RequestMethod.GET)
    public Page<OrderMedicalSupplie> getOrder(Pageable pageable) {
        return orderRepo.findAll(pageable);
    }

    @RequestMapping(value = "/deleteorder", method = RequestMethod.POST)
    public void delateOrder(@RequestBody OrderMedicalSupplie orderMedicalSupplie) {
        List<MedicalSupplies> medicalSupplieses = medicalSuppliesRepo.findAllByOrderMedicalSupplie(orderMedicalSupplie);
        System.out.println("------------------------------------" + medicalSupplieses);
        for (int i = 0; i < medicalSupplieses.size(); i++) {
            medicalSuppliesRepo.delete(medicalSupplieses.get(i).getId());
        }
        orderMedicalSupplie.setMedicalSupplies(null);
        orderRepo.delete(orderMedicalSupplie);
    }

    @RequestMapping(value = "/countordermedicalsupplies", method = RequestMethod.GET)
    public Long count() {
        return orderRepo.count();
    }

    @RequestMapping(value = "/searchorder", method = RequestMethod.POST)
    public Page<OrderMedicalSupplie> searchOrder(@RequestBody Integer id, Pageable pageable) {
        return orderRepo.findAllById(id, pageable);
    }

    @RequestMapping(value = "/countsearchorder", method = RequestMethod.POST)
    public Long countSearchOrder(@RequestBody Integer id, Pageable pageable) {
        return orderRepo.findAllById(id, pageable).getTotalElements();
    }
    
    
    
    @RequestMapping(value = "/printorder/{id}", method = RequestMethod.GET)
    public ResponseEntity<InputStreamResource> printOrder(@PathVariable("id") Integer id) {
        InputStream inputStream = null;
        byte[] content = null;
        JasperPrint fill = null;
        ResponseEntity<InputStreamResource> response = null;
        try {
            inputStream = App.class.getClassLoader().getResourceAsStream("report\\order.jasper");
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("id", id);
            H2ConnectAndExport h2ConnectAndExport = new H2ConnectAndExport();
            fill = JasperFillManager.fillReport(inputStream, param, h2ConnectAndExport.getH2Connection());
            content = JasperExportManager.exportReportToPdf(fill);
            response = h2ConnectAndExport.exportReportToClientBrowser(content, "emloyee-" + id, "pdf");
            h2ConnectAndExport.getH2Connection().close();
            return response;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }


}
