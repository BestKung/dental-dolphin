/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import th.co.geniustree.dental.model.Employee;
import th.co.geniustree.dental.model.Room;
import th.co.geniustree.dental.repo.DoctorRepo;
import th.co.geniustree.dental.repo.EmployeeRepo;
import th.co.geniustree.dental.repo.RoomRepo;

/**
 *
 * @author BestKung
 */
@RestController
public class RoomController {

    @Autowired
    private RoomRepo roomRepo;

    @Autowired
    private DoctorRepo doctorRepo;

    @Autowired
    private EmployeeRepo employeeRepo;

    @RequestMapping(value = "/roomsave", method = RequestMethod.POST)
    public Integer roomSave(@Validated @RequestBody Room room) {
        if (roomRepo.findOne(room.getRoomId()) != null) {
            return 100;
        }
        roomRepo.save(room);
        return 200;
    }

    @RequestMapping(value = "/doctorload", method = RequestMethod.POST)
    public Employee loadDoctor(@RequestBody Integer id) {
        System.out.println("===========================================================" + id);
        return doctorRepo.findOne(id);
    }

    @RequestMapping(value = "/getroom", method = RequestMethod.GET)
    public Page<Room> getRoom(Pageable pageable) {
        return roomRepo.findAll(pageable);
    }
}
