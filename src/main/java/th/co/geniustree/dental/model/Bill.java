/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.validator.constraints.NotBlank;

/**
 *
 * @author Best
 */
@Entity
public class Bill implements Serializable {

    @Id
    private String id;

    @Temporal(TemporalType.DATE)
    @Column(name = "DATEBILL")
    @NotBlank(message = "กรุณากรอกวันที่ออกบิล")
    private Date dateBill;

    @Column(name = "SUMPRICE")
    private Double sumPrice;

    @OneToOne
    private DetailHeal detailHeal;

    @JsonManagedReference
    @OneToMany(mappedBy = "bill")
    private List<OrderProduct> orderProduct;

    private Date dateUpdate;

    @OneToOne
    private BillGennerateCode gennerateCode;

    public BillGennerateCode getGennerateCode() {
        return gennerateCode;
    }

    public void setGennerateCode(BillGennerateCode gennerateCode) {
        this.gennerateCode = gennerateCode;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getDateBill() {
        return dateBill;
    }

    public void setDateBill(Date dateBill) {
        this.dateBill = dateBill;
    }

    public Double getSumPrice() {
        return sumPrice;
    }

    public void setSumPrice(Double sumPrice) {
        this.sumPrice = sumPrice;
    }

    public DetailHeal getDetailHeal() {
        return detailHeal;
    }

    public void setDetailHeal(DetailHeal detailHeal) {
        this.detailHeal = detailHeal;
    }

    public List<OrderProduct> getOrderProduct() {
        return orderProduct;
    }

    public void setOrderProduct(List<OrderProduct> orderProduct) {
        this.orderProduct = orderProduct;
    }

    public Date getDateUpdate() {
        return dateUpdate;
    }

    public void setDateUpdate(Date dateUpdate) {
        this.dateUpdate = dateUpdate;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 17 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Bill other = (Bill) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

}
