/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
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
public class Patient implements Serializable {

    @Id
    private String id;
//    @Column(name = "PATIENT_ID")

//    @Column(name = "PATIENT_PID")
    private String pid;
    @Column(name = "PATIENT_NAME")
    @NotBlank(message = "กรุณากรอกชื่อ")
    private String name;
    @Column(name = "BIRTHDATE")
    @Temporal(TemporalType.DATE)
    private Date birthDate;
//    @Column(name = "PATIENT_SEX")
    private String sex;
//    @Column(name = "PATIENT_BLOOD")
    private String blood;
//    @Column(name = "PATIENT_NATION")
    private String nation;
//    @Column(name = "PATIENT_RACE")
    private String race;
//    @Column(name = "PATIENT_ADDRESS")
    private String address;
//    @Column(name = "PATIENT_TEL")
    private String tel;
//    @Column(name = "PATIENT_MOBILE")
    private String mobile;
    private String job;
//    @Column(name = "PATIENT_EMAIL")
    private String email;

    @ManyToMany
    private List<MedicalHistory> medicalHistory;

    @OneToOne(cascade = CascadeType.ALL)
    private PatientPictureXray patientPictureXray;

    @OneToOne(cascade = CascadeType.ALL)
    private PatientPictureBefore patientPictureBefore;

    @OneToOne(cascade = CascadeType.ALL)
    private PatientPictureCurrent patientPictureCurrent;

    @OneToOne(cascade = CascadeType.ALL)
    private PatientPictureAfter patientPictureAfter;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<DetailHeal> detailHeals;

    @OneToMany(mappedBy = "patient")
    @JsonIgnore
    private List<Appointment> appointments;

    @ManyToOne
    @JoinColumn(name = "DOCTOR_ID")
    private Doctor doctor;

    @OneToOne
    private PatientGennerateCode gennerateCode;

    public PatientGennerateCode getGennerateCode() {
        return gennerateCode;
    }

    public void setGennerateCode(PatientGennerateCode gennerateCode) {
        this.gennerateCode = gennerateCode;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<MedicalHistory> getMedicalHistory() {
        return medicalHistory;
    }

    public void setMedicalHistory(List<MedicalHistory> medicalHistory) {
        this.medicalHistory = medicalHistory;
    }

    public PatientPictureXray getPatientPictureXray() {
        return patientPictureXray;
    }

    public void setPatientPictureXray(PatientPictureXray patientPictureXray) {
        this.patientPictureXray = patientPictureXray;
    }

    public PatientPictureBefore getPatientPictureBefore() {
        return patientPictureBefore;
    }

    public void setPatientPictureBefore(PatientPictureBefore patientPictureBefore) {
        this.patientPictureBefore = patientPictureBefore;
    }

    public PatientPictureCurrent getPatientPictureCurrent() {
        return patientPictureCurrent;
    }

    public void setPatientPictureCurrent(PatientPictureCurrent patientPictureCurrent) {
        this.patientPictureCurrent = patientPictureCurrent;
    }

    public PatientPictureAfter getPatientPictureAfter() {
        return patientPictureAfter;
    }

    public void setPatientPictureAfter(PatientPictureAfter patientPictureAfter) {
        this.patientPictureAfter = patientPictureAfter;
    }

    public List<DetailHeal> getDetailHeals() {
        return detailHeals;
    }

    public void setDetailHeals(List<DetailHeal> detailHeals) {
        this.detailHeals = detailHeals;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 97 * hash + Objects.hashCode(this.id);
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
        final Patient other = (Patient) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

}
