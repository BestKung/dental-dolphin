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
import th.co.geniustree.dental.model.TmpProduct;
import th.co.geniustree.dental.repo.TmpProductRepo;
import th.co.geniustree.dental.spec.TmpProductSpec;

/**
 *
 * @author BestKung
 */
@RestController
public class TmpProductController {
    
    @Autowired
    private TmpProductRepo tmpProductRepo;
    
    @RequestMapping(value = "/savetmpproduct" , method = RequestMethod.POST)
    private void saveTmpProduct(@RequestBody TmpProduct tmpProduct){
        System.out.println("------------------------------------------------------------------------>"+tmpProduct);
    tmpProductRepo.save(tmpProduct);
    }
    
    @RequestMapping(value = "/deletetmpproduct" , method = RequestMethod.POST)
    private void deleteTmpProduct(@RequestBody TmpProduct tmpProduct){
    tmpProductRepo.delete(tmpProduct);
    }
    
     @RequestMapping(value = "/deletetmpproductlist" , method = RequestMethod.POST)
    private void deleteTmpProductList(@RequestBody List<TmpProduct> tmpProducts){
    for(int i = 0 ; i<tmpProducts.size() ; i++){
    tmpProductRepo.delete(tmpProducts.get(i));
    }
    }
    
    @RequestMapping(value = "/gettmpproduct" , method = RequestMethod.POST)
    private Page<TmpProduct> getTmpproduct(@RequestBody String user , Pageable pageable){
    return tmpProductRepo.findByUser(user, pageable);
    }
    
    @RequestMapping(value = "/counttmpproduct" , method = RequestMethod.POST)
    private long counttmpproduct(@RequestBody String userName){
    return tmpProductRepo.count(TmpProductSpec.nameUser(userName));
    }
    
}
