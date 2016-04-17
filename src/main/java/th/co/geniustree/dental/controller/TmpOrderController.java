/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import th.co.geniustree.dental.model.TmpOrder;
import th.co.geniustree.dental.repo.TmpOrderRepo;

/**
 *
 * @author BestKung
 */
@RestController
public class TmpOrderController {

    @Autowired
    private TmpOrderRepo tmpOrderRepo;

    @RequestMapping(value = "/savetmporder", method = RequestMethod.POST)
    public void saveTmpOrder(@RequestBody TmpOrder tmpOrder) {
        if (tmpOrder.getPrice() != null && tmpOrder.getValue() != null) {
            tmpOrder.setSum(tmpOrder.getPrice() * tmpOrder.getValue());
        }
        tmpOrderRepo.save(tmpOrder);
    }

    @RequestMapping(value = "/gettmporder", method = RequestMethod.POST)
    public Page<TmpOrder> getTmpOrder(@RequestBody String user, Pageable pageable) {
        return tmpOrderRepo.findAllByDoctorId(user, pageable);
    }

    @RequestMapping(value = "/deletetmporder", method = RequestMethod.POST)
    public void deleteTmpOrder(@RequestBody TmpOrder tmpOrder) {
        tmpOrderRepo.delete(tmpOrder);
    }

    @RequestMapping(value = "/counttmporder", method = RequestMethod.GET)
    public Long countTmpProduct() {
        return tmpOrderRepo.count();
    }

}
