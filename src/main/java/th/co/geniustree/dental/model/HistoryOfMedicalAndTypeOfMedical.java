/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

/**
 *
 * @author Best
 */
public class HistoryOfMedicalAndTypeOfMedical {
    private DetailHeal detailHeal;
   
    private List<TypeOfMedical> typeOfMedicals;

    public DetailHeal getDetailHeal() {
        return detailHeal;
    }

    public void setDetailHeal(DetailHeal detailHeal) {
        this.detailHeal = detailHeal;
    }

    public List<TypeOfMedical> getTypeOfMedicals() {
        return typeOfMedicals;
    }

    public void setTypeOfMedicals(List<TypeOfMedical> typeOfMedicals) {
        this.typeOfMedicals = typeOfMedicals;
    }

    
    @Override
    public String toString() {
        return "HistoryOfMedicalAndTypeOfMedical{" + "detailHeal=" + detailHeal + ", typeOfMedicals=" + typeOfMedicals + '}';
    }

  
}
