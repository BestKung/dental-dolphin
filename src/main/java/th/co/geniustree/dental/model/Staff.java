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
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author Best
 */
@Entity
@Table(name = "STAFF")
public class Staff extends Employee implements Serializable {

    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer idGen;

    private String idStaff;

    public Integer getIdGen() {
        return idGen;
    }

    public void setIdGen(Integer idGen) {
        this.idGen = idGen;
    }

    public String getIdStaff() {
        return idStaff;
    }

    public void setIdStaff(String idStaff) {
        this.idStaff = idStaff;
    }

    @ManyToOne
    @JoinColumn(name = "DEPARTMENT_ID")
    private Department department;

    @OneToOne(cascade = CascadeType.ALL)
    private StaffPicture staffPicture;

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public StaffPicture getStaffPicture() {
        return staffPicture;
    }

    public void setStaffPicture(StaffPicture staffPicture) {
        this.staffPicture = staffPicture;
    }

    @Override
    public String toString() {
        return "Staff{" + "idGen=" + idGen + ", idStaff=" + idStaff + ", department=" + department + ", staffPicture=" + staffPicture + '}';
    }

}
