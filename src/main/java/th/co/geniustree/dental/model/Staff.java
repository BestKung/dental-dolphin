/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.validator.constraints.NotBlank;

/**
 *
 * @author Best
 */
@Entity
@Table(name = "STAFF")
public class Staff extends Employee implements Serializable {
    
    private String idStaff;

    @Column(name = "PERSONAL_ID")
    private String pid;

    @Column(name = "NAME_ENG")
    private String nameEng;

    @Temporal(TemporalType.DATE)
    @Column(name = "BIRTH_DATE")
    private Date birthDate;

    @Column(name = "SEX")
    private String sex;
    @Column(name = "BLOOD")
    private String blood;

    @Column(name = "MARRY_STATUS")
    private String marryStatus;
    @Column(name = "NATION")
    private String nation;
    @Column(name = "RACE")
    private String race;

    @Column(name = "SOLDER_STATUS")
    private String soldierStatus;

    @Column(name = "ADDRESS_OF_PID")
    private String addressOfPid;

    @Column(name = "CURRENT_ADDRESS", nullable = false)
    @NotBlank(message = "Current Address not Empty")
    private String currentAddress;

    @Column(name = "TEL")
    private String tel;

    @Column(name = "MOBILE", nullable = false)
    @NotBlank(message = "Mobile not Empty")
    private String mobile;

    @Column(name = "START_WORK")
    @Temporal(TemporalType.DATE)
    private Date startWork;

    @Column(name = "END_WORK")
    @Temporal(TemporalType.DATE)
    private Date endWork;

    @Column(name = "WORK_STATUS")
    private String workStatus;

    @ManyToOne
    @JoinColumn(name = "DEPARTMENT_ID")
    private Department department;

    @OneToOne(cascade = javax.persistence.CascadeType.ALL)
    @JoinColumn(name = "CONTACT_ID", nullable = true)
    private Contact contact;

    @OneToOne(cascade = javax.persistence.CascadeType.ALL)
    @JoinColumn(name = "BANK_ID", nullable = true)
    private Bank bank;

    @OneToOne(cascade = CascadeType.ALL)
    private StaffPicture staffPicture;

    @OneToOne
    private StaffGennerateCode gennerateCode;

    private Double salary;

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getNameEng() {
        return nameEng;
    }

    public void setNameEng(String nameEng) {
        this.nameEng = nameEng;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getBlood() {
        return blood;
    }

    public void setBlood(String blood) {
        this.blood = blood;
    }

    public String getMarryStatus() {
        return marryStatus;
    }

    public void setMarryStatus(String marryStatus) {
        this.marryStatus = marryStatus;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getRace() {
        return race;
    }

    public void setRace(String race) {
        this.race = race;
    }

    public String getSoldierStatus() {
        return soldierStatus;
    }

    public void setSoldierStatus(String soldierStatus) {
        this.soldierStatus = soldierStatus;
    }

    public String getAddressOfPid() {
        return addressOfPid;
    }

    public void setAddressOfPid(String addressOfPid) {
        this.addressOfPid = addressOfPid;
    }

    public String getCurrentAddress() {
        return currentAddress;
    }

    public void setCurrentAddress(String currentAddress) {
        this.currentAddress = currentAddress;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Date getStartWork() {
        return startWork;
    }

    public void setStartWork(Date startWork) {
        this.startWork = startWork;
    }

    public Date getEndWork() {
        return endWork;
    }

    public void setEndWork(Date endWork) {
        this.endWork = endWork;
    }

    public String getWorkStatus() {
        return workStatus;
    }

    public void setWorkStatus(String workStatus) {
        this.workStatus = workStatus;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public Bank getBank() {
        return bank;
    }

    public void setBank(Bank bank) {
        this.bank = bank;
    }

    public StaffPicture getStaffPicture() {
        return staffPicture;
    }

    public void setStafPicture(StaffPicture staffPicture) {
        this.staffPicture = staffPicture;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public StaffGennerateCode getGennerateCode() {
        return gennerateCode;
    }

    public void setGennerateCode(StaffGennerateCode gennerateCode) {
        this.gennerateCode = gennerateCode;
    }

    public String getIdStaff() {
        return idStaff;
    }

    public void setIdStaff(String idStaff) {
        this.idStaff = idStaff;
    }

}
