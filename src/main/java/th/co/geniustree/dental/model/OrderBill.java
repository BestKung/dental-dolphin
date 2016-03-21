/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author Jasin007
 */
@Entity
@Table(name = "ORDERBILL")
public class OrderBill implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "VALUE")
    private Integer value;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "BILL_ID")
    private Bill2 bill;

    @ManyToOne
    @JoinColumn(name = "PRICEANDEXPIREPRODUCT_ID")
    private PriceAndExpireProduct priceAndExpireProduct;

    @OneToOne
    @JoinColumn(name = "DETAILHEAL_ID")
    private DetailHeal detailHeal;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public Bill2 getBill() {
        return bill;
    }

    public void setBill(Bill2 bill) {
        this.bill = bill;
    }

    public PriceAndExpireProduct getPriceAndExpireProduct() {
        return priceAndExpireProduct;
    }

    public void setPriceAndExpireProduct(PriceAndExpireProduct priceAndExpireProduct) {
        this.priceAndExpireProduct = priceAndExpireProduct;
    }

    public DetailHeal getDetailHeal() {
        return detailHeal;
    }

    public void setDetailHeal(DetailHeal detailHeal) {
        this.detailHeal = detailHeal;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 67 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final OrderBill other = (OrderBill) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

   

}
