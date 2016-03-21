/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import th.co.geniustree.dental.model.DetailHeal;
import th.co.geniustree.dental.model.HistoryOfMedicalAndTypeOfMedical;
import th.co.geniustree.dental.model.ListSelectHeal;
import th.co.geniustree.dental.model.OrderHeal;
import th.co.geniustree.dental.model.TypeOfMedical;
import th.co.geniustree.dental.repo.DetailHealRepo;
import th.co.geniustree.dental.repo.OrderHealRepo;

/**
 *
 * @author Jasin007
 */
@RestController
public class OrderHealController {

    @Autowired
    private OrderHealRepo orderHealRepo;

    @Autowired
    private DetailHealRepo detailHealRepo;

    private DetailHeal detailHeal_Id;

    @RequestMapping(value = "/loadorderheal")
    public Page<OrderHeal> loadOrderHeal(Pageable pageable) {
        return orderHealRepo.findAll(pageable);
    }

//    @RequestMapping(value = "/savedetailheal", method = RequestMethod.POST)
//    public void saveDetailHeal(@RequestBody DetailHeal detailHeal) {
//        detailHeal_Id = detailHeal;
//        detailHealRepo.save(detailHeal);
//    }
//    @RequestMapping(value = "/saveorderheal", method = RequestMethod.POST)
//    public void saveDetailHeal(@RequestBody OrderHeal[] orderHeals) {
//
////        OrderHeal[] orderHeals = updateOrderHeal.getOrderHeal();
////        Integer id[] = updateOrderHeal.getId();
////        OrderHeal[] deleteOrderHeals = updateOrderHeal.getDeleteOrderHeal();
////        if (id.length != 0) {
////            for (int i = 0; i < id.length; i++) {
////                orderHealRepo.delete(id[i]);
////            }
////        }
////        for (int i = 0; i < deleteOrderHeals.length; i++) {
////            orderHealRepo.delete(deleteOrderHeals[i]);
////        }
//        for (OrderHeal orderHeal : orderHeals) {
//            orderHeal.setDetailHeal(detailHeal_Id);
//            orderHealRepo.save(orderHeal);
//        }
//
//    }
    @RequestMapping(value = "/saveorderheal", method = RequestMethod.POST)
    public Integer saveDetailHeal(@Validated @RequestBody HistoryOfMedicalAndTypeOfMedical historyOfMedicalAndTypeOfMedical) {
        DetailHeal detailHeal = historyOfMedicalAndTypeOfMedical.getDetailHeal();
        List<TypeOfMedical> typeOfMedicals = historyOfMedicalAndTypeOfMedical.getTypeOfMedicals();
        DetailHeal detailHealTmp = detailHeal;
        int error = 0;
        if (detailHeal.getDateHeal() == null) {
            error += 1;
        }
        if (detailHeal.getPatient() == null) {
            error += 2;
        }
        if (error > 0) {
            return error;
        }
        detailHealRepo.save(detailHeal);
        for (int i = 0; i < typeOfMedicals.size(); i++) {
            OrderHeal orderHeal = new OrderHeal();
            orderHeal.setDetailHeal(detailHealTmp);
            orderHeal.setListSelectHeal(typeOfMedicals.get(i).getListSelectHeal());
            orderHeal.setValue(typeOfMedicals.get(i).getValue());
            orderHealRepo.save(orderHeal);
        }
        return 200;
    }

//     @RequestMapping(value = "/saveorderheal" , method = RequestMethod.POST)
//    public void saveDetailHeal(@){
//    DetailHeal detailHeal = historyOfMedicalAndTypeOfMedical.getDetailHeal();
//    List<TypeOfMedical> typeOfMedicals = historyOfMedicalAndTypeOfMedical.getTypeOfMedicals();
//    for(int i = 0 ; i < typeOfMedicals.size() ; i++){
//        System.out.println("------------------------------->"+typeOfMedicals.get(i));
//    }
//    }
    @RequestMapping(value = "/deleteorderheal", method = RequestMethod.POST)
    public void deleteOrderHeal(@RequestBody OrderHeal orderHeal) {
        orderHealRepo.delete(orderHeal);
    }

}
