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
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 *
 * @author BestKung
 */
@Entity
public class OrderProduct implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer Id;
    private Integer value;
   
    @ManyToOne
    private PriceAndExpireProduct priceAndExpireProduct;
    
    @JsonBackReference
    @ManyToOne
    private Bill bill;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer Id) {
        this.Id = Id;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public PriceAndExpireProduct getPriceAndExpireProduct() {
        return priceAndExpireProduct;
    }

    public void setPriceAndExpireProduct(PriceAndExpireProduct priceAndExpireProduct) {
        this.priceAndExpireProduct = priceAndExpireProduct;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }
    

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 73 * hash + Objects.hashCode(this.Id);
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
        final OrderProduct other = (OrderProduct) obj;
        if (!Objects.equals(this.Id, other.Id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "OrderProduct{" + "Id=" + Id + ", value=" + value + ", priceAndExpireProduct=" + priceAndExpireProduct + ", bill=" + bill + '}';
    }
    
}
