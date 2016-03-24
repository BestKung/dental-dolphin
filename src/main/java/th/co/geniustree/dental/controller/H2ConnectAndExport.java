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

}
