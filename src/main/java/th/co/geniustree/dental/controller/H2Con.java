/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author BestKung
 */
public class H2Con {
    
    public Connection getH2Connection() throws SQLException{
    return DriverManager.getConnection("jdbc:h2:tcp://localhost/~/dolphin", "", "");
    }
    
}
