/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import java.io.ByteArrayInputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author BestKung
 */
public class H2ConnectAndExport {

    public Connection getH2Connection() throws SQLException {
        return DriverManager.getConnection("jdbc:h2:tcp://localhost/~/dolphin", "", "");
    }

    public ResponseEntity<InputStreamResource> exportReportToClientBrowser(byte[] content, String reportName, String reportType) {
        ResponseEntity<InputStreamResource> body;
        body = ResponseEntity.ok().contentLength(content.length)
                .header("Content-Disposition", "attachment; filename=\"" + reportName + "." + reportType + "\"")
                .body(new InputStreamResource(new ByteArrayInputStream(content)));
        return body;
    }

    public void resetPatientGenerateCode() throws SQLException {
        Connection connection = DriverManager.getConnection("jdbc:h2:tcp://localhost/~/dolphin", "", "");
        connection.createStatement().executeUpdate("ALTER TABLE PATIENT_GENNERATE_CODE  ALTER COLUMN id RESTART WITH 1");
    }

    public void resetAppointmentGenerateCode() throws SQLException {
        Connection connection = DriverManager.getConnection("jdbc:h2:tcp://localhost/~/dolphin", "", "");
        connection.createStatement().executeUpdate("ALTER TABLE APPOINTMENT_GENNERATE_CODE  ALTER COLUMN id RESTART WITH 1");
    }

    public void resetDetailHealGenerateCode() throws SQLException {
        Connection connection = DriverManager.getConnection("jdbc:h2:tcp://localhost/~/dolphin", "", "");
        connection.createStatement().executeUpdate("ALTER TABLE PATIENT_GENNERATE_CODE  ALTER COLUMN id RESTART WITH 1");
    }

    public void resetBillGenerateCode() throws SQLException {
        Connection connection = DriverManager.getConnection("jdbc:h2:tcp://localhost/~/dolphin", "", "");
        connection.createStatement().executeUpdate("ALTER TABLE PATIENT_GENNERATE_CODE  ALTER COLUMN id RESTART WITH 1");
    }

    public void resetOrderGenerateCode() throws SQLException {
        Connection connection = DriverManager.getConnection("jdbc:h2:tcp://localhost/~/dolphin", "", "");
        connection.createStatement().executeUpdate("ALTER TABLE ORDER_MEDICAL_SUPPLIE_GENNERATE_CODE ALTER COLUMN id RESTART WITH 1");
    }

    public void resetQueueGenerateCode() throws SQLException {
        Connection connection = DriverManager.getConnection("jdbc:h2:tcp://localhost/~/dolphin", "", "");
        connection.createStatement().executeUpdate("ALTER TABLE PATIENT_QUEUE_GENERATE_CODE  ALTER COLUMN ID_GEN RESTART WITH 1");
    }

}
