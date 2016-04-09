/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.model;


import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


/**
 *
 * @author Best
 */
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Employee implements Serializable, UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "EMAIL")
//    @NotBlank(message = "กรุณากรอก อีเมล")
    @Email(message = "example@example.com")
    private String email;

    @Column(name = "PASSWORD")
//    @NotBlank(message = "กรุณากรอกรหัสผ่าน")
    private String password;

    @Column(name = "NAME_TH")
//    @NotBlank(message = "กรุณากรอกชื่อ ถาษาไทย")
    private String nameTh;

    private String type;
    private boolean enable = true;

    @ManyToMany
    @Column(name = "ROLES")
    private List<Authority> roles;

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

    @Column(name = "CURRENT_ADDRESS")
//    @NotBlank(message = "Current Address not Empty")
    private String currentAddress;

    @Column(name = "TEL")
    private String tel;

    @Column(name = "MOBILE")
//    @NotBlank(message = "Mobile not Empty")
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
    @JoinColumn(name = "CONTACT_ID")
    private Contact contact;

    @OneToOne(cascade = javax.persistence.CascadeType.ALL)
    @JoinColumn(name = "BANK_ID")
    private Bank bank;

    private Double salary;

    public String getNameTh() {
        return nameTh;
    }

    public void setNameTh(String nameTh) {
        this.nameTh = nameTh;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }

    public List<Authority> getRoles() {
        return roles;
    }

    public void setRoles(List<Authority> roles) {
        this.roles = roles;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 29 * hash + Objects.hashCode(this.id);
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
        final Employee other = (Employee) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return roles;
        return Collections.emptySet();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enable;
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

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

}
