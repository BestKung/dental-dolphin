/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.model;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

/**
 *
 * @author Best
 */
@Entity
public class PatientPictureCurrent implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Lob
    private byte[] contentCurrent;
    private String nameCurrent;
    private String mimeTypeCurrent;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public byte[] getContentCurrent() {
        return contentCurrent;
    }

    public void setContentCurrent(byte[] contentCurrent) {
        this.contentCurrent = contentCurrent;
    }

    public String getNameCurrent() {
        return nameCurrent;
    }

    public void setNameCurrent(String nameCurrent) {
        this.nameCurrent = nameCurrent;
    }

    public String getMimeTypeCurrent() {
        return mimeTypeCurrent;
    }

    public void setMimeTypeCurrent(String mimeTypeCurrent) {
        this.mimeTypeCurrent = mimeTypeCurrent;
    }

    @Override
    public int hashCode() {
        int hash = 3;
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
        final PatientPictureCurrent other = (PatientPictureCurrent) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }
    
    
    
    
}
