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

/**
 *
 * @author Best
 */
@Entity
public class PatientPicture implements Serializable{
    @Id
    private Integer id;
    
    private byte[] contentBefore;
    private String nameBefore;
    private String mimeTypeBefore;
    
    private byte[] contentCurrent;
    private String nameCurrent;
    private String mimeTypeCurrent;
    
    private byte[] contentAfter;
    private String nameAfter;
    private String mimeTypeAfter;
    
    private byte[] contentXrayFilm;
    private String nameXrayFilm;
    private String mimeTypeXrayFilm;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public byte[] getContentBefore() {
        return contentBefore;
    }

    public void setContentBefore(byte[] contentBefore) {
        this.contentBefore = contentBefore;
    }

    public String getNameBefore() {
        return nameBefore;
    }

    public void setNameBefore(String nameBefore) {
        this.nameBefore = nameBefore;
    }

    public String getMimeTypeBefore() {
        return mimeTypeBefore;
    }

    public void setMimeTypeBefore(String mimeTypeBefore) {
        this.mimeTypeBefore = mimeTypeBefore;
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
        final PatientPicture other = (PatientPicture) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }
    
    
}
