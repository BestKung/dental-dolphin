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
import th.co.geniustree.dental.model.Doctor;
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
    public Employee loadDoctor(@RequestBody String id) {
        System.out.println("===========================================================" + id);
        return doctorRepo.findOne(id);
    }

    @RequestMapping(value = "/getroom", method = RequestMethod.GET)
    public Page<Room> getRoom(Pageable pageable) {
        return roomRepo.findAllByOrderByRoomIdAsc(pageable);
    }

    @RequestMapping(value = "/deleteroom", method = RequestMethod.POST)
    public void deleteRoom(@RequestBody Room room) {
        roomRepo.delete(room);
    }

    @RequestMapping(value = "/updateroom", method = RequestMethod.POST)
    public void updateRoom(@RequestBody Room room) {
        roomRepo.save(room);

    }

    @RequestMapping(value = "/searchroom", method = RequestMethod.POST)
    public Page<Room> searchRoom(@RequestBody Room room, Pageable pageable) {
        return roomRepo.findAllByRoomId(room.getRoomId(), pageable);
    }

    @RequestMapping(value = "/countroom", method = RequestMethod.GET)
    public Long countRoom() {
        return roomRepo.count();
    }

    @RequestMapping(value = "/openroom", method = RequestMethod.POST)
    public void openRoom(@RequestBody Doctor doctor) {
        Room findByDoctor = roomRepo.findByDoctor(doctor);
        System.out.println("----------------------------------------------------------------------------------" + findByDoctor);
        findByDoctor.setRoomStatus("เปิด");
        roomRepo.save(findByDoctor);
    }

    @RequestMapping(value = "/closeroom", method = RequestMethod.POST)
    public void closeRoom(@RequestBody Room room) {
        Room findByDoctor = roomRepo.findByDoctor(room.getDoctor());
        findByDoctor.setRoomStatus("ปิด");
        roomRepo.save(findByDoctor);
    }

    @RequestMapping(value = "/searchroombydoctor", method = RequestMethod.POST)
    public Room searchRoomByDoctor(@RequestBody Doctor doctor) {
        return roomRepo.findByDoctor(doctor);
    }
}
