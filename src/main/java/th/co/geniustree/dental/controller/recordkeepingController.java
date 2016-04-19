/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import th.co.geniustree.dental.model.DetailHeal;
import th.co.geniustree.dental.model.DetailHealGennerateCode;
import th.co.geniustree.dental.model.HistoryOfMedicalAndTypeOfMedical;
import th.co.geniustree.dental.model.OrderHeal;
import th.co.geniustree.dental.model.TypeOfMedical;
import th.co.geniustree.dental.repo.DetailHealGennerateCodeRepo;
import th.co.geniustree.dental.repo.DetailHealRepo;
import th.co.geniustree.dental.repo.OrderHealRepo;

/**
 *
 * @author jasin
 */
@RestController
public class recordkeepingController {

    @Autowired
    private OrderHealRepo orderHealRepo;

    @Autowired
    private DetailHealRepo detailHealRepo;

    @Autowired
    private DetailHealGennerateCodeRepo gennerateCodeRepo;

    @RequestMapping(value = "/saverecordkeeping", method = RequestMethod.POST)
    public Integer saveDetailHeal(@Validated @RequestBody HistoryOfMedicalAndTypeOfMedical historyOfMedicalAndTypeOfMedical) {

        DetailHealGennerateCode gennerateCode = gennerateCodeRepo.save(new DetailHealGennerateCode());
        int idLength = gennerateCode.getId().toString().length();
        String strId = gennerateCode.getId().toString();
        for (int i = idLength; i <= 4; i++) {
            strId = 0 + strId;
        }
        DetailHeal detailHeal = historyOfMedicalAndTypeOfMedical.getDetailHeal();
        detailHeal.setId("DTH" + strId + "-" + detailHeal.getPatient().getId());
        gennerateCodeRepo.delete(gennerateCode);

        List<TypeOfMedical> typeOfMedicals = historyOfMedicalAndTypeOfMedical.getTypeOfMedicals();
        DetailHeal detailHealTmp = detailHeal;
        detailHealTmp.setDateHeal(new Date());
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
}
