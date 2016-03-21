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
public class PatientPictureAfter implements Serializable{
    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Lob
    private byte[] contentAfter;
    private String nameAfter;
    private String mimeTypeAfter;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public byte[] getContentAfter() {
        return contentAfter;
    }

    public void setContentAfter(byte[] contentAfter) {
        this.contentAfter = contentAfter;
    }

    public String getNameAfter() {
        return nameAfter;
    }

    public void setNameAfter(String nameAfter) {
        this.nameAfter = nameAfter;
    }

    public String getMimeTypeAfter() {
        return mimeTypeAfter;
    }

    public void setMimeTypeAfter(String mimeTypeAfter) {
        this.mimeTypeAfter = mimeTypeAfter;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 83 * hash + Objects.hashCode(this.id);
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
        final PatientPictureAfter other = (PatientPictureAfter) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }
    
    
    
    
}
