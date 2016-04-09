/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.model;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.AttributeOverride;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

/**
 *
 * @author Best
 */
@Entity
public class Doctor extends Employee implements Serializable {

    @Column(name = "PERMITNO")
    private String permitNo;

    @Column(name = "PERMITTYPE")
    private String permitType;

    @OneToOne(cascade = CascadeType.ALL)
    private DoctorPicture doctorPicture;

    public String getPermitNo() {
        return permitNo;
    }

    public void setPermitNo(String permitNo) {
        this.permitNo = permitNo;
    }

    public String getPermitType() {
        return permitType;
    }

    public void setPermitType(String permitType) {
        this.permitType = permitType;
    }

    public DoctorPicture getDoctorPicture() {
        return doctorPicture;
    }

    public void setDoctorPicture(DoctorPicture doctorPicture) {
        this.doctorPicture = doctorPicture;
    }

}
