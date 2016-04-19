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
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author BestKung
 */
@Entity
public class OrderMedicalSupplie implements Serializable {

    @Id
    private String id;

    @Temporal(TemporalType.DATE)
    private Date date;

    @JsonManagedReference
    @OneToMany(mappedBy = "orderMedicalSupplie")
    private List<MedicalSupplies> medicalSupplies;
    private Double total;

    @OneToOne
    private OrderMedicalSupplieGennerateCode gennerateCode;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public OrderMedicalSupplieGennerateCode getGennerateCode() {
        return gennerateCode;
    }

    public void setGennerateCode(OrderMedicalSupplieGennerateCode gennerateCode) {
        this.gennerateCode = gennerateCode;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<MedicalSupplies> getMedicalSupplies() {
        return medicalSupplies;
    }

    public void setMedicalSupplies(List<MedicalSupplies> medicalSupplies) {
        this.medicalSupplies = medicalSupplies;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    @Override
    public String toString() {
        return "OrderMedicalSupplie{" + "id=" + id + ", date=" + date + ", medicalSupplies=" + medicalSupplies + ", total=" + total + '}';
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 89 * hash + Objects.hashCode(this.id);
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
        final OrderMedicalSupplie other = (OrderMedicalSupplie) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

}
