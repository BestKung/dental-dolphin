/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.validator.constraints.NotBlank;

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
    @NotBlank(message = "กรุณากรอกที่อยู่ปัจจุบัน")
    private String currentAddress;

    @Column(name = "TEL")
    private String tel;

    @Column(name = "MOBILE", nullable = false)
    @NotBlank(message = "กรุณากรอกหมายเลขโทรศัพท์")
    private String mobile;

    @Column(name = "START_WORK")
    @Temporal(TemporalType.DATE)
    private Date startWork;

    @Column(name = "END_WORK")
    @Temporal(TemporalType.DATE)
    private Date endWork;

    @Column(name = "WORK_STATUS")
    private String workStatus;

    @OneToOne(cascade = javax.persistence.CascadeType.ALL)
    @JoinColumn(name = "CONTACT_ID", nullable = true)
    private Contact contact;

    @OneToOne(cascade = javax.persistence.CascadeType.ALL)
    @JoinColumn(name = "BANK_ID", nullable = true)
    private Bank bank;

    @OneToOne(cascade = CascadeType.ALL)
    private DoctorPicture doctorPicture;

    private Double salary;

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

    public DoctorPicture getDoctorPicture() {
        return doctorPicture;
    }

    public void setDoctorPicture(DoctorPicture doctorPicture) {
        this.doctorPicture = doctorPicture;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

}
