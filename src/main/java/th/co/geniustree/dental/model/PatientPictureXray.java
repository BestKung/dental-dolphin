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
public class PatientPictureXray implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Lob
    private byte[] contentXrayFilm;
    private String nameXrayFilm;
    private String mimeTypeXrayFilm;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public byte[] getContentXrayFilm() {
        return contentXrayFilm;
    }

    public void setContentXrayFilm(byte[] contentXrayFilm) {
        this.contentXrayFilm = contentXrayFilm;
    }

    public String getNameXrayFilm() {
        return nameXrayFilm;
    }

    public void setNameXrayFilm(String nameXrayFilm) {
        this.nameXrayFilm = nameXrayFilm;
    }

    public String getMimeTypeXrayFilm() {
        return mimeTypeXrayFilm;
    }

    public void setMimeTypeXrayFilm(String mimeTypeXrayFilm) {
        this.mimeTypeXrayFilm = mimeTypeXrayFilm;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 47 * hash + Objects.hashCode(this.id);
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
        final PatientPictureXray other = (PatientPictureXray) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }
    
    
    
    
}
