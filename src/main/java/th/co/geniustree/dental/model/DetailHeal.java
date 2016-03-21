/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.NotBlank;

/**
 *
 * @author Jasin007
 */
@Entity
@Table(name = "DETAILHEAL")
public class DetailHeal implements Serializable {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Integer id;

    @Column(name = "DETAIL")
    private String detail;

    @Column(name = "DATEHEAL")
    @Temporal(TemporalType.DATE)
    private Date dateHeal;

    private String status;

    @ManyToOne
    @JoinColumn(name = "PATIENT_ID")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "DUCTOR_ID")
    private Doctor doctor;

    @JsonManagedReference
    @OneToMany(mappedBy = "detailHeal")
    private List<OrderHeal> orderHealDetailHeals;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Date getDateHeal() {
        return dateHeal;
    }

    public void setDateHeal(Date dateHeal) {
        this.dateHeal = dateHeal;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public List<OrderHeal> getOrderHealDetailHeals() {
        return orderHealDetailHeals;
    }

    public void setOrderHealDetailHeals(List<OrderHeal> orderHealDetailHeals) {
        this.orderHealDetailHeals = orderHealDetailHeals;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 23 * hash + Objects.hashCode(this.id);
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
        final DetailHeal other = (DetailHeal) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "DetailHeal{" + "id=" + id + ", detail=" + detail + ", dateHeal=" + dateHeal + ", status=" + status + ", patient=" + patient + ", doctor=" + doctor + ", orderHealDetailHeals=" + orderHealDetailHeals + '}';
    }

}
