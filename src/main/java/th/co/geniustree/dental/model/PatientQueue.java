/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.model;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 *
 * @author BestKung
 */
@Entity
public class PatientQueue implements Serializable {

    @Id
    private String queueId;
    @OneToOne
    private Patient patient;
    @OneToOne
    private Doctor doctor;
    private String detail;
    @OneToOne
    private PatientQueueGenerateCode patientQueueGenerateCode;
    private String hasAppointment;

    public String getQueueId() {
        return queueId;
    }

    public void setQueueId(String queueId) {
        this.queueId = queueId;
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

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public PatientQueueGenerateCode getPatientQueueGenerateCode() {
        return patientQueueGenerateCode;
    }

    public void setPatientQueueGenerateCode(PatientQueueGenerateCode patientQueueGenerateCode) {
        this.patientQueueGenerateCode = patientQueueGenerateCode;
    }

    public String getHasAppointment() {
        return hasAppointment;
    }

    public void setHasAppointment(String hasAppointment) {
        this.hasAppointment = hasAppointment;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 53 * hash + Objects.hashCode(this.queueId);
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
        final PatientQueue other = (PatientQueue) obj;
        if (!Objects.equals(this.queueId, other.queueId)) {
            return false;
        }
        return true;
    }

}
