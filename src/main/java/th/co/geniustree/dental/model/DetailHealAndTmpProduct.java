/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.model;

import java.util.Date;
import java.util.List;

/**
 *
 * @author BestKung
 */
public class DetailHealAndTmpProduct {

    private Integer id;
    private Date day;
    private DetailHeal detailHeal;
    private List<TmpProduct> tmpProducts;
    private Double sumPrice;
    private Date dateUpdate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDay() {
        return day;
    }

    public void setDay(Date day) {
        this.day = day;
    }

    public DetailHeal getDetailHeal() {
        return detailHeal;
    }

    public void setDetailHeal(DetailHeal detailHeal) {
        this.detailHeal = detailHeal;
    }

    public List<TmpProduct> getTmpProducts() {
        return tmpProducts;
    }

    public void setTmpProducts(List<TmpProduct> tmpProducts) {
        this.tmpProducts = tmpProducts;
    }

    public Double getSumPrice() {
        return sumPrice;
    }

    public void setSumPrice(Double sumPrice) {
        this.sumPrice = sumPrice;
    }

    public Date getDateUpdate() {
        return dateUpdate;
    }

    public void setDateUpdate(Date dateUpdate) {
        this.dateUpdate = dateUpdate;
    }

}
