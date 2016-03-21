/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import th.co.geniustree.dental.model.Bill;
import th.co.geniustree.dental.model.OrderProduct;
import th.co.geniustree.dental.repo.BillRepo;
import th.co.geniustree.dental.repo.OrderProductRepo;

/**
 *
 * @author BestKung
 */
@RestController
public class OrderProductController {
    
    @Autowired
    private OrderProductRepo orderProductRepo;
    
    @Autowired
    private BillRepo billRepo;
    
    @RequestMapping(value = "/saveorderproduct" , method = RequestMethod.POST)
    private void saveOrderProduct(@RequestBody OrderProduct orderProduct){
    orderProductRepo.save(orderProduct);
    }
    
    @RequestMapping(value = "/deleteorderproduct" , method = RequestMethod.POST)
    private void deleteOrderProduct(@RequestBody Bill bill){
//        orderProductRepo.delete(orderProduct);
        Bill b = billRepo.findOne(bill.getId());
        for(int i = 0 ; i < b.getOrderProduct().size() ; i++){
        orderProductRepo.delete(b.getOrderProduct().get(i));
        }
        }
    
    }
    

